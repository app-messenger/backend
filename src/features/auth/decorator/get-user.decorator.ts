import {createParamDecorator, ExecutionContext} from "@nestjs/common";

import {User} from "@features/user";
import {ExtendedRequest} from "@lib/types";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest<ExtendedRequest>();

  return req.user;
});