import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { fileLoader, TypedConfigModule } from 'nest-typed-config';
import { RootConfig } from './config';

@Module({
  imports: [
    TypedConfigModule.forRoot({
      schema: RootConfig,
      load: fileLoader({
        basename: 'config',
      }),
      validationOptions: {
        forbidUnknownValues: false,
      },
    }),
    TypeOrmModule.forRootAsync({
      imports: [TypedConfigModule],
      useFactory: (config: RootConfig) => ({
        ...(config.database as any),
        autoLoadEntities: true,
      }),
      inject: [RootConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
