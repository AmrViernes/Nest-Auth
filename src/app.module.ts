import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportsModule } from './reports/reports.module';
import { UsersModule } from './users/users.module';
import { UserEntity } from './users/entities/user.entity';
import { ReportEntity } from './reports/entities/report.entity'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'sqlite',
        database: configService.get('DB_NAME'),
        entities: [UserEntity, ReportEntity],
        synchronize: true,
        })
    }),
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: 'db.sqlite',
    //   entities: [UserEntity, ReportEntity],
    //   synchronize: true,
    // }),
    ReportsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
