import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt-access.strategy';
import { UserService } from '../users/user.service';
import { Prisma, User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  generateJwt(payload: JwtPayload): string {
    return this.jwtService.sign(payload);
  }

  async signIn(user: Prisma.UserCreateInput) {
    try {
      if (!user) {
        throw new BadRequestException('Unauthenticated');
      }

      const userExists = await this.findUserByEmail(user.email);

      if (!userExists) {
        return this.registerUser(user);
      }

      return this.getTokens({
        sub: String(userExists.id),
        email: userExists.email,
      });
    } catch (e) {
      console.log('========== err', e);
      throw e;
    }
  }

  async logout(id: string): Promise<User> {
    return this.userService.update(id, { refreshToken: null });
  }

  async registerUser(user: Prisma.UserCreateInput) {
    try {
      let username: string;

      let usernameIsUnique = false;
      do {
        username = user?.lastName
          ? `${user.firstName}${user.lastName}`
          : user.firstName;
        username = `${username}${Math.floor(Math.random() * 10000000)
          .toString()
          .padStart(7, '0')}`;

        const userExist = await this.userService.getByUsername(username);
        if (!userExist) usernameIsUnique = true;
      } while (!usernameIsUnique);

      const newUser = await this.userService.create({
        email: user.email,
        username,
        firstName: user.firstName,
        lastName: user.lastName,
        photo: user.photo,
      });

      return this.getTokens({
        sub: String(newUser.id),
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.getById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    return await this.getTokens({
      sub: String(user.id),
      email: user.email,
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userService.getByEmail(email);

    if (!user) {
      return null;
    }

    return user;
  }

  async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN'),
      }),
    ]);

    await this.userService.update(payload.sub, {
      refreshToken: await argon2.hash(refreshToken),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
