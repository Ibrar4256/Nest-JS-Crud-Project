import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './auth.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { jwtPayload } from './jwt-payload.interface';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    try {
      return this.usersRepository.createUser(authCredentialsDTO);
    } catch (error) {
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDTO;
    try {
      const user = await this.usersRepository.findOne({ where: { username } });

      if (user && (await bcrypt.compare(password, user.password))) {
        const payload: jwtPayload = { username };
        const accessToken: string = await this.jwtService.sign(payload);
        console.log(accessToken);
        return { accessToken };
      } else {
        throw new UnauthorizedException('Please check your login credentials');
      }
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new InternalServerErrorException('Failed to sign in');
    }
  }
}
