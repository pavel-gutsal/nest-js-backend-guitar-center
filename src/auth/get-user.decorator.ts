import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthDocument } from './schemas/auth.schema';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const user: AuthDocument = req.user;
    return user.email;
  },
);
