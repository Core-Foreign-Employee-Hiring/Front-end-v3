// hooks/useTest.ts
import { useInterviewStore } from '@/store/interview/interviewStore'
import { postAnswer, postFollowUpAnswer, postInterviewResult } from '@/lib/client/interview'
import { useRouter } from 'next/navigation'

export const useTest = () => {
  const store = useInterviewStore()
  const router = useRouter()
  // 1. 면접 최종 종료 및 결과 요청 함수
  const finishInterview = async () => {
    if (!store.interviewQuestion?.set_id) return

    try {
      const response = await postInterviewResult(store.interviewQuestion.set_id)
      if (response.data) {
        store.setInterviewResult(response.data) // 새로운 스토어에 결과 저장
        console.log('면접이 종료되어 결과가 생성되었습니다.')
        router.push(`/interview/${response.data.id}`)
        // 필요 시 여기서 /interview/result 페이지로 이동(router.push) 처리
      }
    } catch (error) {
      console.error('최종 결과 전송 실패:', error)
    }
  }

  // 2. 다음 질문 이동 로직 (종료 체크 포함)
  const moveToNextQuestion = async () => {
    const nextIndex = store.currentIndex + 1
    const totalCount = store.settingInterviewOption.question_count ?? 0

    // 질문이 더 남아있는 경우
    if (nextIndex < totalCount && store.interviewQuestion?.questions) {
      const nextQuestion = store.interviewQuestion.questions[nextIndex]
      store.addChatMessage({
        id: nextQuestion.id,
        type: 'COMMON_QUESTION',
        content: nextQuestion.question,
        order: nextQuestion.order,
      })
      store.setCurrentIndex(nextIndex)
      return true
    }

    // 질문을 모두 소진한 경우
    await finishInterview()
    return false
  }

  const handleCommonSubmit = async () => {
    // 1. 유효성 검사
    if (store.commonAnswer.user_answer.trim() === '' || !store.interviewQuestion) return

    // 2. 내 답변을 UI(채팅창)에 즉시 추가
    store.addChatMessage({
      id: store.commonAnswer.question_id,
      type: 'COMMON_ANSWER',
      content: store.commonAnswer.user_answer,
    })

    try {
      // 3. [수정] 조건에 상관없이 항상 답변 post 요청을 보냅니다.
      const response = await postAnswer(store.commonAnswer)

      // 4. 후속(압박) 질문 설정 여부에 따른 분기 처리
      if (store.commonAnswer.enable_follow_up) {
        // 압박 질문 옵션이 켜져 있고, 응답에 질문 데이터가 있는 경우
        if (response.data?.data?.follow_up_question) {
          store.addChatMessage({
            id: response.data.data.answer_id,
            type: 'FOLLOW_UP_QUESTION',
            content: response.data.data.follow_up_question,
          })
          // 답변 입력창 초기화
          store.setCommonAnswer({ ...store.commonAnswer, user_answer: '' })
          store.setFollowUpAnswer({ ...store.followUpAnswer, answer_id: response.data.data.answer_id })
        } else {
          // 옵션은 켰으나 서버에서 압박 질문을 주지 않은 경우, 다음 질문으로 이동
          await moveToNextQuestion()
        }
      } else {
        // 5. 압박 질문 옵션이 꺼져 있는 경우, 답변 저장 후 바로 다음 질문으로 이동
        await moveToNextQuestion()
      }
    } catch (error) {
      console.error('Answer submission error:', error)
    }
  }

  const handleFollowUpSubmit = async () => {
    if (store.followUpAnswer.follow_up_answer.trim() === '') return

    store.addChatMessage({
      id: store.followUpAnswer.answer_id,
      type: 'FOLLOW_UP_ANSWER',
      content: store.followUpAnswer.follow_up_answer,
    })

    try {
      const response = await postFollowUpAnswer(store.followUpAnswer)
      if (response.data.success) {
        await moveToNextQuestion()
        store.setFollowUpAnswer({ ...store.followUpAnswer, follow_up_answer: '' })
      }
    } catch (error) {
      console.error('Follow-up submission error:', error)
    }
  }

  return { handleCommonSubmit, handleFollowUpSubmit }
}
