import { ReactNode } from 'react'

interface LabelProps {
  type?: 'h1' | 'h2' | 'h3' | 'inputLabel'
  className?: string
  isRequired?: boolean
  rightElement?: ReactNode
  label: string
}
const labelType = {
  h1: 'kr-title-lg text-black',
  h2: 'kr-title-md text-black',
  h3: 'kr-subtitle-lg text-black',
  inputLabel: 'kr-title-sm text-gray5',
}
export default function Label({
  className = 'kr-title-md',
  rightElement,
  isRequired,
  label,
  type = 'inputLabel',
}: LabelProps) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${labelType[type]} ${className} flex gap-x-1`}>
        <h1>{label}</h1>
        {isRequired && <p className="text-main-500">*</p>}
      </div>

      {rightElement && rightElement}
    </div>
  )
}
