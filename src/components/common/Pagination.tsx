'use client'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  groupSize?: number // 한 번에 보여줄 페이지 개수 (기본값 5)
}

export default function Pagination({ currentPage, totalPages, onPageChange, groupSize = 5 }: PaginationProps) {
  // 현재 페이지가 속한 그룹 계산 (예: 1~5페이지는 1그룹, 6~10페이지는 2그룹)
  const currentGroup = Math.ceil(currentPage / groupSize)
  const startPage = (currentGroup - 1) * groupSize + 1
  const endPage = Math.min(startPage + groupSize - 1, totalPages)

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

  if (totalPages <= 1) return null // 페이지가 1개 이하라면 표시하지 않음

  return (
    <div className="flex items-center justify-center gap-x-2 py-10">
      {/* 이전 그룹 버튼 */}
      <button
        onClick={() => onPageChange(startPage - 1)}
        disabled={startPage === 1}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:invisible"
      >
        <span className="sr-only">Previous Group</span>
        &lt;
      </button>

      {/* 페이지 번호 목록 */}
      <div className="flex items-center gap-x-3">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`kr-button h-[28px] min-w-[28px] rounded-full px-2 transition-colors ${
              currentPage === page
                ? 'bg-main-100 text-main-500 kr-button flex h-[28px] w-[28px] items-center justify-center'
                : 'kr-button text-gray3 hover:bg-gray1'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 다음 그룹 버튼 */}
      <button
        onClick={() => onPageChange(endPage + 1)}
        disabled={endPage === totalPages}
        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-400 transition-colors hover:bg-gray-50 disabled:invisible"
      >
        <span className="sr-only">Next Group</span>
        &gt;
      </button>
    </div>
  )
}
