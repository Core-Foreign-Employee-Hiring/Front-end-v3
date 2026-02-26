import { Button, Spacing } from '@/components/common'
import Image from 'next/image'
import { useResumeStore } from '@/store/resumeStore'
import { useModalStore } from '@/store/modalStore'
import ResumePreviewModal from '@/components/common/modal/ResumePreviewModal'
import { useTranslation } from 'react-i18next'

interface SelectTemplateItemProps {
  type: 'ver1' | 'ver2'
  selectedType: 'ver1' | 'ver2'
  setSelectedType: (type: 'ver1' | 'ver2') => void
  imageUrl: string
}

export default function SelectTemplateItem({ type, selectedType, setSelectedType, imageUrl }: SelectTemplateItemProps) {
  const { t } = useTranslation('modal')
  const { updateCreateResumeField } = useResumeStore((state) => state)
  const { modals, toggleModal } = useModalStore((state) => state)
  return (
    <div
      onClick={() => {
        setSelectedType(type)
        updateCreateResumeField('template', type)
      }}
      className="w-full"
    >
      {modals.isResumePreviewModalOpen && <ResumePreviewModal type={selectedType} />}
      <div className="flex items-center gap-x-2">
        {type === selectedType ? (
          <button className="bg-main-500 flex h-[20px] w-[20px] items-center justify-center rounded-full">
            <div className="h-[10px] w-[10px] rounded-full bg-white" />
          </button>
        ) : (
          <div className="border-gray3 h-[20px] w-[20px] rounded-full border" />
        )}

        <p className="kr-button text-gray5">{type}</p>
      </div>

      <Spacing height={8} />

      <div
        className={`${type === selectedType ? 'border-main-500' : 'border-gray2'} relative h-[260px] w-full rounded-[12px] border`}
      >
        <Image src={imageUrl} alt={'이미지'} className="rounded-[12px] object-cover" fill />
        <Button
          onClick={(e) => {
            e.stopPropagation()
            setSelectedType(type)
            toggleModal('isResumePreviewModalOpen')
          }}
          customClassName={'absolute bottom-[16px] right-[16px] w-[85px]'}
          size={'sm'}
          variant={'outline'}
        >
          {t('create_resume.body.template.preview_button')}
        </Button>
      </div>
    </div>
  )
}
