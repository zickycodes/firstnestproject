import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controllers';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/service/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/User';
import { JwtStrategy } from './strategy/JwtStrategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as redis from 'redis';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_Secret'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    SequelizeModule.forFeature([User]),
    ConfigModule, // Add ConfigModule import here
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    {
      provide: 'RedisToken',
      useFactory: (configService: ConfigService) => {
        return redis.createClient({
          host: configService.get('Redis_Host'),
          port: parseInt(configService.get('Redis_Port'), 10),
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [],
})
export class AuthModule {}
