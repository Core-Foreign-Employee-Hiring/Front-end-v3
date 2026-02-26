'use client'

import { Spacing } from '@/components/common'
import SelectTemplateItem from '@/components/resume/template/SelectTemplateItem'
import { useResumeStore } from '@/store/resumeStore'

export default function Template() {
  const { setSelectedType, selectedType } = useResumeStore((state) => state)
  return (
    <div>
      <Spacing height={20} />
      <div className="flex gap-x-5">
        <SelectTemplateItem
          type={'Modern'}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          imageUrl={'/template-ver1.png'}
        />
        <SelectTemplateItem
          type={'Classic'}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          imageUrl={'/template-ver2.png'}
        />
      </div>
    </div>
  )
}
