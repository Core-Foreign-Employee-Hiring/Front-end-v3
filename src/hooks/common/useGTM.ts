// hooks/useGTM.ts
import { useCallback } from 'react'

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[]
  }
}

export function useGTM() {
  const pushEvent = useCallback((event: string, payload?: Record<string, unknown>) => {
    window.dataLayer = window.dataLayer ?? []
    window.dataLayer.push({ event, ...payload })
  }, [])

  return { pushEvent }
}
