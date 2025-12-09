import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../dto/user/update-user.dto';
import { UserDataService } from 'src/dal/user.data.service';

@Injectable()
export class UserService {
  constructor(private readonly userDataService: UserDataService) {}

  async getUser(id: number) {
    const user = await this.userDataService.getUser(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }

  async updateUser(id: number, userData: UpdateUserDto) {
    const user = await this.userDataService.getUser(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userDataService.updateUser(userData, id);
  }

  async deleteUser(id: number) {
    const user = await this.userDataService.getUser(id);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.userDataService.deleteUser(id);
  }
}
