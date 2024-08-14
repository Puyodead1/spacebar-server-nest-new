import { Type } from "class-transformer";
import { IsBoolean, IsDefined, IsIn, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

export class DatabaseConfig {
  @Type(() => String)
  @IsIn(["mysql", "postgres", "mariadb", "mssql", "oracle"])
  public readonly type!: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly url?: string;
  @Type(() => String)
  @IsString()
  @IsOptional()
  public readonly database?: string;
  @Type(() => Boolean)
  @IsBoolean()
  public readonly synchronize!: boolean;
}

export class SecurityRegistrationPasswordConfig {
  @Type(() => Number)
  @IsNumber()
  minLength: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  maxLength?: number | null;

  @Type(() => Number)
  @IsNumber()
  minLowercase: number;

  @Type(() => Number)
  @IsNumber()
  minNumbers: number;

  @Type(() => Number)
  @IsNumber()
  minSymbols: number;

  @Type(() => Number)
  @IsNumber()
  minUppercase: number;
}

export class SecurityRegistrationHandleConfig {
  @Type(() => Number)
  @IsNumber()
  minLength: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  maxLength?: number | null;
}

export class SecurityRegistrationDisplayNameConfig {
  @Type(() => Number)
  @IsNumber()
  minLength: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  maxLength?: number | null;
}

export class SecurityRegistrationConfig {
  @Type(() => SecurityRegistrationPasswordConfig)
  @ValidateNested()
  public readonly password: SecurityRegistrationPasswordConfig;

  @Type(() => SecurityRegistrationHandleConfig)
  @ValidateNested()
  public readonly handle: SecurityRegistrationHandleConfig;

  @Type(() => SecurityRegistrationDisplayNameConfig)
  @ValidateNested()
  public readonly displayName: SecurityRegistrationDisplayNameConfig;

  @Type(() => Number)
  @IsNumber()
  minAge: number;

  @Type(() => Number)
  @IsNumber()
  maxAge: number;
}

export class SecurityConfig {
  @Type(() => String)
  @IsDefined()
  @IsString()
  public readonly jwtSecret!: string;
  @Type(() => SecurityRegistrationConfig)
  @ValidateNested()
  public readonly registration: SecurityRegistrationConfig;
}

export class RootConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  public readonly database!: DatabaseConfig;

  @Type(() => SecurityConfig)
  @ValidateNested()
  public readonly security!: SecurityConfig;
}
