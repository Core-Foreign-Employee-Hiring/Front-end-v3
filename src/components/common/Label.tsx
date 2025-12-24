import { ReactNode } from 'react'

interface LabelProps {
  className?: string
  isRequired?: boolean
  rightElement?: ReactNode
  label: string
}
export default function Label({ className = 'kr-title-md', rightElement, isRequired, label }: LabelProps) {
  return (
    <div className="flex justify-between">
      <div className={`${className} flex gap-x-1`}>
        <h1>{label}</h1>
        {isRequired && <p className="text-main-500">*</p>}
      </div>

      {rightElement && rightElement}
    </div>
  )
}
