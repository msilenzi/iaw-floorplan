import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import cfg from './cfg'
import { AuthModule } from './modules/auth/auth.module'
import { OrganizationsModule } from './modules/organizations/organizations.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { UsersModule } from './modules/users/users.module'
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [
    MongooseModule.forRoot(cfg.MONGODB_URI),
    AuthModule,
    OrganizationsModule,
    UsersModule,
    ProjectsModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
