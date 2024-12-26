import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { Organization } from './schemas/organization.schema'
import { MemberStatus } from './types/member-status.enum'

@Injectable()
export class OrganizationsService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(dto: CreateOrganizationDto, userId: string): Promise<void> {
    const organization = new this.organizationModel({
      ...dto,
      members: [{ userId, status: MemberStatus.OWNER, lastAccessedAt: null }],
    })
    await organization.save()
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
