import { Box, Flex, Loader } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'
import { ImageViewerProvider } from '@ProjectResources/context/ImageViewer'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'

import { AddCropButton } from './AddCropButton'
import { ImageViewer } from './ImageViewer'
import { ZoomButtons } from './ZoomButtons'

export function ViewResourceImage() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useProjectResourceQuery(projectId, resourceId)

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
        <AddCropButton />
        <ZoomButtons />
      </Box>
    </ImageViewerProvider>
  )
}
