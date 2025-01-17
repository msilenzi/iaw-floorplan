import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type SearchField = 'name' | 'email'

type OrganizationState = {
  organizationId?: string
  searchValue: string
  searchField: SearchField
}

type OrganizationActions = {
  setOrganizationId: (organizationId: string) => void
  setSearchValue: (searchValue: string) => void
  setSearchField: (searchField: SearchField) => void
  clear: () => void
  clearSearch: () => void
}

const initialState: OrganizationState = {
  organizationId: undefined,
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

    setSearchValue(searchValue) {
      set({ searchValue }, undefined, 'organization/setSearchValue')
    },

    setSearchField(searchField) {
      set({ searchField }, undefined, 'organization/setSearchField')
    },

    clear() {
      set(initialState, undefined, 'organization/clear')
    },

    clearSearch() {
      const { searchField, searchValue } = initialState
      set({ searchField, searchValue }, undefined, 'organization/clearSearch')
    },
  })),
)
