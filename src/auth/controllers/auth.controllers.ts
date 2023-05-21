import {
  Body,
  Controller,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto } from '../dtos/signupdto';
import { LoginDto } from '../dtos/logindto';
import { RefreshDto } from '../dtos/refreshdto';
import { ForgotPasswordDto } from '../dtos/Forgotpassowrddto';
import { ResetPasswordDto } from '../dtos/Resetpassworddto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  signUp(@Body() dto: SignUpDto): any {
    return this.authService.signup(dto);
  }

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  login(@Body() dto: LoginDto): any {
    return this.authService.login(dto);
  }

  @Put('/refresh/:userid')
  @UsePipes(new ValidationPipe({ transform: true }))
  refresh(@Body() dto: RefreshDto, @Param('userid') userid: number): any {
    return this.authService.refreshToken(dto, userid);
  }

  @Get('/profile')
  @UseGuards(JwtAuthGuard)
  getprofile(@Request() req): { status: number; message: string } {
    console.log(req.user);
    return {
      status: 200,
      message: 'Yeah feel me',
    };
  }

  @Post('forgot-password')
  forgotPassword(@Body() dto: ForgotPasswordDto): object {
    return this.authService.sendOtp(dto.email);
  }

  @Put('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const { email, token, password } = dto;
    return this.authService.resetPassword(email, token, password);
  }

  // @Post('reset-password')
  // async resetPassword(
  // @Body() resetPasswordDto: ResetPasswordDto,
  // ): Promise<void> {
  // const { email, token, newPassword } = resetPasswordDto;
  // const user = await this.userService.findByEmail(email);

  // if (!user) {
  //   throw new NotFoundException('User not found');
  // }

  // // validate OTP token
  // if (
  //   !user.forgotPasswordToken ||
  //   !this.authService.verifyOtpToken(token) ||
  //   user.forgotPasswordExpiresAt < new Date()
  // ) {
  //   throw new BadRequestException('Invalid or expired token');
  // }

  // // update password
  // await this.userService.updatePassword(user, newPassword);

  // // clear the OTP token and expiration time
  // user.forgotPasswordToken = null;
  // user.forgotPasswordExpiresAt = null;
  // await this.userService.update(user);
  // }
}
