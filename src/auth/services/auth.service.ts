import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
import {
  HttpException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EmailEvent } from 'src/email/events/emailevents';
import { SignUpDto } from '../dtos/signupdto';
import { LoginDto } from '../dtos/logindto';
import * as bcrypt from 'bcrypt';
import { RefreshDto } from '../dtos/refreshdto';
import { JwtService } from '@nestjs/jwt';
import * as otpGenerator from 'otp-generator';
import * as redis from 'redis';

// import { TOTPVerifyOptions } from 'speakeasy';

@Injectable()
export class AuthService {
  // redisClient = redis.createClient({
  //   url: 'redis://localhost:6379',
  // });
  constructor(
    // @InjectRepository(User) private AuthRepository: Repository<User>,
    @Inject('RedisToken') private readonly redisClient: redis.RedisClient,
    private readonly userService: UsersService,
    private readonly eventEmitter: EventEmitter2,
    // replace with your own secret key
    private jwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
    const user = await this.userService.findOne({ email: dto.email });
    // console.log('user', user);
    if (user === null) {
      const res = await this.userService.createUser(dto);
      this.eventEmitter.emit('welcome-email', new EmailEvent(dto.email, 400));
      return {
        message: 'User created sucessfully',
        status: 200,
        res: {
          id: res.id,
          email: res.email,
        },
      };
    } else {
      throw new HttpException(
        {
          status: 400,
          error: 'User already exists',
        },
        400,
      );
    }
  }

  async login(dto: LoginDto) {
    const user = await this.userService.findOne({ email: dto.email });
    if (user) {
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (isMatch) {
        const payload = { email: user.email, sub: user.id, role: user.role };
        const access_token = this.jwtService.sign(payload);
        const refreshToken = this.jwtService.sign(payload);
        await this.userService.findOneAndUpdate(user.id, { refreshToken });
        return {
          access_token,
          refreshToken,
          id: user.id,
          role: user.role,
        };
      } else {
        throw new HttpException(
          {
            statusCode: 402,
            error: 'Incorrect password',
          },
          402,
        );
      }
    } else {
      throw new NotFoundException('User not found');
    }
  }

  async refreshToken(dto: RefreshDto, id: number) {
    const user = await this.userService.findOne({ id });

    if (user.refreshToken !== dto.refreshtoken) {
      console.log(user.refreshToken);
      console.log(dto.refreshtoken);
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    } else {
      const payload = { email: user.email, sub: user.id, role: user.role };
      const access_token = this.jwtService.sign(payload);
      const refreshToken = this.jwtService.sign(payload);
      await this.userService.findOneAndUpdate(user.id, { refreshToken });
      return {
        access_token,
        refreshToken,
        id: user.id,
        role: user.role,
      };
    }
  }

  async sendOtp(email: string) {
    const user = await this.userService.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const secret = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });

    this.redisClient.setex(email, 600, secret);

    console.log(secret, email);
    // await this.cacheManager.set('wiz', secret, 1000);
    this.eventEmitter.emit('send-otp', new EmailEvent(email, secret));

    return {
      statusCode: 201,
      message: 'Check your email for the OTP',
    };
  }

  async resetPassword(email: string, token: any, password: string) {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tokenFromRedis = await new Promise<string>((resolve, reject) => {
      this.redisClient.get(email, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    if (tokenFromRedis !== token) {
      throw new BadRequestException('Invalid token');
    }

    await this.userService.findOneAndUpdate(user.id, { password });

    return {
      statusCode: 201,
      message: 'Password successfully changed',
    };
  }
}
