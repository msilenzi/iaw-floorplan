import type { CropWithUrl } from '@Common/api'

import { Button, Group, Stack, Text } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'

import { UserInfo } from '@Common/ui/UserInfo'
import { InfoItem } from '@Project/components/info/InfoItem'
import { displayCropSpecialty } from '@Crops/utils/displayCropSpecialty'

import { TagsList } from './TagsList'

type CropDataProps = {
  crop: CropWithUrl
}

export function CropData({ crop }: CropDataProps) {
  return (
    <Stack gap="lg">
      <InfoItem label="Nombre" data={crop.name} />
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
              badgeProps={{ color: 'dark.5', size: 'md' }}
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
          flex={1}
        >
          Editar
        </Button>
        <Button
          rightSection={<IconTrash size={16} stroke={2.5} />}
          color="red"
          flex={1}
        >
          Eliminar
        </Button>
      </Group>
    </Stack>
  )
}
