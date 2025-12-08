import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserDataService } from './user.data.service';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserDataService],
  exports: [UserDataService],
})
export class DalModules {}
