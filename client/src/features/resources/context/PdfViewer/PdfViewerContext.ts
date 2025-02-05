import type { PdfViewerState } from '@Resources/types/PdfViewerValues'

import { createContext } from 'react'

export const PdfViewerContext = createContext<PdfViewerState | null>(null)
