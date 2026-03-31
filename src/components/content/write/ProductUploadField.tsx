'use client'

import { useRef } from 'react'
import { useCreateContentStore } from '@/store/contentStore'
import { Button, Label } from '@/components/common'
import UploadFileItem from '@/components/common/UploadFileItem'
import { UploadIcon } from '@/assets/svgComponents'

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// --- 드래그 가능한 아이템 컴포넌트 ---
function SortableProductItem({ file, index, onRemove }: { file: File; index: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `product-${file.name}-${index}`, // ID 충돌 방지를 위한 접두사 추가
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
    zIndex: isDragging ? 10 : 'auto',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <UploadFileItem file={file} onRemove={onRemove} />
    </div>
  )
}

// --- 메인 컴포넌트 ---
export default function ProductUploadField() {
  const productFiles = useCreateContentStore((state) => state.productFiles)
  const setProductFiles = useCreateContentStore((state) => state.setProductFiles)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 드래그 센서 설정 (클릭과 드래그 구분)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const currentFiles = productFiles || []
      setProductFiles([...currentFiles, ...files])
    }
    if (event.target) event.target.value = ''
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  // 드래그 종료 시 순서 변경 로직
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = productFiles!.findIndex((_, i) => `product-${productFiles![i].name}-${i}` === active.id)
      const newIndex = productFiles!.findIndex((_, i) => `product-${productFiles![i].name}-${i}` === over.id)

      setProductFiles(arrayMove(productFiles!, oldIndex, newIndex))
    }
  }

  const handleRemoveFile = (index: number) => {
    if (!productFiles) return
    const newFiles = productFiles.filter((_, i) => i !== index)
    setProductFiles(newFiles.length > 0 ? newFiles : null)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <Label label={'판매 콘텐츠'} isRequired={true} />
      <p className="kr-body-sm text-gray5">구매자에게 전달되는 상품이에요 (드래그하여 순서 변경)</p>

      <Button
        size={'sm'}
        onClick={handleUploadClick}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'outline'}
        customClassName={'h-[36px] w-fit pl-3 pr-4'}
      >
        파일 업로드
      </Button>

      <input ref={fileInputRef} type="file" multiple onChange={handleFileSelect} className="hidden" />

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={productFiles?.map((f, i) => `product-${f.name}-${i}`) || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="mt-1 flex flex-col gap-y-2">
            {productFiles?.map((file, index) => (
              <SortableProductItem
                key={`product-${file.name}-${index}`}
                file={file}
                index={index}
                onRemove={() => handleRemoveFile(index)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
