import { useEffect, useMemo, useState } from 'react'

import { Box, Flex, Loader, Text } from '@mantine/core'

import { ImageViewerProvider } from '@Resources/context/ImageViewer'
import { PdfViewerProvider, usePdfViewer } from '@Resources/context/PdfViewer'
import { useResourceQuery } from '@Resources/hooks/useResourceQuery'
import { useResourceCropsQuery } from '@Crops/hooks/useResourceCropsQuery'

import { AddCropButton } from '../ViewResourceImage/AddCropButton'
import { ImageViewer } from '../ViewResourceImage/ImageViewer'
import { ToggleShowCropsButton } from '../ViewResourceImage/ToggleShowCropsButton'
import { ZoomButtons } from '../ViewResourceImage/ZoomButtons'
import { PageButtons } from './PageButtons'

export function ViewResourcePdf() {
  return (
    <PdfViewerProvider>
      <Content />
    </PdfViewerProvider>
  )
}

function Content() {
  const { isLoading, data } = useResourceQuery()
  const { data: crops } = useResourceCropsQuery()

  const [converterIsInitialized, setConverterIsInitialized] = useState(false)

  const {
    currentPage,
    initializePdfConverter,
    clearPdfConverter,
    initialPage,
  } = usePdfViewer()

  useEffect(() => {
    void (async () => {
      if (!data) return
      await initializePdfConverter(data.url)
      setConverterIsInitialized(true)
    })()

    return () => void clearPdfConverter()
  }, [clearPdfConverter, data, initializePdfConverter])

  useEffect(() => {
    if (converterIsInitialized) void initialPage()
  }, [converterIsInitialized, initialPage])

  const pageCrops = useMemo(() => {
    return crops?.filter(({ pageNumber }) => pageNumber === currentPage?.number)
  }, [crops, currentPage?.number])

  if (isLoading || !data) {
    return <Loading description="Descargando información... (1/3)" />
  }

  if (!converterIsInitialized) {
    return <Loading description="Cargando PDF... (2/3)" />
  }

  if (currentPage == null) {
    return <Loading description="Creando página... (3/3)" />
  }

  return (
    <ImageViewerProvider>
      <Box pos="relative" w="100%" h="100%">
        <ImageViewer imageUrl={currentPage.url} crops={pageCrops ?? []} />
        <ToggleShowCropsButton />
        <AddCropButton />
        <ZoomButtons />
        <PageButtons />
      </Box>
    </ImageViewerProvider>
  )
}

function Loading({ description }: { description: string }) {
  return (
    <Flex align="center" justify="center" direction="column" h="100%" gap="md">
      <Loader size="6rem" color="dark.5" />
      <Text c="dimmed">{description}</Text>
    </Flex>
  )
}
