import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { OrganizationsService } from './organizations.service'
import { Organization } from './schemas/organization.schema'
import { ApiBearerAuth } from '@nestjs/swagger'
import { AuthGuard } from '@nestjs/passport'

@Controller('organizations')
@ApiBearerAuth('Auth0')
@UseGuards(AuthGuard('jwt'))
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Post()
  create(
    @Body() createOrganizationDto: CreateOrganizationDto,
    @Req() req: any,
  ): Promise<Organization> {
    return this.organizationsService.create(createOrganizationDto, req.user.sub)
  }

  @Get()
  findAll() {
    return this.organizationsService.findAll()
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
