import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../bll/user.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { UpdateUserDto } from '../../dto/update-user.dto';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { IS_PUBLIC_KEY, Public } from 'src/app/decorator/is-public.decorator';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/')
  @Public()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.authService.registerUser(createUserDto);
    return user;
  }

  @Get('/')
  async getUsers() {
    const users = await this.authService.getAllUsers();
    return users;
  }

  @Get('/me')
  async getUser(@Request() req: any) {
    console.log('Request User:', req.user);
    const user = await this.authService.getUser(req.user.id);
    return user;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: number) {
    // await this.userService.deleteUser(id);
  }
}
