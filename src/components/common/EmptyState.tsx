'use client'

interface EmptyStateProps {
  icon?: string // 아이콘 (이모지 또는 이미지 경로)
  title: string // 메인 타이틀 (예: "저장된 데이터가 없습니다")
  description?: string // 보조 설명 (예: "새로운 기록을 추가해 보세요!")
  actionButton?: {
    // 선택사항: 특정 페이지로 이동하거나 액션을 취할 버튼
    label: string
    onClick: () => void
  }
}

export default function EmptyState({ icon = '📭', title, description, actionButton }: EmptyStateProps) {
  return (
    // 헤더를 제외한 나머지 영역의 중앙에 배치하기 위해 flex-1과 justify-center 사용
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-4 text-5xl">{icon}</div>

      <h3 className="text-xl font-semibold tracking-tight text-gray-900">{title}</h3>

      {description && <p className="mt-2 text-sm leading-6 whitespace-pre-line text-gray-500">{description}</p>}

      {actionButton && (
        <button
          onClick={actionButton.onClick}
          className="mt-6 rounded-full bg-gray-900 px-6 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800"
        >
          {actionButton.label}
        </button>
      )}
    </div>
  )
}
