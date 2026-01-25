'use client'

import { Spacing } from '@/components/common'
import SelectTemplateItem from '@/components/resume/template/SelectTemplateItem'
import { useState } from 'react'

export default function Template() {
  const [selectedtype, setSelectedType] = useState<'ver1' | 'ver2'>('ver1')
  return (
    <div>
      <Spacing height={20} />
      <div className="flex gap-x-5">
        <SelectTemplateItem
          type={'ver1'}
          selectedType={selectedtype}
          setSelectedType={setSelectedType}
          imageUrl={'/template-ver1.png'}
        />
        <SelectTemplateItem
          type={'ver2'}
          selectedType={selectedtype}
          setSelectedType={setSelectedType}
          imageUrl={'/template-ver2.png'}
        />
      </div>
    </div>
  )
}
