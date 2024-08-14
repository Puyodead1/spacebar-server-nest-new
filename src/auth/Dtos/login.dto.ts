import { IsBoolean, IsDefined, IsOptional, IsString } from "class-validator";

export class LoginDto {
  @IsDefined()
  @IsString()
  login: string;
  @IsDefined()
  @IsString()
  password: string;
  @IsBoolean()
  @IsOptional()
  undelete?: boolean;
  @IsString()
  @IsOptional()
  login_source?: string | null;
  @IsString()
  @IsOptional()
  gift_code_sku_id?: string | null;
}
