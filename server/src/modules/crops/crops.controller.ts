import { Controller, Get, Patch, Post } from '@nestjs/common'

import { Protected } from '../auth/decorators/protected.decorator'
import { ProjectAccess } from '../projects/decorators/project-access.decorator'
import { ResourceAccess } from '../resources/decorators/resource-access.decorator'
import { CropsService } from './crops.service'

@Protected()
@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}

  /**
   * Crear un nuevo recorte.
   */
  @Post()
  @ResourceAccess('query')
  create() {
    return 'Crear un nuevo recorte.'
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
