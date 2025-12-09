import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserDataService } from 'src/dal/user.data.service';

export interface JwtPayload {
  id: number;
  email: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userDataService: UserDataService,
  ) {
    const secretKey: string | any = configService.get<string>(
      'JWT_AUTH_SECRET_KEY',
    );
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userDataService.getUser(payload.id);
    if (!user) {
      throw new Error('Invalid token - user not found');
    }

    return { id: user?.id, email: user?.email };
  }
}
