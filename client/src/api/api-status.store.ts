const wakingRequests = new Set<symbol>()
const listeners = new Set<() => void>()

const notify = () => listeners.forEach((listener) => listener())

export const markApiAsWaking = (requestId: symbol) => {
  const wasWaking = wakingRequests.size > 0
  wakingRequests.add(requestId)

  if (!wasWaking) notify()
}

export const markApiRequestAsFinished = (requestId: symbol) => {
  const wasWaking = wakingRequests.size > 0
  wakingRequests.delete(requestId)

  if (wasWaking && wakingRequests.size === 0) notify()
}

export const subscribeToApiStatus = (listener: () => void) => {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const getApiWakingSnapshot = () => wakingRequests.size > 0
