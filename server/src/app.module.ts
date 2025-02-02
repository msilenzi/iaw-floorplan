import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import cfg from './cfg'
import { AuthModule } from './modules/auth/auth.module'
import { CropsModule } from './modules/crops/crops.module'
import { OrganizationsModule } from './modules/organizations/organizations.module'
import { ProjectsModule } from './modules/projects/projects.module'
import { ResourcesModule } from './modules/resources/resources.module'
import { S3Module } from './modules/s3/s3.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot(cfg.MONGODB_URI),
    AuthModule,
    OrganizationsModule,
    UsersModule,
    ProjectsModule,
    S3Module,
    ResourcesModule,
    CropsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
