import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { MemberStatus } from '@Common/api/generated'

type SearchField = 'name' | 'email'

type OrganizationState = {
  organizationId: string | null
  userStatus: MemberStatus | null
  searchValue: string
  searchField: SearchField
}

type OrganizationActions = {
  setOrganizationId: (organizationId: string) => void
  setUserStatus: (userStatus: MemberStatus) => void
  setSearchValue: (searchValue: string) => void
  setSearchField: (searchField: SearchField) => void
  reset: () => void
}

const initialState: OrganizationState = {
  organizationId: null,
  userStatus: null,
  searchValue: '',
  searchField: 'name',
}

type OrganizationStore = OrganizationState & OrganizationActions

export const useOrganizationStore = create<OrganizationStore>()(
  devtools((set) => ({
    ...initialState,

    setOrganizationId(organizationId) {
      set({ organizationId }, undefined, 'organization/setOrganizationId')
    },

    setUserStatus(userStatus) {
      set({ userStatus }, undefined, 'organization/setUserStatus')
    },

    setSearchValue(searchValue) {
      set({ searchValue }, undefined, 'organization/setSearchValue')
    },

    setSearchField(searchField) {
      set({ searchField }, undefined, 'organization/setSearchField')
    },

    reset() {
      set(initialState, undefined, 'organization/reset')
    },
  })),
)
