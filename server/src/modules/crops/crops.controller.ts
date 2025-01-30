import { Controller } from '@nestjs/common'

import { CropsService } from './crops.service'

@Controller('crops')
export class CropsController {
  constructor(private readonly cropsService: CropsService) {}
}
