import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { CropsModule } from '../crops/crops.module'
import { CropsService } from '../crops/crops.service'
import { OrganizationsModule } from '../organizations/organizations.module'
import { ProjectsModule } from '../projects/projects.module'
import { S3Module } from '../s3/s3.module'
import { UsersModule } from '../users/users.module'
import { ResourcesController } from './resources.controller'
import { ResourcesService } from './resources.service'
import { Resource, ResourceSchema } from './schemas/resource.schema'

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Resource.name,
        imports: [forwardRef(() => CropsModule)],
        useFactory: (cropsService: CropsService) => {
          const schema = ResourceSchema

          schema.pre(
            'deleteOne',
            { document: true, query: false },
            async function () {
              await cropsService._removeAllByResourceId(this._id)
            },
          )

          schema.pre(
            'deleteMany',
            { document: false, query: true },
            async function () {
              const resourcesIds = await this.model
                .find(this.getQuery(), { _id: 1 })
                .exec()
              await cropsService._removeAllByResourcesIds(
                resourcesIds.map((r) => r._id),
              )
            },
          )

          return schema
        },
        inject: [CropsService],
      },
    ]),
    S3Module,
    UsersModule,
    forwardRef(() => OrganizationsModule),
    forwardRef(() => ProjectsModule),
  ],
  controllers: [ResourcesController],
  providers: [ResourcesService],
  exports: [ResourcesService],
})
export class ResourcesModule {}
