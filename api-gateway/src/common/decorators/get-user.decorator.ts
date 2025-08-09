import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserId = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext): number => {
    const request = ctx.switchToHttp().getRequest();
    if (data !== undefined) {
      return request.user[data];
    }
    return request.user.id;
  },
);
