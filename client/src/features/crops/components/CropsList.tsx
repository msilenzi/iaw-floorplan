import type { CropWithUrl } from '@Common/api'

import { useState } from 'react'

import { SimpleGrid } from '@mantine/core'

import { CardCrop } from './CardCrop'
import { ViewCropModal } from './CropModal/ViewCropModal'

type CropsListProps = {
  crops: CropWithUrl[]
}

export function CropsList({ crops }: CropsListProps) {
  const [selectedCrop, setSelectedCrop] = useState<CropWithUrl | undefined>(
    undefined,
  )

  return (
    <>
      <SimpleGrid type="container" cols={{ base: 1, '450px': 2, '680px': 3 }}>
        {crops.map((crop) => (
          <CardCrop
            key={crop._id}
            crop={crop}
            cardProps={{ onClick: () => setSelectedCrop(crop) }}
          />
        ))}
      </SimpleGrid>
      <ViewCropModal
        isOpen={selectedCrop != undefined}
        onClose={() => setSelectedCrop(undefined)}
        crop={selectedCrop}
        setSelectedCrop={setSelectedCrop}
      />
    </>
  )
}
