import { ResourcesFindAllDto } from './resources-find-all.dto'

export class ResourceFindOneDto extends ResourcesFindAllDto {
  readonly url: string
}
