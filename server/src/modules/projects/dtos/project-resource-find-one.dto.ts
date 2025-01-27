import { ProjectResourcesFindAllDto } from './project-resources-find-all.dto'

export class ProjectResourceFindOneDto extends ProjectResourcesFindAllDto {
  readonly url: string
}
