import { Menu, MenuProps } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import { IconBuildingPlus, IconBuildings, IconPlus } from '@tabler/icons-react'

import { PrimaryButton } from '@Common/ui/PrimaryButton'

import { MyOrganizationsModalCreate } from './MyOrganizationsModalCreate'
import { MyOrganizationsModalJoin } from './MyOrganizationsModalJoin'

type MyOrganizationsAddBtnProps = {
  position?: MenuProps['position']
}

export function MyOrganizationsAddBtn({
  position,
}: MyOrganizationsAddBtnProps) {
  const [isCreateModalOpen, { open: openCreate, close: closeCreate }] =
    useDisclosure(false)

  const [isJoinModalOpen, { open: openJoin, close: closeJoin }] =
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

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconBuildingPlus size={14} stroke={2.5} />}
            onClick={openCreate}
          >
            Crear organización
          </Menu.Item>
          <Menu.Item
            leftSection={<IconBuildings size={14} stroke={2.5} />}
            onClick={openJoin}
          >
            Unirse a una organización
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
      <MyOrganizationsModalCreate
        isOpen={isCreateModalOpen}
        onClose={closeCreate}
      />
      <MyOrganizationsModalJoin isOpen={isJoinModalOpen} onClose={closeJoin} />
    </>
  )
}
