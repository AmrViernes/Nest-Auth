import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: any, res: any, next: () => void) {
    const {userId} = req.session || {}
    if(userId){
      const user = await this.userService.findOne(userId)
      req.currentUser = user
    }
    
    next();
  }
}
