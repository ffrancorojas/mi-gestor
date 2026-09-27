import { useEffect, useMemo, useState } from 'react'
import {
  browserSessionPersistence,
  GoogleAuthProvider,
  onAuthStateChanged,
  setPersistence,
  signInWithPopup,
  signOut as firebaseSignOut,
  type User,
} from 'firebase/auth'
import { AuthContext } from './auth.context'
import { firebaseAuth, isFirebaseConfigured } from './firebase'
import type { AuthContextValue } from './auth.context'

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000
const ACTIVITY_EVENTS: (keyof WindowEventMap)[] = ['click', 'keydown', 'scroll', 'touchstart']

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(isFirebaseConfigured)

  useEffect(() => {
    if (!firebaseAuth) return

    const auth = firebaseAuth
    let isMounted = true
    let unsubscribe: () => void = () => undefined

    void setPersistence(auth, browserSessionPersistence).finally(() => {
      if (!isMounted) return

      unsubscribe = onAuthStateChanged(auth, (nextUser) => {
        setUser(nextUser)
        setIsLoading(false)
      })
    })

    return () => {
      isMounted = false
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!firebaseAuth || !user) return

    const auth = firebaseAuth
    let timeoutId: number

    const signOutAfterInactivity = () => {
      void firebaseSignOut(auth).finally(() => setUser(null))
    }

    const resetInactivityTimeout = () => {
      window.clearTimeout(timeoutId)
      timeoutId = window.setTimeout(signOutAfterInactivity, INACTIVITY_TIMEOUT_MS)
    }

    ACTIVITY_EVENTS.forEach((eventName) => {
      window.addEventListener(eventName, resetInactivityTimeout, { passive: true })
    })
    resetInactivityTimeout()

    return () => {
      window.clearTimeout(timeoutId)
      ACTIVITY_EVENTS.forEach((eventName) => {
        window.removeEventListener(eventName, resetInactivityTimeout)
      })
    }
  }, [user])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isConfigured: isFirebaseConfigured,
      isLoading,
      signInWithGoogle: async () => {
        if (!firebaseAuth) throw new Error('Firebase no está configurado.')
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        await setPersistence(firebaseAuth, browserSessionPersistence)
        await signInWithPopup(firebaseAuth, provider)
      },
      signOut: async () => {
        if (!firebaseAuth) return
        await firebaseSignOut(firebaseAuth)
        setUser(null)
      },
    }),
    [isLoading, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
