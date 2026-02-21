'use client'

import { Button, Spacing } from '@/components/common'
import { HistoryItemBody, HistoryItemHeader } from '@/components/interview'
import { InterviewStatusType, JobType, LevelType } from '@/types/interview'
import { formatDate, getLevelContent } from '@/utils/interview'
import { useRouter } from 'next/navigation'
import { useInterviewStore } from '@/store/interview/interviewStore'
import { fetchClientInterviewResult } from '@/lib/client/interview'
import { useTranslation } from 'react-i18next' // 추가

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
  const { t } = useTranslation('interview') // i18n hook

  const {
    setInterviewQuestion,
    clearChatList,
    addChatMessage,
    setCurrentIndex,
    setFollowUpAnswer,
    setCommonAnswer,
    setSettingInterviewOption,
  } = useInterviewStore((state) => state)

  const handleResumeInterview = async () => {
    try {
      const result = await fetchClientInterviewResult(id)
      if (!result.data?.data) return

      const { questions, answers, set } = result.data.data

      clearChatList()

      setSettingInterviewOption({
        job_type: set.job_type,
        level: set.level,
        question_count: questions.length,
        title: set.title,
      })

      setInterviewQuestion({ set_id: set.id, questions: questions })

      let lastIndex = 0

      answers.forEach((ans, idx) => {
        lastIndex = idx
        addChatMessage({
          id: ans.question_id,
          type: 'COMMON_QUESTION',
          content: ans.question.question,
          order: ans.question_order,
        })

        addChatMessage({
          id: ans.id,
          type: 'COMMON_ANSWER',
          content: ans.user_answer,
        })

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

      const lastAnswer = answers[answers.length - 1]

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
      } else {
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

  const isCompleted = progress === 'completed'

  return (
    <div className="border-gray2 hover:border-gray3 cursor-pointer rounded-[12px] border bg-white p-5 transition">
      <HistoryItemHeader title={title} progress={progress} />
      <Spacing height={8} />

      <HistoryItemBody
        progress={progress}
        job={job}
        createdAt={formatDate(createdAt)}
        completedAt={formatDate(completedAt)}
        level={getLevelContent(level, t)}
      />
      <Spacing height={24} />

      <Button
        onClick={() => {
          if (isCompleted) {
            router.push(`/interview/${id}`)
          } else {
            handleResumeInterview()
          }
        }}
        size={'lg'}
        variant={isCompleted ? 'secondary' : 'primary'}
      >
        {isCompleted ? t('history.button.report') : t('history.button.resume')}
      </Button>
    </div>
  )
}
