import { Injectable } from '@nestjs/common';
import { UserDataService } from 'src/dal/user.data.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDataService: UserDataService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerUser(item: CreateUserDto) {
    const checkUser = await this.userDataService.getUserByEmail(item.email);
    if (checkUser) {
      throw new Error('User with this email already exists');
    }

    const checkUsername = await this.userDataService.getUserByUsername(
      item.username,
    );
    if (checkUsername) {
      throw new Error('User with this username already exists');
    }

    const hasedPassword = bcrypt.hash(item.password, 10);
    item.password = await hasedPassword;
    const user = await this.userDataService.createUser(item);

    return {
      message: 'User registered successfully',
      access_token: await this.getJwtToken({ id: user.id, email: user.email }),
      user: user,
    };
  }

  async getAllUsers() {
    return this.userDataService.getAllUsers();
  }

  async getUser(id: number) {
    return this.userDataService.getUser(id);
  }

  async getJwtToken(payload: any) {
    return await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_AUTH_SECRET_KEY'),
      expiresIn: this.configService.get<string | undefined | any>(
        'JWT_AUTH_EXPIRES_IN',
      ),
    });
  }
}
