// hooks/useTest.ts
import { useInterviewStore } from '@/store/interview/interviewStore'
import { postCommonAnswer, postFollowUpAnswer, postInterviewResult } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'

export const useTest = () => {
  const store = useInterviewStore()
  const router = useRouter()

  // 1. 면접 최종 종료 및 결과 생성 (Result Loading)
  const finishInterview = async () => {
    if (!store.interviewQuestion?.set_id) return

    store.setIsResultLoading(true) // 결과 생성 로딩 시작
    try {
      const response = await postInterviewResult(store.interviewQuestion.set_id)
      console.log('결과', response.data.data)
      if (response.data.data) {
        router.push(`/interview/${response.data.data.set_id}`)
      }
    } catch (error) {
      console.error('최종 결과 전송 실패:', error)
    } finally {
      store.setIsResultLoading(false)
    }
  }

  // 2. 다음 일반 질문으로 이동 (Next Question Loading)
  const moveToNextQuestion = async () => {
    store.setIsNextLoading(true) // 다음 질문 생성 로딩 시작

    const nextIndex = store.currentIndex + 1
    const totalCount = store.settingInterviewOption.question_count ?? 0

    if (nextIndex < totalCount && store.interviewQuestion?.questions) {
      const nextQuestion = store.interviewQuestion.questions[nextIndex]
      store.setCommonAnswer({
        ...store.commonAnswer,
        question_id: nextQuestion.id,
        user_answer: '',
        question_order: nextQuestion.order,
      })

      store.addChatMessage({
        id: nextQuestion.id,
        type: 'COMMON_QUESTION',
        content: nextQuestion.question,
        order: nextQuestion.order,
      })
      store.setCurrentIndex(nextIndex)
      store.setIsNextLoading(false) // 이동 완료 후 해제
      return true
    }

    // 질문 소진 시 결과 생성 단계로 진입
    store.setIsNextLoading(false)
    await finishInterview()
    return false
  }

  // 3. 공통 질문 답변 제출 및 압박 질문 생성 (FollowUp Loading)
  const handleCommonSubmit = async () => {
    if (store.commonAnswer.user_answer.trim() === '' || !store.interviewQuestion) return

    // 압박 질문 옵션 여부에 따라 로딩 상태 분리
    if (store.commonAnswer.enable_follow_up) {
      store.setIsFollowUpLoading(true) // 압박 질문 생성 중 로딩
    } else {
      store.setIsNextLoading(true) // 바로 다음 질문으로 넘어가므로 Next 로딩
    }

    store.addChatMessage({
      id: store.commonAnswer.question_id,
      type: 'COMMON_ANSWER',
      content: store.commonAnswer.user_answer,
    })

    try {
      const response = await postCommonAnswer(store.commonAnswer)

      if (store.commonAnswer.enable_follow_up && response.data?.data?.follow_up_question) {
        store.addChatMessage({
          id: response.data.data.answer_id,
          type: 'FOLLOW_UP_QUESTION',
          content: response.data.data.follow_up_question,
        })
        store.setCommonAnswer({ ...store.commonAnswer, user_answer: '' })
        store.setFollowUpAnswer({ ...store.followUpAnswer, answer_id: response.data.data.answer_id })
        store.setIsFollowUpLoading(false) // 압박 질문 생성 완료
      } else {
        store.setIsFollowUpLoading(false)
        await moveToNextQuestion()
      }
    } catch (error) {
      console.error('Answer submission error:', error)
      store.setIsFollowUpLoading(false)
      store.setIsNextLoading(false)
    }
  }

  // 4. 압박 질문 답변 제출 후 다음 질문으로 이동
  const handleFollowUpSubmit = async () => {
    if (store.followUpAnswer.follow_up_answer.trim() === '') return

    store.setIsNextLoading(true) // 압박 질문 답변 후엔 다음 질문이 오므로 Next 로딩

    store.addChatMessage({
      id: store.followUpAnswer.answer_id,
      type: 'FOLLOW_UP_ANSWER',
      content: store.followUpAnswer.follow_up_answer,
    })

    try {
      const response = await postFollowUpAnswer(store.followUpAnswer)
      if (response.data.success) {
        store.setFollowUpAnswer({ ...store.followUpAnswer, follow_up_answer: '' })
        await moveToNextQuestion()
      }
    } catch (error) {
      console.error('Follow-up submission error:', error)
      store.setIsNextLoading(false)
    }
  }

  return { handleCommonSubmit, handleFollowUpSubmit }
}
