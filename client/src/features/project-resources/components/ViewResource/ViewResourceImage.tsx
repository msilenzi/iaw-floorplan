import type { PixelCrop } from 'react-image-crop'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ReactCrop } from 'react-image-crop'

import {
  Box,
  Button,
  Flex,
  Grid,
  Loader,
  Modal,
  ScrollArea,
  Tooltip,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconMinus, IconPlus, IconScissors } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'
import { canvasPreview } from '@ProjectResources/utils/canvasPreview'

export function ViewResourceImage() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useProjectResourceQuery(projectId, resourceId)

  const [crop, setCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [previousScale, setPreviousScale] = useState(1)

  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (crop && scale !== previousScale) {
      const scaleRatio = scale / previousScale

      const newCrop: PixelCrop = {
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
            minHeight={20 * scale}
            minWidth={20 * scale}
            style={{ width: '100%', height: '100%' }}
          >
            <img
              src={data.url}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
              ref={imageRef}
            />
          </ReactCrop>
        </Box>
      </ScrollArea>
      <AddCropButton crop={crop} image={imageRef.current} />
      <ZoomButtons scale={scale} setScale={setScale} />
    </Box>
  )
}

type ZoomButtonsProps = {
  scale: number
  setScale: React.Dispatch<React.SetStateAction<number>>
}

function ZoomButtons({ scale, setScale }: ZoomButtonsProps) {
  return (
    <Box pos="absolute" bottom={20} right={20}>
      <Button.Group w={160}>
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
          flex={1}
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

type AddCropButtonProps = {
  image: HTMLImageElement | null
  crop: PixelCrop | undefined
}

function AddCropButton({ crop, image }: AddCropButtonProps) {
  const [isOpen, { open, close }] = useDisclosure(false)

  const btnDisabled = !crop || crop.height === 0 || crop.width === 0

  return (
    <>
      <Tooltip
        label="Selecciona un área del recurso para crear un recorte"
        color="dark.5"
        withArrow
        disabled={!btnDisabled}
      >
        <PrimaryButton
          pos="absolute"
          bottom={56}
          right={20}
          w={160}
          rightSection={<IconScissors height={16} width={16} stroke={2} />}
          onClick={open}
          disabled={btnDisabled}
        >
          Crear recorte
        </PrimaryButton>
      </Tooltip>

      <AddCropModal isOpen={isOpen} onClose={close} crop={crop} image={image} />
    </>
  )
}

type AddCropModalProps = {
  isOpen: boolean
  onClose: () => void
  image: HTMLImageElement | null
  crop: PixelCrop | undefined
}

function AddCropModal({ isOpen, onClose, image, crop }: AddCropModalProps) {
  const theme = useMantineTheme()
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (isOpen && image && crop && canvas) {
      canvasPreview(image, canvas, crop, 1, 0)
    }
  }, [canvas, crop, image, isOpen])

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Crear recorte"
      styles={{ title: { fontWeight: 700 } }}
      size="xl"
    >
      <Grid>
        <Grid.Col span={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
          nemo, perspiciatis obcaecati porro ea consequuntur, error recusandae
          ducimus commodi at repudiandae, quia omnis officiis id earum sed.
          Doloribus, nisi mollitia.
        </Grid.Col>
        <Grid.Col span={6}>
          <canvas
            ref={setCanvas}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              borderRadius: theme.radius.sm,
            }}
          />
        </Grid.Col>
      </Grid>
    </Modal>
  )
}
