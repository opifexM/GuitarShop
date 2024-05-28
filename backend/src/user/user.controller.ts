import {
  Body,
  Controller,
  Delete,
  Get, HttpStatus,
  Logger,
  Param,
  Patch,
  Post, Req, UseGuards
} from '@nestjs/common';
import { fillDto } from 'shared/lib/common';
import { TokenPayload } from 'shared/type/token-payload.interface';
import { MongoIdValidationPipe } from '../database/mongo-id-validation.pipe';
import { JwtAuthGuard } from './authentication/jwt-auth.guard';
import { LocalAuthGuard } from './authentication/local-auth.guard';
import { RequestWithTokenPayload } from './authentication/request-with-token-payload.interface';
import { RequestWithUser } from './authentication/request-with-user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggedRdo } from './rdo/logged.rdo';
import { UserRdo } from './rdo/user.rdo';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private readonly userService: UserService) {}

  @Post('')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserRdo,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  public async createUser(@Body() dto: CreateUserDto): Promise<UserRdo> {
    this.logger.log(`Creating new user with email: '${dto.email}'`);
    const createdUser = await this.userService.createUser(dto);

    return fillDto(UserRdo, createdUser.toPOJO());
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async getUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserRdo> {
    this.logger.log(`Retrieving user with ID: '${userId}'`);
    const foundUser = await this.userService.findUserById(userId);

    return fillDto(UserRdo, foundUser.toPOJO());
  }

  @Patch(':userId')
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async updateUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
    @Body() dto: UpdateUserDto,
  ): Promise<UserRdo> {
    this.logger.log(`Updating user with ID '${userId}'`);
    const updatedUser = await this.userService.updateUserById(userId, dto);

    return fillDto(UserRdo, updatedUser.toPOJO());
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    type: UserRdo,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public async deleteUser(
    @Param('userId', MongoIdValidationPipe) userId: string,
  ): Promise<UserRdo> {
    this.logger.log(`Attempting to delete user with ID: ${userId}`);
    const deletedUser = await this.userService.deleteUserById(userId);
    this.logger.log(`User deleted with ID: '${deletedUser.id}'`);

    return fillDto(UserRdo, deletedUser.toPOJO());
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: HttpStatus.OK, description: 'Login successful', type: LoginDto })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'User password is empty' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'User password is wrong' })
  public async login(
    @Req() { user }: RequestWithUser
  ): Promise<LoggedRdo> {
    this.logger.log(`User logged in successfully: ${user.email}`);
    const userToken = await this.userService.createUserToken(user);

    return fillDto(LoggedRdo, { ...userToken, ...user.toPOJO() });
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check validity of the access token' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Access token is valid' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized if token is invalid or expired' })
  public async checkToken(
    @Req() { user: payload }: RequestWithTokenPayload
  ): Promise<TokenPayload> {
    this.logger.log('Check JWT access token');

    return payload;
  }
}
