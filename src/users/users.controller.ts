import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Session,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Serialize } from 'src/interceptors/serialize/serialize.interceptor';
import { UserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUser } from 'src/decorators/current-user/current-user.decorator';
import { CurrentUserInterceptor } from './currentUser.interceptor';
import { UserEntity } from './entities/user.entity';

@Controller('auth')
@Serialize(UserDto)
@UseInterceptors(CurrentUserInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  whoAmI(@CurrentUser() user: UserEntity) {
    return user
  }

  @Post('/register')
  async create(@Body() createUserDto: CreateUserDto, @Session() session: any) {
    const user = await this.authService.register(
      createUserDto.email,
      createUserDto.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/login')
  async signIn(@Body() signInUser: CreateUserDto, @Session() session: any) {
    const user = await this.authService.login(
      signInUser.email,
      signInUser.password,
    );
    session.userId = user.id;
    return user;
  }

  @Post('/logout')
  signOut(@Session() session: any) {
    delete session['userId'];
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
