import { useSyncExternalStore } from 'react'
import { getApiWakingSnapshot, subscribeToApiStatus } from './api-status.store'

export const useApiStatus = () => {
  const isWakingUp = useSyncExternalStore(
    subscribeToApiStatus,
    getApiWakingSnapshot,
    getApiWakingSnapshot,
  )

  return { isWakingUp }
}
