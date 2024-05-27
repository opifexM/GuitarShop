import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { USER } from '../entity/user.constant';

export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email: string;

  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  @ApiProperty({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER.NAME.MIN,
    maxLength: USER.NAME.MAX,
  })
  public name: string;

  @IsString()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
    minLength: USER.PASSWORD.MIN,
    maxLength: USER.PASSWORD.MAX,
  })
  public password: string;
}
