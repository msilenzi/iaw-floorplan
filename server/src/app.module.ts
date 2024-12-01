import { Module } from '@nestjs/common'
import { AuthzModule } from './authz/authz.module'
import { MongooseModule } from '@nestjs/mongoose'
import config from './config'

@Module({
  imports: [AuthzModule, MongooseModule.forRoot(config.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
