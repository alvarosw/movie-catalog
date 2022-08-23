import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('POSTGRES_HOST'),
      port: this.config.get<number>('POSTGRES_PORT'),
      database: this.config.get<string>('POSTGRES_DB'),
      username: this.config.get<string>('POSTGRES_USER'),
      password: this.config.get<string>('POSTGRES_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
    };
  }
}
