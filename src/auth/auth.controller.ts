import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    try {
      return this.authService.signUp(authCredentialsDTO);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }

  @Post('/signin')
  signIn(
    @Body() authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    try {
      return this.authService.signIn(authCredentialsDTO);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product');
    }
  }
}
