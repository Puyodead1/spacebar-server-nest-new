import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule, databaseConfig, securityConfig } from "./config/config.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot({
      ...(databaseConfig as any),
      autoLoadEntities: true,
    }),
    JwtModule.register({
      global: true,
      secret: securityConfig.jwtSecret,
    }),
    AuthModule,
    UsersModule,
    ConfigModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
