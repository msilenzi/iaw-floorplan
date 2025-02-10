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
import { GetResource } from '../resources/decorators/get-resource.decorator'
import { ResourceAccess } from '../resources/decorators/resource-access.decorator'
import { ResourceDocument } from '../resources/schemas/resource.schema'
import { CropsService } from './crops.service'
import { CropAccess } from './decorators/crop-access.decorator'
import { GetCrop } from './decorators/get-crop.decorator'
import { CropCreateDto } from './dtos/crop-create.dto'
import { CropUpdateDto } from './dtos/crop-update.dto'
import { CropDocument } from './schemas/crop.schema'

@Protected()
@Controller()
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  /**
   * Crea un nuevo recorte de un recurso.
   */
  @Post('resources/:resourceId/crops')
  @ResourceAccess()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() dto: CropCreateDto,
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
    @GetResource() resource: ResourceDocument,
    @GetOrganization() organization: OrganizationDocument,
    @Sub() sub: string,
  ) {
    return this.cropsService.create(dto, file, resource, organization, sub)
  }

  /**
   * Lista todos los recortes de un proyecto.
   */
  @Get('projects/:projectId/crops')
  @ProjectAccess()
  findAllFromProject(
    @GetOrganization() organization: OrganizationDocument,
    @GetProject() project: ProjectDocument,
  ) {
    return this.cropsService.findAllFromProject(project, organization)
  }

  /**
   * Lista todos los recortes de un recurso.
   */
  @Get('resources/:resourceId/crops')
  @ResourceAccess()
  findAllFromResource(
    @GetOrganization() organization: OrganizationDocument,
    @GetResource() resource: ResourceDocument,
  ) {
    return this.cropsService.findAllFromResource(resource, organization)
  }

  /**
   * Actualiza un recorte.
   */
  @Patch('crops/:cropId')
  @CropAccess()
  update(@Body() dto: CropUpdateDto, @GetCrop() crop: CropDocument) {
    return this.cropsService.update(dto, crop)
  }

  /**
   * Elimina permanentemente un recorte.
   */
  @Delete('crops/:cropId')
  @CropAccess()
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @GetCrop() crop: CropDocument,
    @GetOrganization() organization: OrganizationDocument,
  ) {
    await this.cropsService.remove(organization, crop)
  }
}
