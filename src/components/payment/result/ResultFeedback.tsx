import { ReactElement } from 'react'

interface ResultFeedbackProps {
  icon: ReactElement
  title: string
  content: string
}

export default function ResultFeedback({ icon, content, title }: ResultFeedbackProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-y-2">
      {icon && icon}
      <div className="kr-title-lg">{title}</div>
      <p className="kr-body-md text-gray5 text-center whitespace-pre">{content}</p>
    </div>
  )
}
