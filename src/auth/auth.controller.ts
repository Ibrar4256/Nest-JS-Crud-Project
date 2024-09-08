import { Controller, Get, Post, Delete, Body , Param, Patch, Query} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return this.authService.signUp(authCredentialsDTO);
  }

  @Post('/signin')
  signIn(@Body() authCredentialsDTO: AuthCredentialsDTO): Promise<{ accessToken: string}> {
    return this.authService.signIn(authCredentialsDTO);
  }
}
