import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps {
  type?: 'titleLg' | 'titleMd' | 'titleSm' | 'subtitleLg' | 'subtitleMd' | 'subtitleSm' | 'inputLabel' | 'button'
  className?: string
  isRequired?: boolean
  isOption?: boolean
  rightElement?: ReactNode
  label: string
  labelColor?: string // text-[]
}
const labelType = {
  titleLg: 'kr-title-lg text-black',
  titleMd: 'kr-title-md text-black',
  titleSm: 'kr-title-sm text-gray5',
  subtitleLg: 'kr-subtitle-lg text-black',
  subtitleMd: 'kr-subtitle-md text-black',
  subtitleSm: 'kr-subtitle-sm text-black',
  inputLabel: 'kr-title-sm text-gray5',
  button: 'kr-button text-gray5',
}

export default function Label({
  className = 'kr-title-md',
  rightElement,
  isRequired,
  label,
  type = 'inputLabel',
  labelColor,
  isOption = false,
}: LabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${className} flex gap-x-1`}>
        <h1 className={twMerge(labelType[type], labelColor)}>{label}</h1>
        {isRequired && <p className="text-main-500">*</p>}
        {isOption && <p className="kr-title-sm text-gray4">(선택)</p>}
      </div>

      {rightElement && rightElement}
    </div>
  )
}
