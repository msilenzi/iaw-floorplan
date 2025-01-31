import { useContext } from 'react'

import { ImageViewerContext } from './ImageViewerContext'

export function useImageViewer() {
  const context = useContext(ImageViewerContext)

  if (!context) {
    throw new Error('useImageViewer must be used within ImageViewerProvider')
  }

  return context
}
