import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProjectsModule } from '../projects/projects.module'
import { ProjectsService } from '../projects/projects.service'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { OrganizationMembersController } from './controllers/organization-members.controller'
import { OrganizationsController } from './controllers/organizations.controller'
import { Organization, OrganizationSchema } from './schemas/organization.schema'
import { OrganizationMembersService } from './services/organization-members.service'
import { OrganizationsService } from './services/organizations.service'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Organization.name,
        imports: [forwardRef(() => ProjectsModule)],
        useFactory: (projectsService: ProjectsService) => {
          const schema = OrganizationSchema

          schema.pre(
            'deleteOne',
            { document: true, query: false },
            async function () {
              await projectsService._removeAllByOrganizationId(this._id)
            },
          )

          return schema
        },
        inject: [ProjectsService],
      },
    ]),
    S3Module,
    UsersModule,
  ],
  controllers: [OrganizationsController, OrganizationMembersController],
  providers: [OrganizationsService, OrganizationMembersService],
  exports: [OrganizationsService, OrganizationMembersService],
})
export class OrganizationsModule {}
