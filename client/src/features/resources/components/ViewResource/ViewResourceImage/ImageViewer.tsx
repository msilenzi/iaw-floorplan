import { useCallback, useRef } from 'react'

import { ReactCrop } from 'react-image-crop'

import { Box, ScrollArea } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@Resources/context/CurrentResource/useCurrentResource'
import { useImageViewer } from '@Resources/context/ImageViewer'
import { useResourceCropsQuery } from '@Crops/hooks/useResourceCropsQuery'

import { DrawCrop } from './DrawCrop'

type ImageViewerProps = {
  imageUrl: string
}

export function ImageViewer({ imageUrl }: ImageViewerProps) {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { data } = useResourceCropsQuery(projectId, resourceId)

  const { crop, scale, showCrops, imageRef, onCropChange, zoomIn, zoomOut } =
    useImageViewer()

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
        if (e.deltaY < 0) zoomIn()
        else zoomOut()
        return
      }

      //
      // Corregir error con el scroll horizontal:
      // Sin esto, el scroll horizontal con shift + wheel no funciona cuando
      // el scroll vertical está arriba o abajo del todo.

      const viewport = scrollAreaRef.current
      if (!viewport) return

      const { scrollHeight, clientHeight, scrollTop } = viewport

      const isAtVerticalLimit =
        (scrollTop === 0 && e.deltaY < 0) ||
        (scrollTop + clientHeight >= scrollHeight && e.deltaY > 0)

      if (isAtVerticalLimit && e.shiftKey) {
        e.preventDefault()
        viewport.scrollLeft += e.deltaY
      }
    },
    [zoomIn, zoomOut],
  )

  return (
    <ScrollArea
      w="100%"
      h="100%"
      scrollbarSize={16}
      onWheel={handleWheel}
      viewportRef={scrollAreaRef}
      styles={{
        thumb: {
          boxShadow: '0px 0px 4px 1px rgba(0, 0, 0, .5)',
          backdropFilter: 'blur(3px)',
        },
      }}
    >
      <Box
        style={{
          width: `${100 * scale}%`,
          height: `${100 * scale}%`,
          position: 'relative',
        }}
      >
        <ReactCrop
          crop={crop}
          onChange={onCropChange}
          style={{ width: '100%', height: '100%' }}
        >
          <img
            src={imageUrl}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            ref={imageRef}
            crossOrigin="anonymous"
          />
        </ReactCrop>
        {showCrops && data?.map((crop, i) => <DrawCrop key={i} crop={crop} />)}
      </Box>
    </ScrollArea>
  )
}
