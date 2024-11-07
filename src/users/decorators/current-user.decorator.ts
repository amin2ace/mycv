import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Syntax to create a decorator
export const CurrentUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    // ExecutionContext helps to proccess all communication protocols like
    // (WebSocket, gRPC, http,...)
    // Data type of never means this value is never gono used or accessed
    const request = context.switchToHttp().getRequest();
    return request.currentUser;
  },
);
