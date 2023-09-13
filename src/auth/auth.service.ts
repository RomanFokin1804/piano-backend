import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateFromEmail } from 'unique-username-generator';
import { UserEntity } from '../users/entities/user.entity';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { IJWTConfig } from '../config/config.jwt';
import { CONFIG_JWT } from '../config/config.constant';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {
    /*this.jwtService['options']['secret'] =
      this.configService.get<IJWTConfig>(CONFIG_JWT).secret;*/
    console.log('============ constructor', this.jwtService);
  }

  generateJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    if (!user) {
      throw new BadRequestException('Unauthenticated');
    }

    const userExists = await this.findUserByEmail(user.email);

    if (!userExists) {
      return this.registerUser(user);
    }

    try {
      return this.generateJwt({
        sub: userExists.id,
        email: userExists.email,
      });
    } catch (e) {
      console.log('========== err', e);
      throw e;
    }
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = this.userRepository.create(user);
      newUser.username = generateFromEmail(user.email, 5);

      await this.userRepository.save(newUser);

      return this.generateJwt({
        sub: newUser.id,
        email: newUser.email,
      });
    } catch {
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    return user;
  }
}
