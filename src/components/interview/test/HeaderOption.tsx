'use client'

import { useDropDown } from '@/hooks'
import { DropDown } from '@/components/common'
import { Switch } from '@/components/ui/switch'

export default function HeaderOption() {
  const {
    initialValue,
    selectedDropDownContent,
    isDropDownOpen,
    setIsDropDownOpen,
    selectedDropDownHandler,
    dropDownOpenHandler,
  } = useDropDown({ initialValue: 'Gemini 2.5 flas' })
  return (
    <div className="flex flex-shrink-0 items-center gap-x-6">
      <div className="flex flex-shrink-0 items-center gap-x-2">
        <p className="kr-body-md">압박 면접</p>
        <Switch />
      </div>

      <DropDown
        selectedValue={selectedDropDownContent}
        defaultValue={initialValue}
        isDropDownOpen={isDropDownOpen}
        dropDownOpenHandler={dropDownOpenHandler}
      >
        <DropDown.DropBoxOptionItem onClick={() => {}}>우아 졸려</DropDown.DropBoxOptionItem>
      </DropDown>
    </div>
  )
}
