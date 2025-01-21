import type { ProjectFindOneDto } from '@Common/api/generated'

import {
  Group,
  ScrollArea,
  Spoiler,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'

import { useProjectQuery } from '@/features/project/hooks/useProjectQuery'
import { displayProjectPurpose } from '@/features/project/utils/displayProjectPurpose'
import { displayProjectStatus } from '@/features/project/utils/displayProjectStatus'
import { displayProjectType } from '@/features/project/utils/displayProjectType'
import { UserAvatar } from '@Common/ui/UserAvatar'

import { useCurrentProject } from '../../context/CurrentProject'
import { InfoItem } from './_InfoItem'

export function InfoGeneralInformation() {
  const theme = useMantineTheme()

  const { organizationId, projectId } = useCurrentProject()
  const { data } = useProjectQuery(organizationId, projectId)

  return (
    <Stack gap="lg">
      <Title order={4}>Información general</Title>
      <InfoItem label="Expediente" data={data?.record} />
      <InfoItem label="Nombre" data={data?.name} />
      <InfoItem
        label="Tipo de obra"
        data={data?.type ? displayProjectType(data.type) : undefined}
        dataProps={{ tt: 'capitalize' }}
      />
      <InfoItem
        label="Destino"
        data={data?.purpose ? displayProjectPurpose(data.purpose) : undefined}
        dataProps={{ tt: 'capitalize' }}
      />
      <InfoItem label="Ubicación" data={data?.location} />
      <InfoItem
        label="Estado"
        data={data?.status ? displayProjectStatus(data.status) : undefined}
        dataProps={{ tt: 'capitalize' }}
      />
      <InfoItem
        label="Antecedentes"
        data={
          data?.background != null ? (
            <ScrollArea.Autosize mah={480} offsetScrollbars scrollbarSize={6}>
              <Spoiler
                maxHeight={120}
                showLabel="Ver más"
                hideLabel="Ocultar"
                styles={{
                  control: { color: theme.colors.dark[2] },
                  content: { whiteSpace: 'pre-line' },
                }}
              >
                {data.background}
              </Spoiler>
            </ScrollArea.Autosize>
          ) : undefined
        }
      />
      <InfoItem label="Creado por" data={<UserInfo data={data} />} />
      <InfoItem
        label="Fecha de creación"
        data={
          data?.createdAt != null
            ? new Date(data.createdAt).toLocaleString('es-AR', {
                dateStyle: 'long',
              })
            : undefined
        }
      />
    </Stack>
  )
}

function UserInfo({ data }: { data?: ProjectFindOneDto }) {
  if (!data) return undefined

  return (
    <Stack gap="xs">
      <Group gap="xs" align="center">
        <UserAvatar
          picture={data.createdBy.picture}
          username={data.createdBy.name}
          size="md"
        />
        <Stack gap="0">
          <Text style={{ lineHeight: 1.3 }}>{data.createdBy.name}</Text>
          <Text style={{ lineHeight: 1.3 }} c="dimmed" size="sm">
            {data.createdBy.email}
          </Text>
        </Stack>
      </Group>
    </Stack>
  )
}
