import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.currentUser) return false;
    if (request.currentUser.role === 2) {
      return true;
    } else {
      return false
    }
  }
}
