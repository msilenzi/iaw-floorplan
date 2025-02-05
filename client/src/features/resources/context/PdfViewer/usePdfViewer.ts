import { useContext } from 'react'

import { PdfViewerContext } from './PdfViewerContext'

export function usePdfViewer() {
  const context = useContext(PdfViewerContext)

  if (!context) {
    throw new Error('usePdfViewer must be used within PdfViewerProvider')
  }

  return context
}

export function useOptionalPdfViewer() {
  return useContext(PdfViewerContext)
}
