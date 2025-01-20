import { createContext } from 'react'

import { ApiContextType } from '../types'

export const ApiContext = createContext<ApiContextType | null>(null)
