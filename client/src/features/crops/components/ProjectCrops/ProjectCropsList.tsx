import type { CropWithUrl } from '@Common/api'

import { useState } from 'react'

import { SimpleGrid } from '@mantine/core'

import { CurrentResourceProvider } from '@Resources/context/CurrentResource/CurrentResourceProvider'

import { CardCrop } from '../CardCrop'
import { ViewCropModal } from '../CropModal/ViewCropModal'

type ProjectCropsListProps = {
  crops: CropWithUrl[] | undefined
  isLoading: boolean
}

export function ProjectCropsList({ crops, isLoading }: ProjectCropsListProps) {
  const [selectedCrop, setSelectedCrop] = useState<CropWithUrl | undefined>(
    undefined,
  )

  return (
    <>
      <SimpleGrid type="container" cols={{ base: 1, '450px': 2, '680px': 3 }}>
        {isLoading || !crops
          ? Array.from({ length: 9 }).map((_, i) => (
              <CardCrop.Loading key={i} />
            ))
          : crops.map((crop) => (
              <CardCrop
                key={crop._id}
                crop={crop}
                cardProps={{ onClick: () => setSelectedCrop(crop) }}
              />
            ))}
      </SimpleGrid>

      <CurrentResourceProvider resourceId={selectedCrop?.resourceId ?? ''}>
        <ViewCropModal
          isOpen={selectedCrop != undefined}
          onClose={() => setSelectedCrop(undefined)}
          crop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
        />
      </CurrentResourceProvider>
    </>
  )
}
