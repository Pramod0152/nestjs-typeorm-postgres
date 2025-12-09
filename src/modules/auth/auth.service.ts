import { Injectable } from '@nestjs/common';
import { UserDataService } from 'src/dal/user.data.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LoginDto } from 'src/dto/login.dto';

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

  async login(body: LoginDto) {
    const user = await this.userDataService.getUserByEmail(body.email);
    if (!user) {
      throw new Error('User with this email does not exist');
    }

    const isPasswordMatching = await bcrypt.compare(
      body.password,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new Error('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };

    return {
      message: 'User logged in successfully',
      access_token: await this.getJwtToken(payload),
      user: user,
    };
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
