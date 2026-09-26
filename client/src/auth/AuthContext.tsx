import { useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { AuthContext } from './auth.context'
import { firebaseAuth, isFirebaseConfigured } from './firebase'
import type { AuthContextValue } from './auth.context'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!firebaseAuth) return

    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser)
      setIsLoading(false)
    })
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isConfigured: isFirebaseConfigured,
      isLoading,
      signInWithGoogle: async () => {
        if (!firebaseAuth) throw new Error('Firebase no está configurado.')
        await signInWithRedirect(firebaseAuth, new GoogleAuthProvider())
      },
      signOut: async () => {
        if (firebaseAuth) await firebaseSignOut(firebaseAuth)
      },
    }),
    [isLoading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
