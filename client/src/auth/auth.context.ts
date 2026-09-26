import { createContext } from 'react'
import type { User } from 'firebase/auth'

export type AuthContextValue = {
  user: User | null
  isConfigured: boolean
  isLoading: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
