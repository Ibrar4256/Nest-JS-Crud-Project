import { Injectable } from '@nestjs/common';
import  {User} from './user.model'
@Injectable()
export class UsersService {
    private users:  User[] = [];

    getAllUsers()
    {
        return this.users;
    }
}
