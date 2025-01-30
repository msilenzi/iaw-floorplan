import type { ImageViewerState } from '@ProjectResources/types/ImageViewerValues'

import { createContext } from 'react'

export const ImageViewerContext = createContext<ImageViewerState | null>(null)
