import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface LabelProps {
  type?: 'titleLg' | 'titleMd' | 'subtitleLg' | 'inputLabel' | 'button'
  className?: string
  isRequired?: boolean
  rightElement?: ReactNode
  label: string
  labelColor?: string
}
const labelType = {
  titleLg: 'kr-title-lg text-black',
  titleMd: 'kr-title-md text-black',
  subtitleLg: 'kr-subtitle-lg text-black',
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
}: LabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${className} flex gap-x-1`}>
        <h1 className={twMerge(labelType[type], labelColor)}>{label}</h1>
        {isRequired && <p className="text-main-500">*</p>}
      </div>

      {rightElement && rightElement}
    </div>
  )
}
