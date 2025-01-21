import type { ApiContextType } from '../types'

import { createContext } from 'react'

export const ApiContext = createContext<ApiContextType | null>(null)
