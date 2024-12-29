import { Controller } from '@nestjs/common'

import { Protected } from 'src/modules/auth/decorators/protected.decorator'

@Protected()
@Controller('organizations/:organizationId/members')
export class OrganizationMembersController {}
