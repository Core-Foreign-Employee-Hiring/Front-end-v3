import { ReactNode } from 'react'
import { DropDownGray3Icon, DropDownGray4Icon } from '@/assets/svgComponents'
import { twMerge } from 'tailwind-merge'

interface DropDownProps {
  isDropDownOpen: boolean
  dropDownOpenHandler: () => void
  children: ReactNode
  defaultValue: string
  selectedValue: string | undefined
  className?: string
}

export default function DropDown({
  children,
  isDropDownOpen,
  dropDownOpenHandler,
  defaultValue,
  selectedValue,
  className,
}: DropDownProps) {
  return (
    <div className={twMerge('relative w-full', className)}>
      <SelectedDropBoxContentBox
        dropDownHandler={dropDownOpenHandler}
        isDropDownOpen={isDropDownOpen}
        selectedValue={selectedValue}
        defaultValue={defaultValue}
      />
      {isDropDownOpen ? <DropBoxOptionBox>{children}</DropBoxOptionBox> : null}
    </div>
  )
}
function SelectedDropBoxContentBox({
  defaultValue,
  selectedValue,
  dropDownHandler,
  isDropDownOpen,
}: {
  defaultValue: string
  selectedValue: string | undefined
  dropDownHandler: () => void
  isDropDownOpen: boolean
}) {
  return (
    <div
      onClick={dropDownHandler}
      className={`${!selectedValue ? 'text-gray4' : 'text-black'} kr-body-md border-gray2 flex h-[52px] items-center justify-between rounded-[12px] border bg-white px-4 py-3`}
    >
      {!selectedValue ? <p>{defaultValue}</p> : <p>{selectedValue}</p>}
      {!isDropDownOpen ? <DropDownGray4Icon width={20} height={20} /> : <DropDownGray3Icon width={20} height={20} />}
    </div>
  )
}

function DropBoxOptionBox({ children }: { children: ReactNode }) {
  return (
    <div className="border-gray2 absolute top-17 z-30 max-h-[400px] w-full overflow-y-scroll rounded-[12px] border bg-white p-2 drop-shadow-md">
      {children}
    </div>
  )
}
function DropBoxOptionItem({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div onClick={onClick} className="hover:bg-gray1 kr-button text-gray4 w-full px-2 py-[18px]">
      {children}
    </div>
  )
}

DropDown.DropBoxOptionBox = DropBoxOptionBox
DropDown.DropBoxOptionItem = DropBoxOptionItem
