import { JSX } from 'react'

interface Props {
  date: string
  count: string
  duration: string
  job: string
}

export default function HistoryItemBody({ job, date, count, duration }: Props) {
  return (
    <section className="flex flex-col gap-y-2">
      <p className="kr-subtitle-md">{job}</p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <StatIconItem label={count} Icon={<div className="h-[20px] w-[20px] rounded-full bg-gray-100" />} />
          <StatIconItem label={duration} Icon={<div className="h-[20px] w-[20px] rounded-full bg-gray-100" />} />
        </div>
        <p className="kr-body-sm text-gray5">{date}</p>
      </div>
    </section>
  )
}

const StatIconItem = ({ label, Icon }: { label: string; Icon: JSX.Element }) => (
  <div className="flex items-center gap-x-1">
    {Icon && Icon}
    <p className="kr-body-sm text-gray5">{label}</p>
  </div>
)
