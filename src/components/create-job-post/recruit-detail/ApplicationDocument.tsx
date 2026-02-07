'use client'

import { Button, Label } from '@/components/common'
import { useCreateJobPostStore } from '@/store/createJobPostStore'
import { SubmissionDocumentType } from '@/types/job-post'
import DirectInputSubmissionDocument from '@/components/create-job-post/recruit-detail/DirectInputSubmissionDocument'

// 요일 데이터를 관리하기 위한 상수 배열
const DOCUMENTS = [
  { label: '이력서', value: 'RESUME' },
  { label: '자기소개서', value: 'COVER_LETTER' },
  { label: '포트폴리오', value: 'PORTFOLIO' },
  { label: '경력기술서', value: 'CAREER_DESCRIPTION' },
  { label: '기타', value: 'ETC' },
] as const

export default function ApplicationDocument() {
  const { createJobPost, updateCreateJobPost } = useCreateJobPostStore((state) => state)

  // 현재 선택된 문서 리스트 (배열이 아닐 경우를 대비해 기본값 빈 배열 처리)
  const selectedSubmissionDocuments = Array.isArray(createJobPost.submissionDocuments)
    ? createJobPost.submissionDocuments
    : []

  const handleSubmissionDocumentClick = (submissionDocument: SubmissionDocumentType) => {
    let nextSubmissionDocuments: SubmissionDocumentType[]

    if (selectedSubmissionDocuments.includes(submissionDocument)) {
      // 이미 선택된 경우: 리스트에서 제거
      nextSubmissionDocuments = selectedSubmissionDocuments.filter((document) => document !== submissionDocument)
    } else {
      // 선택되지 않은 경우: 리스트에 추가
      nextSubmissionDocuments = [...selectedSubmissionDocuments, submissionDocument]
    }

    updateCreateJobPost('submissionDocuments', nextSubmissionDocuments)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'제출서류'} isOption={true} type={'titleSm'} />
      <div className="flex gap-x-3">
        {DOCUMENTS.map((document) => {
          const isSelected = selectedSubmissionDocuments.includes(document.value)

          return (
            <Button
              key={document.value}
              onClick={() => handleSubmissionDocumentClick(document.value)}
              size={'md'}
              variant={isSelected ? 'primary' : 'outline'}
            >
              {document.label}
            </Button>
          )
        })}
      </div>
      {createJobPost.submissionDocuments?.includes('ETC') && <DirectInputSubmissionDocument />}
    </div>
  )
}
