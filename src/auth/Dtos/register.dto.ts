import { Transform } from "class-transformer";
import { IsBoolean, IsDefined, IsEmail, IsOptional, IsString, IsStrongPassword, Length, Matches, MaxDate, MinDate } from "class-validator";
import { securityConfig } from "../../config/config.module";

export class RegisterDto {
  @IsBoolean()
  consent: boolean;
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - securityConfig.registration.maxAge)))
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - securityConfig.registration.minAge)))
  date_of_birth: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  fingerprint?: string | null;
  @IsString()
  @IsOptional()
  gift_code_sku_id?: string | null;
  @IsString()
  @Matches(/^[a-z0-9_.]+$/)
  @Length(securityConfig.registration.handle.minLength, securityConfig.registration.handle.maxLength)
  global_name: string;
  @IsString()
  @IsOptional()
  invite?: string | null;
  @IsDefined()
  @IsString()
  @IsStrongPassword({
    minLowercase: securityConfig.registration.password.minLowercase,
    minNumbers: securityConfig.registration.password.minNumbers,
    minSymbols: securityConfig.registration.password.minSymbols,
    minUppercase: securityConfig.registration.password.minUppercase,
  })
  @Length(securityConfig.registration.password.minLength, securityConfig.registration.password.maxLength)
  password: string;
  @IsString()
  @IsDefined()
  @Length(securityConfig.registration.displayName.minLength, securityConfig.registration.displayName.maxLength)
  username: string;
}
