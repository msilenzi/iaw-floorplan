import { Box, Flex, Loader } from '@mantine/core'

import { ImageViewerProvider } from '@Resources/context/ImageViewer'
import { useResourceQuery } from '@Resources/hooks/useResourceQuery'

import { AddCropButton } from './AddCropButton'
import { ImageViewer } from './ImageViewer'
import { ToggleShowCropsButton } from './ToggleShowCropsButton'
import { ZoomButtons } from './ZoomButtons'

export function ViewResourceImage() {
  const { isLoading, data } = useResourceQuery()

  if (isLoading || !data) {
    return (
      <Flex align="center" justify="center" h="100%">
        <Loader size="6rem" color="dark.5" />
      </Flex>
    )
  }

  return (
    <ImageViewerProvider>
      <Box pos="relative" w="100%" h="100%">
        <ImageViewer imageUrl={data.url} />
        <ToggleShowCropsButton />
        <AddCropButton />
        <ZoomButtons />
      </Box>
    </ImageViewerProvider>
  )
}
