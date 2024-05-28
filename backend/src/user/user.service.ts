import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Token } from 'shared/type/token.interface';
import { BcryptCrypto } from '../crypto/bcrypt.crypto';
import { createJWTPayload } from './authentication/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserFactory } from './entity/user.factory';
import { UserRepository } from './entity/user.repository';
import {
  USER_AUTHENTICATION_PASSWORD_WRONG,
  USER_EXISTS,
  USER_NOT_FOUND,
} from './user.constant';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptCrypto: BcryptCrypto,
    private readonly jwtService: JwtService,
  ) {}

  public async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const { email, name, password } = dto;
    this.logger.log(`Attempting to create user with email: ${email}`);

    const existUser = await this.userRepository.findByEmail(email);
    if (existUser) {
      this.logger.warn(`User with email '${email}' already exists`);
      throw new ConflictException(USER_EXISTS);
    }

    const hashPassword = await this.bcryptCrypto.hashPassword(password);
    const userData = {
      name: name,
      email: email,
      password: hashPassword,
    };

    const userEntity = UserFactory.createEntity(userData);
    const createdUser = await this.userRepository.save(userEntity);
    this.logger.log(`User created with ID: '${createdUser.id}'`);

    //todo email

    return createdUser;
  }

  public async findUserById(userId: string): Promise<UserEntity> {
    this.logger.log(`Looking for user with ID: '${userId}'`);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    return foundUser;
  }

  public async updateUserById(
    userId: string,
    dto: UpdateUserDto,
  ): Promise<UserEntity> {
    this.logger.log(`Updating user with ID: '${userId}'`);
    const updatedUser = await this.findUserById(userId);

    if (dto.name !== undefined) updatedUser.name = dto.name;
    if (dto.email !== undefined) updatedUser.email = dto.email;
    if (dto.password !== undefined) updatedUser.password = dto.password;

    return this.userRepository.update(userId, updatedUser);
  }

  public async deleteUserById(userId: string): Promise<UserEntity> {
    this.logger.log(`Deleting user with ID: '${userId}'`);
    const foundUser = await this.userRepository.findById(userId);
    if (!foundUser) {
      this.logger.warn(`User not found with ID: '${userId}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const deletedUser = await this.userRepository.deleteById(userId);
    this.logger.log(`User with ID: '${userId}' deleted`);

    return deletedUser;
  }

  public async exists(userId: string): Promise<boolean> {
    return this.userRepository.exists(userId);
  }

  public async createUserToken(user: UserEntity): Promise<Token> {
    this.logger.log(`Generating token for user ID: '${user.id}'`);
    const accessTokenPayload = createJWTPayload(user);

    try {
      const accessToken = await this.jwtService.signAsync(accessTokenPayload);
      this.logger.log(
        `Tokens generated successfully for user ID: '${user.id}'`,
      );

      return { accessToken };
    } catch (error) {
      this.logger.error('[Tokens generation error]: ' + error.message);
      throw new HttpException(
        'Tokens generation error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async verifyUser(dto: LoginDto): Promise<UserEntity> {
    this.logger.log(`Verifying user: ${dto.email}`);
    const { email, password } = dto;

    const existUser = await this.userRepository.findByEmail(email);
    if (!existUser) {
      this.logger.warn(`User not found with email: '${email}'`);
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const isPasswordCorrect = await this.bcryptCrypto.verifyPassword(
      password,
      existUser.password,
    );
    if (!isPasswordCorrect) {
      this.logger.warn(`Incorrect password attempt for user: ${dto.email}`);
      throw new UnauthorizedException(USER_AUTHENTICATION_PASSWORD_WRONG);
    }
    this.logger.log(`User verified: ${existUser.email}`);

    return existUser;
  }
}
