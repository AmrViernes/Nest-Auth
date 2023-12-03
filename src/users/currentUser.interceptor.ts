import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private readonly usersService: UsersService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    // Make sure the user object exists and is populated with data.
    if (userId) {
        const user = await this.usersService.findOne(userId)
        request.currentUser = user
    }
    return next.handle();
  }
}
