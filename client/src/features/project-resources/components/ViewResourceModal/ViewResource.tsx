import type { Crop } from 'react-image-crop'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ReactCrop } from 'react-image-crop'

import { Box, Button, Flex, Loader, ScrollArea } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'

export function ViewResource() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useProjectResourceQuery(projectId, resourceId)
  const [crop, setCrop] = useState<Crop>()
  const [scale, setScale] = useState(1)
  const [previousScale, setPreviousScale] = useState(1)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (crop && scale !== previousScale) {
      const scaleRatio = scale / previousScale

      const newCrop: Crop = {
        unit: crop.unit,
        x: crop.x * scaleRatio,
        y: crop.y * scaleRatio,
        width: crop.width * scaleRatio,
        height: crop.height * scaleRatio,
      }

      setCrop(newCrop)
      setPreviousScale(scale)
    }
  }, [scale, previousScale, crop])

  const handleWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault()

      setScale((prevScale) => {
        const newValue = prevScale + (e.deltaY < 0 ? 0.1 : -0.1)
        return Math.min(Math.max(newValue, 0.1), 5)
      })
      return
    }

    //
    // Corregir un error con el scroll horizontal:
    // Sin esto no el scroll horizontal con shift + wheel no funciona cuando
    // se está en uno de los límites del scroll vertical

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
  }, [])

  if (isLoading || !data) {
    return (
      <Flex align="center" justify="center" h="100%">
        <Loader size="6rem" color="dark.5" />
      </Flex>
    )
  }

  return (
    <Box pos="relative" w="100%" h="100%">
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
          }}
        >
          <ReactCrop
            crop={crop}
            onChange={(c) => {
              setCrop(c)
              setPreviousScale(scale)
            }}
            minHeight={50}
            minWidth={50}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={data.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </ReactCrop>
        </Box>
      </ScrollArea>
      <ZoomButtons scale={scale} setScale={setScale} />
    </Box>
  )
}

type ZoomButtonsProps = {
  scale: number
  setScale: React.Dispatch<React.SetStateAction<number>>
}

export function ZoomButtons({ scale, setScale }: ZoomButtonsProps) {
  return (
    <Box pos="absolute" bottom={16} right={16}>
      <Button.Group>
        <Button
          variant="default"
          size="xs"
          onClick={() => {
            setScale((prevScale) => Math.max(prevScale - 0.1, 0.1))
          }}
        >
          <IconMinus height={16} width={16} stroke={2} />
        </Button>
        <Button
          variant="default"
          size="xs"
          onClick={() => setScale(1)}
          w={'10ch'}
        >
          {Math.floor(100 * scale)} %
        </Button>
        <Button
          variant="default"
          size="xs"
          onClick={() => {
            setScale((prevScale) => Math.min(prevScale + 0.1, 5))
          }}
        >
          <IconPlus height={16} width={16} stroke={2} />
        </Button>
      </Button.Group>
    </Box>
  )
}
