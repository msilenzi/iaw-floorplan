import type { Crop } from 'react-image-crop'

import { useState } from 'react'

import { ReactCrop } from 'react-image-crop'

import { Flex, Image, Loader } from '@mantine/core'

import { useCurrentProject } from '@Project/context/CurrentProject'
import { useCurrentResource } from '@ProjectResources/context/CurrentResource/useCurrentResource'
import { useProjectResourceQuery } from '@ProjectResources/hooks/useProjectResourceQuery'

export function ViewResource() {
  const { projectId } = useCurrentProject()
  const { resourceId } = useCurrentResource()
  const { isLoading, data } = useProjectResourceQuery(projectId, resourceId)

  const [crop, setCrop] = useState<Crop>()

  if (isLoading || !data) {
    return (
      <Flex align="center" justify="center" h="100%">
        <Loader size={'6rem'} color="dark.5" />
      </Flex>
    )
  }

  return (
    <ReactCrop crop={crop} onChange={setCrop} minHeight={50} minWidth={50}>
      <Image h="100%" src={data.url} />
    </ReactCrop>
  )
}
