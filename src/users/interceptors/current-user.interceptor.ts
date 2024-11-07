import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { UsersService } from '../users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private userService: UsersService) {}

  // context: is a wrapper around the incoming request
  // handler: Reference to actual route handler
  async intercept(context: ExecutionContext, handler: CallHandler<any>) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    // Check if there is any loged in user
    if (userId) {
      const user = await this.userService.findOne(userId);
      request.currentUser = user;
    }
    // Otherwise user not loged in
    return handler.handle();
  }
}
