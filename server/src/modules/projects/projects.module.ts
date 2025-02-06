import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OrganizationsModule } from '../organizations/organizations.module'
import { ResourcesModule } from '../resources/resources.module'
import { ResourcesService } from '../resources/resources.service'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ProjectsController } from './projects.controller'
import { ProjectsService } from './projects.service'
import { Project, ProjectSchema } from './schemas/project.schema'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Project.name,
        imports: [forwardRef(() => ResourcesModule)],
        useFactory: (resourcesService: ResourcesService) => {
          const schema = ProjectSchema

          schema.pre(
            'deleteOne',
            { document: true, query: false },
            async function () {
              await resourcesService._removeAllByProjectId(this._id)
            },
          )

          schema.pre(
            'deleteMany',
            { document: false, query: true },
            async function () {
              const projectsIds = await this.model
                .find(this.getQuery(), { _id: 1 })
                .exec()
              await resourcesService._removeAllByProjectsIds(
                projectsIds.map((p) => p._id),
              )
            },
          )

          return schema
        },
        inject: [ResourcesService],
      },
    ]),
    forwardRef(() => OrganizationsModule),
    S3Module,
    UsersModule,
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [ProjectsService],
})
export class ProjectsModule {}
