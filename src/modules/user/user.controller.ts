import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../bll/user.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  async getUsers(@Request() req: any) {
    const users = await this.userService.getUser(req.user.id);
    return users;
  }

  @Patch('/')
  async updateUser(@Request() req: any, @Body() userData: UpdateUserDto) {
    return this.userService.updateUser(req.user.id, userData);
  }

  @Delete('/')
  async deleteUser(@Request() req: any) {
    await this.userService.deleteUser(req.user.id);
  }
}
