import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import {
  Organization,
  OrganizationDocument,
} from './schemas/organization.schema'
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

  async findAll(userId: string) {
    return this.organizationModel
      .aggregate([
        { $match: { 'members.userId': userId } },
        { $unwind: '$members' },
        { $match: { 'members.userId': userId } },
        { $sort: { 'members.lastAccessedAt': -1 } },
        {
          $project: {
            _id: 1,
            name: 1,
            status: '$members.status',
            // lastAccessedAt: '$members.lastAccessedAt',
          },
        },
        {
          $group: {
            _id: '$status',
            organizations: {
              $push: {
                _id: '$_id',
                name: '$name',
                // lastAccessedAt: '$lastAccessedAt',
              },
            },
          },
        },
      ])
      .exec()
  }

  async findOne(organization: OrganizationDocument, userId: string) {
    const member = organization.members.find(
      (member) => member.userId === userId,
    )
    if (!member) throw new Error('member not found')

    member.lastAccessedAt = new Date()
    await organization.save()

    const { members, ...restOrganization } = organization.toObject()
    return restOrganization
  }

  update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    return `This action updates a #${id} organization`
  }

  remove(id: number) {
    return `This action removes a #${id} organization`
  }
}
