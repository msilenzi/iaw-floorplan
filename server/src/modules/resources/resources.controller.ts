import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { mibToBytes } from 'src/common/utils/mibToBytes'
import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { GetOrganization } from '../organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { GetProject } from '../projects/decorators/get-project.decorator'
import { ProjectAccess } from '../projects/decorators/project-access.decorator'
import { ProjectDocument } from '../projects/schemas/project.schema'
import { ResourceCreateDto } from './dtos/resource-create.dto'
import { ResourceUpdateDto } from './dtos/resource-update.dto'
import { ResourcesService } from './resources.service'

@Protected(ProjectAccess())
@Controller('project/:projectId/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: ResourceCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: mibToBytes(15) }),
          new FileTypeValidator({
            fileType: /^(image\/(jpeg|png)|application\/pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @Sub() sub: string,
  ) {
    return this.resourcesService.create(dto, file, organization, project, sub)
  }

  @Get()
  findAll(@GetProject() project: ProjectDocument) {
    return this.resourcesService.findAll(project)
  }

  @Get(':resourceId')
  @ApiParam({ name: 'resourceId', type: String })
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @Param('resourceId', ParseMongoIdPipe) resourceId: Types.ObjectId,
  ) {
    return this.resourcesService.findOne(organization, project, resourceId)
  }

  @Patch(':resourceId')
  @ApiParam({ name: 'resourceId', type: String })
  update(
    @Param('resourceId', ParseMongoIdPipe) resourceId: Types.ObjectId,
    @Body() dto: ResourceUpdateDto,
  ) {
    return this.resourcesService.update(resourceId, dto)
  }
}
