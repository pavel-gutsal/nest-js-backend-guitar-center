import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './schemas/auth.schema';

export const GetUser = createParamDecorator(
  (_data, ctx: ExecutionContext): string => {
    const req = ctx.switchToHttp().getRequest();
    const user: UserDocument = req.user;
    return user.email;
  },
);
