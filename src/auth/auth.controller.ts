import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { ApiBody, ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { APILoginResponse, APIRegisterResponse, AuthService } from "./auth.service";
import { LoginDto } from "./Dtos/login.dto";
import { RegisterDto } from "./Dtos/register.dto";
import { SkipAuth } from "./skipauth.decorator";

@SkipAuth()
@Controller("auth")
@ApiTags("authentication")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ description: "User logged in.", type: APILoginResponse })
  // TODO: document errors
  login(@Body() loginDto: LoginDto): Promise<APILoginResponse> {
    return this.authService.login(loginDto);
  }

  @SkipAuth()
  @Post("register")
  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ description: "User created.", type: APIRegisterResponse })
  // TODO: document errors
  register(@Body() registerDto: RegisterDto): Promise<APIRegisterResponse> {
    return this.authService.register(registerDto);
  }
}
