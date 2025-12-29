'use client'

import { useState } from 'react'
import { EyeIcon, NonEyeIcon } from '@/assets/svgComponents'

export default function usePasswordVisible({ initialValue = false }: { initialValue?: boolean } = {}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(initialValue)
  const toggleVisibility = () => setIsPasswordVisible((prev) => !prev)

  const inputType: 'text' | 'password' = isPasswordVisible ? 'text' : 'password'
  const VisibilityIcon = isPasswordVisible ? NonEyeIcon : EyeIcon

  return { toggleVisibility: toggleVisibility, inputType: inputType, VisibilityIcon: VisibilityIcon }
}
