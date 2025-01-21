import { ProjectType } from '@Common/api'

export function displayProjectType(type: ProjectType) {
  switch (type) {
    case ProjectType.Build:
      return 'construcción'
    case ProjectType.Demolish:
      return 'demolición'
    case ProjectType.DemolishAndBuild:
      return 'demolición y construcción'
    case ProjectType.Document:
      return 'documentación'
    case ProjectType.Expand:
      return 'ampliación'
    case ProjectType.Remodel:
      return 'remodelación'
    default:
      throw new Error('Invalid type')
  }
}
