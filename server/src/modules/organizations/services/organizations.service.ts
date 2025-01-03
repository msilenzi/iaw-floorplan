import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { BasicOrganizationDto } from '../dtos/basic-organization.dto'
import { CreateOrganizationDto } from '../dtos/create-organization.dto'
import { UpdateOrganizationDto } from '../dtos/update-organization.dto'
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema'
import { MemberStatus } from '../types/member-status.enum'
import { OrganizationMembersService } from './organization-members.service'

@Injectable()
export class OrganizationsService {
  constructor(
    private readonly organizationMembersService: OrganizationMembersService,
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
  ) {}

  async create(
    dto: CreateOrganizationDto,
    userId: string,
  ): Promise<BasicOrganizationDto> {
    const organization = new this.organizationModel({
      ...dto,
      members: [{ userId, status: MemberStatus.OWNER, lastAccessedAt: null }],
    })

    await organization.save()

    return {
      _id: organization._id.toString(),
      name: organization.name,
      lastAccessedAt: null,
      status: MemberStatus.OWNER,
    }
  }

  async findAll(userId: string) {
    return this.organizationModel
      .aggregate([
        { $match: { 'members.userId': userId } },
        { $unwind: '$members' },
        { $match: { 'members.userId': userId } },
        {
          $project: {
            _id: 1,
            name: 1,
            status: '$members.status',
            lastAccessedAt: '$members.lastAccessedAt',
          },
        },
        { $sort: { lastAccessedAt: -1 } },
      ])
      .exec()
  }

  async findOne(organization: OrganizationDocument, userId: string) {
    const member = this.organizationMembersService._findMember(
      organization,
      userId,
    )

    member.lastAccessedAt = new Date()
    organization.save() // Guarda los cambios en segundo plano

    return this._stripMembers(organization)
  }

  update(organization: OrganizationDocument, dto: UpdateOrganizationDto) {
    Object.assign(organization, dto)
    organization.save() // Guarda los cambios en segundo plano
    return this._stripMembers(organization)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} organization`
  // }

  private _stripMembers(organization: OrganizationDocument) {
    const organizationsObj = organization.toObject()
    delete (organizationsObj as any).members
    return organizationsObj as Omit<Organization, 'members'>
  }
}
