import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
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
import { ProjectAccess } from '../projects/decorators/project-access.decorator'
import { GetResource } from '../resources/decorators/get-resource.decorator'
import { ResourceAccess } from '../resources/decorators/resource-access.decorator'
import { ResourceDocument } from '../resources/schemas/resource.schema'
import { CropsService } from './crops.service'
import { CropCreateDto } from './dtos/crop-create.dto'

@Protected()
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  /**
   * Crear un nuevo recorte.
   */
  @Post()
  @ResourceAccess('query')
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
   * Listar todos los recortes de un proyecto.
   */
  @Get('project')
  @ProjectAccess('query')
  findAllFromProject() {
    return 'Listar todos los recortes de un proyecto.'
  }

  /**
   * Listar todos los recortes de un recurso.
   */
  @Get('resource')
  @ResourceAccess('query')
  findAllFromResource() {
    return 'Listar todos los recortes de un recurso.'
  }

  /**
   * Ver un recorte
   */
  @Get(':cropId')
  // TODO: @CropAccess()
  findOne() {
    return 'Ver un recorte'
  }

  /**
   * Actualizar un recorte
   */
  @Patch(':cropId')
  // TODO: @CropAccess()
  update() {
    return 'Actualizar un recorte'
  }
}
