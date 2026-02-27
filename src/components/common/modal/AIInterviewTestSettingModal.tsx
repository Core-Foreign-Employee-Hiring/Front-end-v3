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
import { useToast } from '@/components/common/toast/ToastContext'

interface AIInterviewTestSettingProps {
  isOpen: boolean
  onClose: () => void
}

export default function AIInterviewTestSettingModal({ isOpen, onClose }: AIInterviewTestSettingProps) {
  const { t } = useTranslation(['interview', 'modal', 'message'])
  const { error } = useToast()

  const { settingInterviewOption, setInterviewQuestion, setSettingInterviewOption, resetInterview } = useInterviewStore(
    (state) => state
  )
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
          <Label label={t('modal:ai_interview_test_setting.header.title')} type={'titleMd'} />
          <p className="kr-subtitle-md text-gray5">{t('modal:ai_interview_test_setting.header.description')}</p>
        </div>
      </Modal.Header>

      <Modal.Body>
        <div className="desktop:flex-row desktop:gap-x-[32px] tablet:flex-col tablet:gap-y-[32px] flex">
          <section className="flex w-full flex-col gap-y-[20px]">
            <Label label={t('modal:ai_interview_test_setting.body.basic_setting')} type={'subtitleLg'} />
            <InterviewTitle />
            <div className="flex gap-x-3">
              <InterviewJob />
              <InterviewLevel />
            </div>
            <InterviewQuestionCount />
          </section>
          <section className="desktop:flex tablet:flex desktop:gap-y-5 desktop:flex-col tablet:gap-x-[20px] hidden">
            <InterviewGuide
              bgColor={'bg-white'}
              title={t('interview:home.guide.process.title')}
              content1={t('interview:home.guide.process.items.0')}
              content2={t('interview:home.guide.process.items.1')}
              content3={t('interview:home.guide.process.items.2')}
              content4={t('interview:home.guide.process.items.3')}
            />

            <InterviewGuide
              bgColor={'bg-white'}
              title={t('interview:home.guide.examples.title')}
              content1={t('interview:home.guide.examples.items.0')}
              content2={t('interview:home.guide.examples.items.1')}
              content3={t('interview:home.guide.examples.items.2')}
              content4={t('interview:home.guide.examples.items.3')}
            />
          </section>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <>
          <Button onClick={onClose} customClassName={'w-[200px]'} variant={'outline'} size={'lg'}>
            {t('modal:footer_buttons.close')}
          </Button>
          <Button
            onClick={async () => {
              const result = await postInterviewData(settingInterviewOption)
              console.log('result', result)

              if (result.success && result.data?.data) {
                const responseData = result.data.data
                if ('detail' in responseData) {
                  error(
                    t('message:post_interview_data.error.title'),
                    t('message:post_interview_data.error.description')
                  )
                  setSettingInterviewOption({
                    job_type: null,
                    level: null,
                    question_count: null,
                    title: '',
                  })
                  onClose()
                } else {
                  resetInterview()
                  setInterviewQuestion(responseData)
                  setSettingInterviewOption({
                    job_type: null,
                    level: null,
                    question_count: null,
                    title: '',
                  })

                  router.push('/ko/interview/test')
                }
              } else {
                error(t('message:post_interview_data.error.title'), t('message:post_interview_data.error.description'))
              }
            }}
            variant={'primary'}
            size={'lg'}
          >
            {t('modal:ai_interview_test_setting.footer.start')}
          </Button>
        </>
      </Modal.Footer>
    </Modal>
  )
}
