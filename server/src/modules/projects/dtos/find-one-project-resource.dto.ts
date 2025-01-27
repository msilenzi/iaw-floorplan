import { FindAllProjectResourcesDto } from './find-all-project-resources.dto'

export class FindOneProjectResourceDto extends FindAllProjectResourcesDto {
  readonly url: string
}
