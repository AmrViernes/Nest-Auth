import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { CurrentUserInterceptor } from './currentUser.interceptor';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
  imports: [TypeOrmModule.forFeature([UserEntity])],
})
export class UsersModule {}
