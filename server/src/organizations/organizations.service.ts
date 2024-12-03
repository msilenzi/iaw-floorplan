import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { UserStatus } from './schemas/organization-user.schema'
import { Organization } from './schemas/organization.schema'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(createOrganizationDto: CreateOrganizationDto, userId: string) {
    return this.organizationModel.create({
      name: createOrganizationDto.name,
      users: [{ userId, status: UserStatus.ADMIN, stateChangedAt: new Date() }],
    })
  }

  findAll() {
    return `This action returns all organizations`
  }

  findOne(id: number) {
    return `This action returns a #${id} organization`
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`
  }

  remove(id: number) {
    return `This action removes a #${id} organization`
  }
}
