import {
  ScrollArea,
  Spoiler,
  Stack,
  Title,
  useMantineTheme,
} from '@mantine/core'

import { UserInfo } from '@Common/ui/UserInfo'
import { useCurrentProject } from '@Project/context/CurrentProject'
import { useProjectQuery } from '@Project/hooks/useProjectQuery'
import { displayProjectPurpose } from '@Project/utils/displayProjectPurpose'
import { displayProjectStatus } from '@Project/utils/displayProjectStatus'
import { displayProjectType } from '@Project/utils/displayProjectType'

import { InfoItem } from './InfoItem'

export function InfoGeneralInformation() {
  const theme = useMantineTheme()

  const { projectId } = useCurrentProject()
  const { data } = useProjectQuery(projectId)

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
      <InfoItem
        label="Creado por"
        data={data ? <UserInfo user={data.createdBy} /> : null}
      />
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
