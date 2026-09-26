import { useEffect, useState } from 'react'
import { getCategories, type Category } from '@/api'

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isMounted = true

    getCategories()
      .then((data) => {
        if (isMounted) setCategories(data)
      })
      .catch((reason: unknown) => {
        if (isMounted) {
          setError(
            reason instanceof Error ? reason.message : 'No se pudieron cargar las categorías.',
          )
        }
      })
      .finally(() => {
        if (isMounted) setIsLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  return { categories, isLoading, error, setCategories }
}
