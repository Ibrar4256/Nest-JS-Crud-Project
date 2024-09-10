import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.dataSource.transaction(async (manager) => {
      const { username, password } = authCredentialsDTO;

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = manager.create(User, {
        username,
        password: hashedPassword,
      });

      try {
        // Attempt to save the new user within the transaction
        await manager.save(user);
      } catch (error) {
        if (error.code === '23505') {
          // Handle duplicate username error
          throw new ConflictException('Username already exists (repository)');
        } else {
          throw new InternalServerErrorException();
        }
      }
    });
  }
}
