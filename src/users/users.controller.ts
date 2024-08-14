import { Controller, Get, Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Users } from "./users.entity";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor() {}

  @Get("@me")
  @ApiOkResponse({ description: "Get currently authenticated user", type: Users })
  me(@Request() req): Users {
    return req.user;
  }
}
