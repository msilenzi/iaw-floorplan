import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

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

  @Post()
  @ApiOperation({ summary: 'crea una nueva organización' })
  create(@Body() dto: CreateOrganizationDto, @Sub() sub: string) {
    return this.organizationsService.create(dto, sub)
  }

  @Get()
  @ApiOperation({
    summary:
      'devuelve las organizaciones del usuario, agrupadas por su estado en cada una y ordenadas por último acceso',
  })
  findAll(@Sub() sub: string): Promise<FindAllOrganizationsDto[]> {
    return this.organizationsService.findAll(sub)
  }

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
