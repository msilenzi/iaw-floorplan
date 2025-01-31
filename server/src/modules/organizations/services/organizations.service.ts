import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { BasicOrganizationDto } from '../dtos/basic-organization.dto'
import { CreateOrganizationDto } from '../dtos/create-organization.dto'
import { OrganizationDto } from '../dtos/organization.dto'
import { UpdateOrganizationDto } from '../dtos/update-organization.dto'
import { Member } from '../schemas/member.schema'
import {
  Organization,
  OrganizationDocument,
} from '../schemas/organization.schema'
import { MemberStatus } from '../types/member-status.enum'

@Injectable()
export class OrganizationsService {
  constructor(
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

  async findAll(userId: string): Promise<BasicOrganizationDto[]> {
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

  async findOne(
    organization: OrganizationDocument,
    member: Member,
  ): Promise<OrganizationDto> {
    member.lastAccessedAt = new Date()
    await organization.save()

    return {
      ...this._stripMembers(organization),
      userStatus: member.status,
    }
  }

  async update(organization: OrganizationDocument, dto: UpdateOrganizationDto) {
    Object.assign(organization, dto)
    await organization.save()
    return this._stripMembers(organization)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} organization`
  // }

  async _getOrganization(
    organizationId: Types.ObjectId,
  ): Promise<OrganizationDocument> {
    const organization = await this.organizationModel
      .findById(organizationId)
      .exec()
    if (!organization) throw new NotFoundException('La organización no existe')
    return organization
  }

  private _stripMembers(organization: OrganizationDocument) {
    const organizationsObj = organization.toObject()
    delete (organizationsObj as any).members
    return organizationsObj as Omit<Organization, 'members'>
  }
}
