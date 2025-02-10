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
import { ResourceFindOneDto } from './dtos/resource-find-one.dto'
import { ResourceUpdateDto } from './dtos/resource-update.dto'
import { ResourcesFindAllDto } from './dtos/resources-find-all.dto'
import { ResourcesService } from './resources.service'
import { Resource, ResourceDocument } from './schemas/resource.schema'

@Protected()
@Controller()
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  /**
   * Crea un nuevo recurso para un proyecto.
   */
  @Post('projects/:projectId/resources')
  @ProjectAccess()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.NO_CONTENT)
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
  ): Promise<void> {
    return this.resourcesService.create(dto, file, organization, project, sub)
  }

  /**
   * Devuelve todos los recursos de un proyecto.
   */
  @Get('projects/:projectId/resources')
  @ProjectAccess()
  findAll(
    @GetProject() project: ProjectDocument,
  ): Promise<ResourcesFindAllDto[]> {
    return this.resourcesService.findAll(project)
  }

  /**
   * Devuelve la información de un recurso,
   * con una URL temporal para acceder al mismo.
   */
  @Get('resources/:resourceId')
  @ResourceAccess()
  findOne(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
    @GetResource() resource: ResourceDocument,
  ): Promise<ResourceFindOneDto> {
    return this.resourcesService.findOne(organization, project, resource)
  }

  /**
   * Permite actualizar el nombre de un recurso.
   */
  @Patch('resources/:resourceId')
  @ResourceAccess()
  update(
    @GetResource() resource: ResourceDocument,
    @Body() dto: ResourceUpdateDto,
  ): Promise<Resource> {
    return this.resourcesService.update(resource, dto)
  }

  /**
   * Elimina permanentemente un recurso y todos sus recortes asociados.
   */
  @Delete('resources/:resourceId')
  @ResourceAccess()
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @GetOrganization() organization: OrganizationDocument,
    @GetResource() resource: ResourceDocument,
  ): Promise<void> {
    return this.resourcesService.remove(organization, resource)
  }
}
