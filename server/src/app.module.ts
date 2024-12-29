import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import cfg from './cfg'
import { AuthModule } from './modules/auth/auth.module'
import { OrganizationsModule } from './modules/organizations/organizations.module'
import { UsersModule } from './modules/users/users.module'

@Module({
  imports: [
    MongooseModule.forRoot(cfg.MONGODB_URI),
    AuthModule,
    OrganizationsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
