import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { UserService } from '../../bll/user.service';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';
import { GenericResponseDto } from 'src/dto/generic-response.dto';
import { ResponseHandlerService } from 'src/app/common/response-handler.service';

@Controller('user')
@ApiTags('Users')
@ApiBearerAuth()
@ApiExtraModels(GenericResponseDto)
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly responseHandler: ResponseHandlerService,
  ) {}

  @Get('/')
  async getUsers(@Request() req: any) {
    const users = await this.userService.getUser(req.user.id);
    return await this.responseHandler.handleResponse(users);
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
