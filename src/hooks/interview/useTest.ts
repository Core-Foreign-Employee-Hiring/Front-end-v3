// hooks/interview/useTest.ts
import { useInterviewStore } from '@/store/interview/interviewStore'
import { postCommonAnswer, postFollowUpAnswer, postInterviewResult } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'

export const useTest = () => {
  const store = useInterviewStore()
  const router = useRouter()

  const isAnyLoading = store.isFollowUpLoading || store.isNextLoading || store.isResultLoading

  /**
   * 1. 면접 최종 종료 및 결과 생성
   */
  const finishInterview = async () => {
    if (!store.interviewQuestion?.set_id) return

    store.setIsResultLoading(true)
    try {
      const response = await postInterviewResult(store.interviewQuestion.set_id)

      // 서버에서 성공 응답을 주면 결과 페이지로 이동
      if (response.data.success && response.data.data) {
        router.push(`/interview/${response.data.data.set_id}`)
      } else {
        // 질문이 남았는데 종료 요청을 한 경우 등 에러 처리
        console.warn('면접 미완료 상태:', response.data.data?.detail)
        alert(response.data.data?.detail || '아직 답변하지 않은 질문이 있습니다.')
      }
    } catch (error) {
      console.error('최종 결과 전송 실패:', error)
    } finally {
      store.setIsResultLoading(false)
    }
  }

  /**
   * 2. 다음 일반 질문으로 이동
   */
  const moveToNextQuestion = async () => {
    store.setIsNextLoading(true)

    // 현재 질문 리스트와 개수 파악 (Store의 설정값보다 실제 데이터 길이가 정확함)
    const questions = store.interviewQuestion?.questions || []
    const totalQuestionsCount = questions.length
    const nextIndex = store.currentIndex + 1

    // [중요] 다음 질문이 아직 남아있는 경우
    if (nextIndex < totalQuestionsCount) {
      const nextQuestion = questions[nextIndex]

      // 다음 질문 데이터로 Store 업데이트
      store.setCommonAnswer({
        set_id: store.interviewQuestion?.set_id,
        question_id: nextQuestion.id,
        question_order: nextQuestion.order,
        user_answer: '',
        enable_follow_up: true, // 혹은 설정에 따라
      })

      store.addChatMessage({
        id: nextQuestion.id,
        type: 'COMMON_QUESTION',
        content: nextQuestion.question,
        order: nextQuestion.order,
      })

      store.setCurrentIndex(nextIndex)
      store.setIsNextLoading(false)
      return true
    }

    // [중요] 더 이상 질문이 없을 때만 종료 로직 실행
    store.setIsNextLoading(false)
    await finishInterview()
    return false
  }

  /**
   * 3. 공통 질문 답변 제출
   */
  const handleCommonSubmit = async () => {
    const currentAnswer = store.commonAnswer.user_answer.trim()
    if (isAnyLoading || currentAnswer === '' || !store.interviewQuestion) return

    if (store.commonAnswer.enable_follow_up) {
      store.setIsFollowUpLoading(true)
    } else {
      store.setIsNextLoading(true)
    }

    store.addChatMessage({
      id: store.commonAnswer.question_id,
      type: 'COMMON_ANSWER',
      content: currentAnswer,
    })
    store.setCommonAnswer({ ...store.commonAnswer, user_answer: '' })

    try {
      const response = await postCommonAnswer({
        ...store.commonAnswer,
        user_answer: currentAnswer,
      })

      // 꼬리 질문이 온 경우
      if (store.commonAnswer.enable_follow_up && response.data?.data?.follow_up_question) {
        store.addChatMessage({
          id: response.data.data.answer_id,
          type: 'FOLLOW_UP_QUESTION',
          content: response.data.data.follow_up_question,
        })

        store.setFollowUpAnswer({
          answer_id: response.data.data.answer_id,
          follow_up_answer: '',
          audio: null,
        })
        store.setIsFollowUpLoading(false)
      } else {
        // 꼬리 질문이 없으면 다음 질문으로
        store.setIsFollowUpLoading(false)
        await moveToNextQuestion()
      }
    } catch (error) {
      console.error('일반 답변 전송 실패:', error)
      store.setIsFollowUpLoading(false)
      store.setIsNextLoading(false)
    }
  }

  /**
   * 4. 압박 질문(꼬리 질문) 답변 제출
   */
  const handleFollowUpSubmit = async () => {
    const currentFollowUp = store.followUpAnswer.follow_up_answer.trim()
    if (isAnyLoading || currentFollowUp === '') return

    store.setIsNextLoading(true)

    store.addChatMessage({
      id: store.followUpAnswer.answer_id,
      type: 'FOLLOW_UP_ANSWER',
      content: currentFollowUp,
    })

    // 즉시 입력창 비우기
    store.setFollowUpAnswer({ ...store.followUpAnswer, follow_up_answer: '' })

    try {
      const response = await postFollowUpAnswer({
        ...store.followUpAnswer,
        follow_up_answer: currentFollowUp,
      })

      if (response.data.success) {
        // 압박 답변이 성공적으로 처리되면 "무조건" 다음 일반 질문으로 이동 시도
        await moveToNextQuestion()
      }
    } catch (error) {
      console.error('압박 답변 전송 실패:', error)
      store.setIsNextLoading(false)
    }
  }

  return { handleCommonSubmit, handleFollowUpSubmit }
}
