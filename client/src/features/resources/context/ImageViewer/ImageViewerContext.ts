import type { ImageViewerState } from '@Resources/types/ImageViewerValues'

import { createContext } from 'react'

export const ImageViewerContext = createContext<ImageViewerState | null>(null)
