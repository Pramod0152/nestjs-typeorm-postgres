import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../dal/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private readonly userRepository: Repository<User>,
  ) {}

  // async createUser(userData: CreateUserDto) {
  //   const user = this.userRepository.create(userData);
  //   return this.userRepository.save(user);
  // }

  // async getUserById(id: number) {
  //   return this.userRepository.findOne({ where: { id } });
  // }

  // async getUsers() {
  //   return this.userRepository.find();
  // }

  // async updateUser(id: number, userData: UpdateUserDto) {
  //   await this.userRepository.update(id, userData);
  //   return this.getUserById(id);
  // }

  // async deleteUser(id: number) {
  //   await this.userRepository.delete(id);
  // }
}
