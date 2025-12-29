'use client'

import { useCallback, useState } from 'react'

/**
 * @param initialValue 초기 불리언 값 (기본값: false)
 */
export default function useToggle(initialValue: boolean = false) {
  const [state, setState] = useState(initialValue)

  const toggle = useCallback(() => {
    setState((prev) => !prev)
  }, [])

  return [state, toggle, setState] as const
}
