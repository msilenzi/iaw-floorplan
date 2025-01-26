import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { UsersModule } from '../users/users.module'
import { OrganizationMembersController } from './controllers/organization-members.controller'
import { OrganizationsController } from './controllers/organizations.controller'
import { Organization, OrganizationSchema } from './schemas/organization.schema'
import { OrganizationMembersService } from './services/organization-members.service'
import { OrganizationsService } from './services/organizations.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organization.name, schema: OrganizationSchema },
    ]),
    UsersModule,
  ],
  controllers: [OrganizationsController, OrganizationMembersController],
  providers: [OrganizationsService, OrganizationMembersService],
  exports: [OrganizationsService, OrganizationMembersService],
})
export class OrganizationsModule {}
