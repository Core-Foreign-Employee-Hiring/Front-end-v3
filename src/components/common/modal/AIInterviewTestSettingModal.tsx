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
import { useTranslation } from 'react-i18next'

interface AIInterviewTestSettingProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIInterviewTestSettingModal({ isOpen, onClose }: AIInterviewTestSettingProps) {
  const { t } = useTranslation(['interview'])

  const { settingInterviewOption, setInterviewQuestion } = useInterviewStore((state) => state)
  const router = useRouter()

  return (
    <Modal
      mobileHidden={false}
      customClassName={'desktop:w-[860px] tablet:w-[682px] w-[335px]'}
      isOpen={isOpen}
      onClose={onClose}
    >
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
            <InterviewGuide
              bgColor={'bg-gray1'}
              title={t('home.guide.process.title')}
              content1={t('home.guide.process.items.0')}
              content2={t('home.guide.process.items.1')}
              content3={t('home.guide.process.items.2')}
              content4={t('home.guide.process.items.3')}
            />

            <InterviewGuide
              bgColor={'bg-gray1'}
              title={t('home.guide.examples.title')}
              content1={t('home.guide.examples.items.0')}
              content2={t('home.guide.examples.items.1')}
              content3={t('home.guide.examples.items.2')}
              content4={t('home.guide.examples.items.3')}
            />
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
