import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiProperty } from "@nestjs/swagger";
import { compare, hash } from "bcrypt";
import { FieldErrors } from "../exceptions/field.exception";
import { UsersService } from "../users/users.service";
import { Snowflake } from "../utils/snowflake";
import { LoginDto } from "./Dtos/login.dto";
import { RegisterDto } from "./Dtos/register.dto";

export class APIUserSettings {
  @ApiProperty()
  locale: string;
  @ApiProperty()
  theme: string;
}

export class APILoginResponse {
  @ApiProperty()
  token: string;
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  user_settings: APIUserSettings;
}

export class APIRegisterResponse {
  @ApiProperty()
  token: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<APILoginResponse> {
    const user = await this.usersService.fineOne({
      where: {
        email: loginDto.login,
      },
    });

    if (!user) throw FieldErrors({ login: { message: "Login or password is incorrect." } });

    const isPasswordValid = await compare(loginDto.password, user.password);
    if (!isPasswordValid) throw FieldErrors({ login: { message: "Login or password is incorrect." } });

    const payload = { username: user.username, sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
      user_id: user.id,
      user_settings: {
        locale: user.locale,
        theme: user.theme,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<APIRegisterResponse> {
    const password = await hash(registerDto.password, 10);
    const user = await this.usersService.create({
      id: Snowflake.generate(),
      ...registerDto,
      password,
    });

    const payload = { username: user.username, sub: user.id };

    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
