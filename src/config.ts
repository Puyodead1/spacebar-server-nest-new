import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class DatabaseConfig {
  @Type(() => String)
  @IsIn(['mysql', 'postgres', 'sqlite', 'mariadb', 'mssql', 'oracle'])
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

export class RootConfig {
  @Type(() => DatabaseConfig)
  @ValidateNested()
  public readonly database!: DatabaseConfig;
}
