import { Module, CacheModule } from '@nestjs/common';
import { AuthController } from './controllers/auth.controllers';
import { AuthService } from './services/auth.service';
import { UsersService } from 'src/users/service/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/users/modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/entities/User';
import { JwtStrategy } from './strategy/JwtStrategy';
import type { RedisClientOptions } from 'redis';
import * as redis from 'redis';
import * as redisStore from 'cache-manager-redis-store';
// import { TOTPVerifyOptions } from 'speakeasy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'lovingmeisamistake',
      signOptions: { expiresIn: '1h' },
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      // Store-specific configuration:
      socket: {
        host: '172.17.0.2',
        port: '6379',
      },
    }),
    SequelizeModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UsersService,
    JwtStrategy,
    {
      provide: 'RedisToken',
      useValue: redis.createClient({
        host: '127.0.0.1',
        port: '6379',
      }),
    },
  ],
  exports: [],
})
export class AuthModule {}
