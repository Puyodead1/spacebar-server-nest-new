import { CanActivate, ExecutionContext, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { SecurityConfig } from "../config/config";
import { UsersService } from "../users/users.service";
import { IS_PUBLIC_KEY } from "./skipauth.decorator";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private securityConfig: SecurityConfig,
    private usersService: UsersService,
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [context.getHandler(), context.getClass()]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.securityConfig.jwtSecret,
      });

      const user = await this.usersService.fineOne({
        where: {
          id: payload.sub,
        },
      });

      if (!user) throw new NotFoundException();

      request["user"] = user;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
