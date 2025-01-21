import { createContext } from 'react'

import type { ApiContextType } from '../types'

export const ApiContext = createContext<ApiContextType | null>(null)
