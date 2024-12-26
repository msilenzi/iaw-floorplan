import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import cfg from './cfg'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [MongooseModule.forRoot(cfg.MONGODB_URI), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
