import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from 'src/dto/user/create-user.dto';
import { UpdateUserDto } from 'src/dto/user/update-user.dto';

@Injectable()
export class UserDataService {
  constructor(
    @InjectRepository(User) private readonly model: Repository<User>,
  ) {}

  async createUser(item: CreateUserDto) {
    const user = this.model.create({
      username: item.username,
      first_name: item.first_name || '',
      last_name: item.last_name || '',
      email: item.email,
      password: item.password,
      profile_picture: item.profile_picture || '',
    });

    return await this.model.save(user);
  }

  async getUserByEmail(email: string) {
    return this.model.findOne({
      where: {
        email: email,
      },
    });
  }

  async getUserByUsername(username: string) {
    return this.model.findOne({
      where: {
        username: username,
      },
    });
  }

  async getUser(id: number) {
    return this.model.findOne({
      where: {
        id: id,
      },
    });
  }

  async getAllUsers() {
    return this.model.find();
  }

  async updateUser(item: UpdateUserDto, id: number) {
    const user = await this.getUser(id);
    if (!user) return null;

    const updateduser = Object.fromEntries(
      Object.entries(item).filter(([_, v]) => v !== undefined),
    );

    return await this.model.update(id, updateduser);
  }

  async deleteUser(id: number) {
    return this.model.delete(id);
  }
}
