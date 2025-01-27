import type { TablerIcon } from '@tabler/icons-react'

import {
  IconFile,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
} from '@tabler/icons-react'

export function getResourceIcon(mimetype: string): TablerIcon {
  switch (mimetype) {
    case 'image/jpeg':
      return IconFileTypeJpg
    case 'image/png':
      return IconFileTypePng
    case 'application/pdf':
      return IconFileTypePdf
    default:
      return IconFile
  }
}
