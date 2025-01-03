import { Menu, MenuProps } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconBuildingPlus, IconBuildings, IconPlus } from '@tabler/icons-react'

import PrimaryButton from '@Common/ui/PrimaryButton'

import OrganizationsModalCreate from './OrganizationsModalCreate'

type OrganizationsAddBtnProps = {
  position?: MenuProps['position']
}

export default function OrganizationsAddBtn({
  position,
}: OrganizationsAddBtnProps) {
  const [isCreateModalOpen, { open: openCreate, close: closeCreate }] =
    useDisclosure(false)

  return (
    <>
      <Menu position={position} shadow="md">
        <Menu.Target>
          <PrimaryButton
            rightSection={<IconPlus size={16} stroke={3} />}
            size="sm"
          >
            Agregar
          </PrimaryButton>
        </Menu.Target>

        <Menu.Dropdown onClick={openCreate}>
          <Menu.Item leftSection={<IconBuildingPlus size={14} stroke={2.5} />}>
            Crear organización
          </Menu.Item>
          <Menu.Item leftSection={<IconBuildings size={14} stroke={2.5} />}>
            Unirse a una organización
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <OrganizationsModalCreate
        isOpen={isCreateModalOpen}
        onClose={closeCreate}
      />
    </>
  )
}
