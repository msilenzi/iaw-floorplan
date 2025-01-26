import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'

import { Protected } from 'src/modules/auth/decorators/protected.decorator'
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
          new MaxFileSizeValidator({ maxSize: mibToBytes(1) }),
          new FileTypeValidator({
            fileType: /^(image\/(jpeg|png)|application\/pdf)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
    @GetProject() project: ProjectDocument,
  ) {
    return this.projectResourcesService.create(dto, file, project)
  }
}
