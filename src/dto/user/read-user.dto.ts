import { ApiProperty } from '@nestjs/swagger';

export class ReadUserDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  first_name: string;

  @ApiProperty()
  last_name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  bio: string;

  @ApiProperty()
  profile_picture: string;
}
