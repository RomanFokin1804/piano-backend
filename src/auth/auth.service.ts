import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './strategies/jwt.strategy';
import { UserService } from '../users/user.service';
import { Prisma, User } from '@prisma/client';

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
