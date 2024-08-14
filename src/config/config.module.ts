import { TypedConfigModule, directoryLoader, selectConfig } from "nest-typed-config";
import { DatabaseConfig, RootConfig, SecurityConfig } from "./config";

export const ConfigModule = TypedConfigModule.forRoot({
  schema: RootConfig,
  load: directoryLoader({
    directory: "config",
  } as any),
  validationOptions: {
    forbidUnknownValues: false,
  },
});

export const rootConfig = selectConfig(ConfigModule, RootConfig);
export const databaseConfig = selectConfig(ConfigModule, DatabaseConfig);
export const securityConfig = selectConfig(ConfigModule, SecurityConfig);
