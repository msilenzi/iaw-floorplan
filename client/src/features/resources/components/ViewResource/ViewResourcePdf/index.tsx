import { useEffect, useState } from 'react'

import { Box, Flex, Loader, Text } from '@mantine/core'

import { ImageViewerProvider } from '@Resources/context/ImageViewer'
import { useResourceQuery } from '@Resources/hooks/useResourceQuery'
import { Pdf } from '@Resources/utils/Pdf'

import { AddCropButton } from '../ViewResourceImage/AddCropButton'
import { ImageViewer } from '../ViewResourceImage/ImageViewer'
import { ToggleShowCropsButton } from '../ViewResourceImage/ToggleShowCropsButton'
import { ZoomButtons } from '../ViewResourceImage/ZoomButtons'

export function ViewResourcePdf() {
  const { isLoading, data } = useResourceQuery()
  const [pdf, setPdf] = useState<Pdf | null>(null)
  const [pageUrl, setPageUrl] = useState<string | null>(null)

  useEffect(() => {
    async function initializePdf() {
      if (!data) return
      const newPdf = await Pdf.createPdfFromUrl(data.url)
      setPdf(newPdf)

      const newPageUrl = await newPdf.convertPageToPng(1)
      setPageUrl(newPageUrl)
    }

    void initializePdf()

    return () => {
      if (pdf) void pdf.destroy()
    }
  }, [data, pdf])

  useEffect(() => {
    async function loadPage() {
      const newPageUrl = (await pdf?.convertPageToPng(1)) ?? null
      setPageUrl(newPageUrl)
    }
    void loadPage()
  }, [pdf])

  if (isLoading || !data) {
    return <Loading description="Descargando información... (1/3)" />
  }

  if (!pdf) {
    return <Loading description="Cargando PDF... (2/3)" />
  }

  if (pageUrl == null) {
    return <Loading description="Creando página... (3/3)" />
  }

  return (
    <ImageViewerProvider>
      <Box pos="relative" w="100%" h="100%">
        <ImageViewer imageUrl={pageUrl} />
        <ToggleShowCropsButton />
        <AddCropButton />
        <ZoomButtons />
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
