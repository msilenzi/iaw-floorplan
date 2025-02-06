import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  HttpCode,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiConsumes } from '@nestjs/swagger'

import { mibToBytes } from 'src/common/utils/mibToBytes'
import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { GetOrganization } from '../organizations/decorators/get-organization.decorator'
import { OrganizationDocument } from '../organizations/schemas/organization.schema'
import { GetProject } from '../projects/decorators/get-project.decorator'
import { ProjectAccess } from '../projects/decorators/project-access.decorator'
import { ProjectDocument } from '../projects/schemas/project.schema'
import { GetResource } from './decorators/get-resource.decorator'
import { ResourceAccess } from './decorators/resource-access.decorator'
import { ResourceCreateDto } from './dtos/resource-create.dto'
import { ResourceUpdateDto } from './dtos/resource-update.dto'
import { ResourcesService } from './resources.service'
import { ResourceDocument } from './schemas/resource.schema'

@Protected()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  /**
   * Crea un nuevo recurso para un proyecto.
   */
  @Post()
  @ProjectAccess('query')
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

  /**
   * Devuelve todos los proyectos de una organización.
   */
  @Get()
  @ProjectAccess('query')
  findAll(@GetProject() project: ProjectDocument) {
    return this.resourcesService.findAll(project)
  }

  /**
   * Devuelve la información de un recurso.
   * Con una URL temporal para acceder al mismo.
   */
  @Get(':resourceId')
  @ResourceAccess()
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @GetResource() resource: ResourceDocument,
  ) {
    return this.resourcesService.findOne(organization, project, resource)
  }

  /**
   * Permite actualizar el nombre de un recurso.
   */
  @Patch(':resourceId')
  @ResourceAccess()
  update(
    @GetResource() resource: ResourceDocument,
    @Body() dto: ResourceUpdateDto,
  ) {
    return this.resourcesService.update(resource, dto)
  }

  /**
   * Eliminar un recurso y sus recortes permanentemente.
   */
  @Delete(':resourceId')
  @ResourceAccess()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @GetOrganization() organization: OrganizationDocument,
    @GetResource() resource: ResourceDocument,
  ) {
    await this.resourcesService.remove(organization, resource)
  }
}
