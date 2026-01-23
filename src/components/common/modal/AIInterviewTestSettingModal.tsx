'use client'

import { useRouter } from 'next/navigation'
import { Button, Label, Modal } from '@/components/common'
import {
  InterviewGuide,
  InterviewJob,
  InterviewLevel,
  InterviewQuestionCount,
  InterviewTitle,
} from '@/components/interview'
import { postInterviewData } from '@/lib/client/interview'
import { useInterviewStore } from '@/store/interview/interviewStore'

interface AIInterviewTestSettingProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIInterviewTestSettingModal({ isOpen, onClose }: AIInterviewTestSettingProps) {
  const { settingInterviewOption, setInterviewQuestion } = useInterviewStore((state) => state)
  const router = useRouter()
  const INTERVIEW_GUIDES = {
    PROCESS: {
      title: '진행 가이드',
      content:
        '공통/직무/역량 질문이 랜덤하게 섞여 출제돼요. \n 답변 꼬리질문 기능을 키면 심화된 질문과 답을 할 수 있어요. \n 음성으로 답변하면 텍스트가 자동으로 변환되어 기록돼요. \n 모든 답변이 끝나면 KORFIT이 5가지 역량을 분석해줍니다.',
    },
    SAMPLES: {
      title: '이런 질문이 나와요',
      content:
        '간단히 자기소개를 부탁드려요. \n 본인의 강점과 약점을 직무와 연관지어 설명해주세요. \n 한국 기업 문화에서 가장 중요하게 생각하는 것이 무엇인가요? \n 인사 후 3년 내에 이루고 싶은 목표가 있다면 말씀해주세요.',
    },
  }
  return (
    <Modal customClassName={'max-w-[860px]'} isOpen={isOpen} onClose={onClose}>
      <Modal.Header>
        <div className="flex flex-col gap-y-2">
          <Label label={'면접 설정'} type={'titleMd'} />
          <p className="kr-subtitle-md text-gray5">지원하는 직무와 레벨을 선택하면 KORFIT이 실전 질문으로 구성해요.</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="desktop:flex-row desktop:gap-x-[32px] tablet:flex-col tablet:gap-y-[32px] flex">
          <section className="flex w-full flex-col gap-y-[20px]">
            <Label label={'기본 설정'} type={'subtitleLg'} />
            <InterviewTitle />
            <div className="flex gap-x-3">
              <InterviewJob />
              <InterviewLevel />
            </div>
            <InterviewQuestionCount />
          </section>
          <section className="desktop:flex tablet:flex desktop:gap-y-5 desktop:flex-col tablet:gap-x-[20px] hidden">
            <InterviewGuide content={INTERVIEW_GUIDES.PROCESS.content} title={INTERVIEW_GUIDES.PROCESS.title} />
            <InterviewGuide content={INTERVIEW_GUIDES.SAMPLES.content} title={INTERVIEW_GUIDES.SAMPLES.title} />
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <>
          <Button onClick={onClose} customClassName={'w-[200px]'} variant={'outline'} size={'lg'}>
            닫기
          </Button>
          <Button
            onClick={async () => {
              const result = await postInterviewData(settingInterviewOption)

              if (result.success && result.data?.data) {
                setInterviewQuestion(result.data.data)

                router.push('/ko/interview/test')
              } else {
                alert('면접 데이터를 불러오는데 실패했습니다.')
              }
            }}
            variant={'primary'}
            size={'lg'}
          >
            면접 시작
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
