import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { Protected } from '../auth/decorators/protected.decorator'
import { Sub } from '../auth/decorators/sub.decorator'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { FindAllOrganizationsDto } from './dto/find-all-organizations.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { OrganizationsService } from './organizations.service'

@Protected()
@Controller('organizations')
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  /**
   * Crea una nueva organización.
   */
  @Post()
  create(@Body() dto: CreateOrganizationDto, @Sub() sub: string) {
    return this.organizationsService.create(dto, sub)
  }

  /**
   * Devuelve las organizaciones del usuario, agrupadas por su estado en cada
   * una y ordenadas por último acceso.
   */
  @Get()
  findAll(@Sub() sub: string): Promise<FindAllOrganizationsDto[]> {
    return this.organizationsService.findAll(sub)
  }

  /**
   * Devuelve la organización solo si el usuario es un miembro activo
   * y actualiza el valor de último acceso.
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizationsService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOrganizationDto: UpdateOrganizationDto,
  ) {
    return this.organizationsService.update(+id, updateOrganizationDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizationsService.remove(+id)
  }
}
