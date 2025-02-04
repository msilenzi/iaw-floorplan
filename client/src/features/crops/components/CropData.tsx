import type { CropWithUrl } from '@Common/api'

import { Button, Group, Stack, Text } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'

import { useCountdownTimer } from '@Common/hooks/useCountdownTimer'
import { useNotifications } from '@Common/hooks/useNotifications'
import { Popconfirm } from '@Common/ui/Popconfirm'
import { UserInfo } from '@Common/ui/UserInfo'
import { getErrorResponse } from '@Common/utils/errorHandling'
import { InfoItem } from '@Project/components/info/InfoItem'
import { useDeleteCropMutation } from '@Crops/hooks/useDeleteCropMutation'
import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

import { TagsList } from './TagsList'

type CropDataProps = {
  crop: CropWithUrl
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedCrop: React.Dispatch<React.SetStateAction<CropWithUrl | undefined>>
}

export function CropData({
  crop,
  setIsEditing,
  setSelectedCrop,
}: CropDataProps) {
  return (
    <Stack gap="lg">
      <InfoItem label="Nombre" data={crop.name} dataProps={{ fw: 700 }} />
      <InfoItem
        label="Especialidad"
        data={displayCropSpecialty(crop.specialty)}
        dataProps={{ tt: 'capitalize' }}
      />
      <InfoItem label="Escala" data={crop.scale} />
      <InfoItem
        label="Etiquetas"
        data={
          crop.tags.length === 0 ? (
            <Text fs="italic" c="dimmed">
              No hay etiquetas
            </Text>
          ) : (
            <TagsList
              tags={crop.tags}
              innerProps={{ badge: { color: 'dark.5', size: 'md' } }}
            />
          )
        }
      />
      <InfoItem
        label="Creado por"
        data={
          <UserInfo
            user={crop.createdBy}
            innerProps={{ avatar: { size: 'md' } }}
          />
        }
      />
      <InfoItem
        label="Fecha de creación"
        data={new Date(crop.createdAt).toLocaleString('es-AR', {
          dateStyle: 'long',
        })}
      />
      <Group>
        <Button
          rightSection={<IconPencil size={16} stroke={2.5} />}
          color="dark.5"
          onClick={() => setIsEditing(true)}
          flex={1}
        >
          Editar
        </Button>
        <DeleteButton crop={crop} setSelectedCrop={setSelectedCrop} />
      </Group>
    </Stack>
  )
}

type DeleteButtonProps = {
  crop: CropWithUrl
  setSelectedCrop: React.Dispatch<React.SetStateAction<CropWithUrl | undefined>>
}

function DeleteButton({ crop, setSelectedCrop }: DeleteButtonProps) {
  const { mutateAsync, isPending } = useDeleteCropMutation()

  const { counter, start, reset } = useCountdownTimer(3)
  const { showErrorNotification, showSuccessNotification } = useNotifications()

  async function handleExit() {
    try {
      await mutateAsync(crop._id)
      showSuccessNotification({
        title: 'Recorte eliminado',
        message: 'El recorte ha sido eliminado correctamente',
      })
      setSelectedCrop(undefined)
    } catch (error) {
      const errorResponse = getErrorResponse(error, {
        title: 'No pudimos eliminar el recorte',
      })
      showErrorNotification(errorResponse)
    }
  }

  return (
    <Popconfirm
      title="¿Seguro que desea eliminar el recurso?"
      description="Esta acción no se puede deshacer"
      confirmText={counter !== 0 ? `Confirmar (${counter})` : 'Confirmar'}
      innerProps={{
        confirmBtn: {
          color: 'red',
          onClick: () => void handleExit(),
          loading: isPending,
          disabled: counter !== 0,
        },
        popover: { onClose: reset, position: 'top' },
      }}
    >
      <Button
        rightSection={<IconTrash size={16} stroke={2.5} />}
        color="red"
        loading={isPending}
        onClick={start}
      >
        Eliminar
      </Button>
    </Popconfirm>
  )
}
