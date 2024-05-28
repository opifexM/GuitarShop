import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { CryptoModule } from '../crypto/crypto.module';
import { LocalStrategy } from './authentication/local.strategy';
import { UserRepository } from './entity/user.repository';
import { UserModel, UserSchema } from './entity/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    CryptoModule,
    JwtModule.registerAsync(getJwtAsyncOptions()),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, LocalStrategy],
})
export class UserModule {}

function getJwtAsyncOptions(): JwtModuleAsyncOptions {
  return {
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => {
      return {
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_ACCESS_TOKEN_EXPIRES_IN'),
          algorithm: 'HS512',
        },
      };
    },
    inject: [ConfigService],
  };
}
