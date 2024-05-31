// @ts-nocheck
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Length } from 'class-validator';
import { USER } from '../../../../backend/src/user/entity/user.constant';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({
    example: 'user@example.com',
    description: 'The email of the user',
  })
  public email?: string;

  @IsOptional()
  @IsString()
  @Length(USER.NAME.MIN, USER.NAME.MAX)
  @ApiPropertyOptional({
    example: 'John Doe',
    description: 'The name of the user',
    minLength: USER.NAME.MIN,
    maxLength: USER.NAME.MAX,
  })
  public name?: string;

  @IsOptional()
  @IsString()
  @Length(USER.PASSWORD.MIN, USER.PASSWORD.MAX)
  @ApiProperty({
    example: '123456',
    description: 'The password of the user',
    minLength: USER.PASSWORD.MIN,
    maxLength: USER.PASSWORD.MAX,
  })
  public password?: string;
}
