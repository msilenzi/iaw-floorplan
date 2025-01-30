import type { PercentCrop, ReactCrop } from 'react-image-crop'

import { useCallback, useRef, useState } from 'react'

import { ImageViewerContext } from './ImageViewerContext'

type ImageViewerProviderProps = {
  children: React.ReactNode
}

export function ImageViewerProvider({ children }: ImageViewerProviderProps) {
  const [crop, setCrop] = useState<PercentCrop>()
  const [scale, setScale] = useState(1)

  const imageRef = useRef<HTMLImageElement>(null)

  const zoomIn = useCallback(() => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 5))
  }, [])

  const zoomOut = useCallback(() => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.1))
  }, [])

  const zoomReset = useCallback(() => {
    setScale(1)
  }, [])

  const onCropChange: React.ComponentProps<typeof ReactCrop>['onChange'] =
    useCallback((_, percentCrop) => {
      setCrop(percentCrop)
    }, [])

  return (
    <ImageViewerContext.Provider
      value={{
        crop,
        scale,
        zoomIn,
        zoomOut,
        zoomReset,
        onCropChange,
        imageRef,
      }}
    >
      {children}
    </ImageViewerContext.Provider>
  )
}
