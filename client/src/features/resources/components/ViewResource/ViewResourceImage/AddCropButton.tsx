import { Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconScissors } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'
import { useImageViewer } from '@Resources/context/ImageViewer'
import { CreateCropModal } from '@Crops/components/CropModal/CreateCropModal'

export function AddCropButton() {
  const { crop } = useImageViewer()
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
      <CreateCropModal isOpen={isOpen} onClose={close} />
    </>
  )
}
