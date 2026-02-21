'use client'

import { Button } from '@/components/common'
import { exportComponentToPdf } from '@/utils/exportPdf'
import { useTranslation } from 'react-i18next'

interface BottomButtonProps {
  targetId: string // PDF로 바꿀 영역의 ID
}

export default function BottomButton({ targetId }: BottomButtonProps) {
  const { t } = useTranslation('resume')
  const handleDownloadPdf = async () => {
    // 파일명은 스토어에서 resumeName을 가져와 쓰면 더 좋습니다.
    await exportComponentToPdf(targetId, '이력서_내보내기')
  }
  return (
    <div className="fixed bottom-0 flex w-full justify-end gap-x-[16px] bg-white px-[40px] py-5">
      {/*<Button customClassName={'w-[180px]'} variant={'outline'} size={'lg'} onClick={() => {}}>*/}
      {/*  수정*/}
      {/*</Button>*/}
      <Button customClassName={'w-[180px]'} variant={'primary'} size={'lg'} onClick={handleDownloadPdf}>
        {t('buttons.export_pdf')}
      </Button>
    </div>
  )
}
