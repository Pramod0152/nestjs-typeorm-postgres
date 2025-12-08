import { Global, Module } from '@nestjs/common';
import { UserModule } from '../user/user.modules';

@Global()
@Module({
  imports: [UserModule],
})
export class FrontEndModule {}
