import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { generateFromEmail } from 'unique-username-generator';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserService } from '../users/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  generateJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async signIn(user) {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.findUserByEmail(user.email);

      if (!userExists) {
        return this.registerUser(user);
      }

      return this.generateJwt({
        sub: String(userExists.id),
        email: userExists.email,
      });
    } catch (e) {
      console.log('========== err', e);
      throw e;
    }
  }

  async registerUser(user: RegisterUserDto) {
    try {
      const newUser = await this.userService.create({
        email: user.email,
        username: generateFromEmail(user.email, 5),
      });

      return this.generateJwt({
        sub: String(newUser.id),
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }
}
