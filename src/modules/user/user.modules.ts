import { Global, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from '../../bll/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../dal/entities/user.entity';

@Global()
@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {}
