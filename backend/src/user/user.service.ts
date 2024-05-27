import { ConflictException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BcryptCrypto } from '../crypto/bcrypt.crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserFactory } from './entity/user.factory';
import { UserRepository } from './entity/user.repository';
import { USER_EXISTS, USER_NOT_FOUND } from './user.constant';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly bcryptCrypto: BcryptCrypto,
  ) {
  }

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
}
