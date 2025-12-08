import { Global, Module } from '@nestjs/common';
import { UserModule } from '../user/user.modules';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { DalModules } from 'src/dal/dal.modules';
import { UserController } from '../user/user.controller';
import { UserDataService } from 'src/dal/user.data.service';

@Global()
@Module({
  imports: [UserModule, DalModules, JwtModule.register({})],
  providers: [AuthService],
  exports: [AuthService],
  controllers: [UserController],
})
export class FrontEndModule {}
