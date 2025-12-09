import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../../dto/user/create-user.dto';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { Public } from 'src/app/decorator/is-public.decorator';
import { LoginDto } from 'src/dto/user/login.dto';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  @Public()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.registerUser(createUserDto);
    return user;
  }

  @Post('/login')
  @Public()
  async login(@Body() body: LoginDto) {
    const user = await this.authService.login(body);
    return user;
  }
}
