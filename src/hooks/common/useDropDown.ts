'use client'

import { useCallback, useState } from 'react'

export default function useDropDown({ initialValue, defaultValue }: { initialValue: string; defaultValue?: string }) {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const [selectedDropDownContent, setSelectedDropDown] = useState<string | undefined>(defaultValue)

  const selectedDropDownHandler = useCallback((content: string) => {
    setSelectedDropDown(content)
  }, [])

  const dropDownOpenHandler = useCallback(() => {
    setIsDropDownOpen(!isDropDownOpen)
  }, [isDropDownOpen])

  return {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  }
}
