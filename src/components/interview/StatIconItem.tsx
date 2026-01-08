import { JSX } from 'react'

export default function StatIconItem({ label, Icon }: { label: string | null; Icon: JSX.Element }) {
  return (
    <div className="flex items-center gap-x-1">
      {Icon && Icon}
      <p className="kr-body-sm text-gray5">{label}</p>
    </div>
  )
}
