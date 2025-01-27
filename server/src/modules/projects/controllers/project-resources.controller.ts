import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes, ApiParam } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe'
import { Protected } from 'src/modules/auth/decorators/protected.decorator'
import { Sub } from 'src/modules/auth/decorators/sub.decorator'
import { GetOrganization } from 'src/modules/organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from 'src/modules/organizations/schemas/organization.schema'
import { GetProject } from '../decorators/get-project.decorator'
import { ProjectAccess } from '../decorators/project-access.decorator'
import { CreateProjectResourceDto } from '../dtos/create-project-resource.dto'
import { ProjectDocument } from '../schemas/project.schema'
import { ProjectResourcesService } from '../services/project-resources.service'
import { mibToBytes } from '../utils/mibToBytes'

@Protected(ProjectAccess())
@Controller('project/:projectId/resources')
export class ProjectResourcesController {
  constructor(
    private readonly projectResourcesService: ProjectResourcesService,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CreateProjectResourceDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: mibToBytes(5) }),
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
    return this.projectResourcesService.create(
      dto,
      file,
      organization,
      project,
      sub,
    )
  }

  @Get()
  findAll(@GetProject() project: ProjectDocument) {
    return this.projectResourcesService.findAll(project)
  }

  @Get(':resourceId')
  @ApiParam({ name: 'resourceId', type: String })
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @Param('resourceId', ParseMongoIdPipe) resourceId: Types.ObjectId,
  ) {
    return this.projectResourcesService.findOne(
      organization,
      project,
      resourceId,
    )
  }
}
