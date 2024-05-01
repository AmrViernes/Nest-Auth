import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { scrypt as _scrypt, randomBytes } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(email: string, password: string) {
    // Check if user exist
    const user = this.usersService.findByEmail(email);
    if ((await user).length)
      throw new BadRequestException('User already exists.');

    // Hash user Password
    // Generate the salt
    const salt = randomBytes(8).toString('hex');
    // Hash mixedPassword with the Salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Join hashed and salt together
    const hashedPassword = salt + '.' + hash.toString('hex');

    // create user and save it in the database
    const createUser = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // Return User
    return createUser;
  }

  async login(email: string, password: string) {
    const [user] = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not Found..!');

    const [salt, storedHash] = user.password.split('.');

    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Wrong Password..!');
    }
    return user;
  }
}
