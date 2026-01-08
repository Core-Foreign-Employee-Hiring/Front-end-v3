'use client'

import { Button, Spacing } from '@/components/common'
import { HistoryItemBody, HistoryItemHeader } from '@/components/interview'
import { InterviewStatusType, JobType, LevelType } from '@/types/interview'
import { formatDate, getLevelContent } from '@/utils/interview'
import { useRouter } from 'next/navigation'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { fetchClientInterviewResult } from '@/lib/client/interview'

interface HistoryItemProps {
  id: string
  progress: InterviewStatusType
  title: string
  job: JobType
  createdAt: string
  completedAt?: string
  level: LevelType
}

export default function HistoryItem({
  id,
  progress = 'in_progress',
  title,
  job,
  createdAt,
  completedAt,
  level,
}: HistoryItemProps) {
  const router = useRouter()
  const {
    setInterviewQuestion,
    clearChatList,
    addChatMessage,
    setCurrentIndex,
    setFollowUpAnswer,
    setCommonAnswer,
    setSettingInterviewOption,
    chatList,
  } = useInterviewStore((state) => state)

  const handleResumeInterview = async () => {
    try {
      const result = await fetchClientInterviewResult(id)
      console.log('결과', result)
      if (!result.data?.data) return

      const { questions, answers, set } = result.data.data

      // 1. 기존 데이터 초기화
      clearChatList()

      // 2. 면접 설정 정보 복구 (추가된 부분)
      setSettingInterviewOption({
        job_type: set.job_type,
        level: set.level, // set.job_level을 level로 매핑
        question_count: questions.length, // 질문 배열의 길이
        title: set.title,
      })

      // 3. 질문 데이터 세팅
      setInterviewQuestion({ set_id: set.id, questions: questions })

      let lastIndex = 0

      // 4. 답변 기록을 순회하며 채팅 리스트 복구
      answers.forEach((ans, idx) => {
        lastIndex = idx

        // 일반 질문 추가
        addChatMessage({
          id: ans.question_id,
          type: 'COMMON_QUESTION',
          content: ans.question.question,
          order: ans.question_order,
        })

        // 일반 답변 추가
        addChatMessage({
          id: ans.id,
          type: 'COMMON_ANSWER',
          content: ans.user_answer,
        })

        // 압박 질문이 있고 답변까지 완료된 경우
        if (ans.follow_up_question) {
          addChatMessage({
            id: ans.id,
            type: 'FOLLOW_UP_QUESTION',
            content: ans.follow_up_question,
          })

          if (ans.follow_up_answer) {
            addChatMessage({
              id: ans.id,
              type: 'FOLLOW_UP_ANSWER',
              content: ans.follow_up_answer,
            })
          }
        }
      })

      // 5. 다음 진행 지점 결정 로직
      const lastAnswer = answers[answers.length - 1]

      // 케이스 A: 압박 질문에 대한 답변이 필요한 상태
      if (lastAnswer && lastAnswer.follow_up_question && !lastAnswer.follow_up_answer) {
        setCurrentIndex(lastIndex)
        setFollowUpAnswer({
          answer_id: lastAnswer.id,
          follow_up_answer: '',
        })
        setCommonAnswer({
          set_id: set.id,
          question_id: lastAnswer.question_id,
          question_order: lastAnswer.question_order,
          user_answer: '',
        })
      }
      // 케이스 B: 새로운 일반 질문이 필요한 상태
      else {
        const nextIdx = answers.length
        if (nextIdx < questions.length) {
          const nextQ = questions[nextIdx]
          setCurrentIndex(nextIdx)

          addChatMessage({
            id: nextQ.id,
            type: 'COMMON_QUESTION',
            content: nextQ.question,
            order: nextQ.order,
          })

          setCommonAnswer({
            set_id: set.id,
            question_id: nextQ.id,
            question_order: nextQ.order,
            user_answer: '',
          })
        }
      }

      router.push(`/interview/test`)
    } catch (error) {
      console.error('인터뷰 복구 실패:', error)
    }
  }
  return (
    <div className="border-gray2 rounded-[12px] border bg-white p-5">
      <HistoryItemHeader title={title} progress={progress} />
      <Spacing height={8} />

      <HistoryItemBody
        progress={progress}
        job={job}
        createdAt={formatDate(createdAt)}
        completedAt={formatDate(completedAt)}
        level={getLevelContent(level)}
      />
      <Spacing height={24} />

      <Button
        onClick={() => {
          if (progress === 'completed') {
            router.push(`/interview/${id}`)
          } else {
            handleResumeInterview()
          }
        }}
        size={'lg'}
        variant={progress === 'completed' ? 'secondary' : 'primary'}
      >
        {progress === 'completed' ? '리포트보기' : '이어서 진행하기'}
      </Button>
    </div>
  )
}
