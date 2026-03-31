'use client'

import { useRef } from 'react'
import { useCreateContentStore } from '@/store/contentStore'
import { Button } from '@/components/common'
import UploadFileItem from '@/components/common/UploadFileItem'
import UploadIcon from '@/assets/svgComponents/UploadIcon'

// Dnd-kit 관련 임포트
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

// --- 드래그 가능한 아이템 컴포넌트 분리 ---
function SortableFileItem({ file, index, onRemove }: { file: File; index: number; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: `${file.name}-${index}`,
  }) // 고유 ID 부여

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <UploadFileItem file={file} onRemove={onRemove} />
    </div>
  )
}

// --- 메인 컴포넌트 ---
export default function ImageUploadField() {
  const imageFiles = useCreateContentStore((state) => state.imageFiles)
  const setImageFiles = useCreateContentStore((state) => state.setImageFiles)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // 센서 설정 (마우스 및 키보드 지원)
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // 5px 이상 움직여야 드래그 시작 (클릭과 구분)
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      const currentFiles = imageFiles || []
      setImageFiles([...currentFiles, ...files])
    }
    if (event.target) event.target.value = ''
  }

  // 드래그가 끝났을 때 순서 변경 로직
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = imageFiles!.findIndex((_, i) => `${imageFiles![i].name}-${i}` === active.id)
      const newIndex = imageFiles!.findIndex((_, i) => `${imageFiles![i].name}-${i}` === over.id)

      setImageFiles(arrayMove(imageFiles!, oldIndex, newIndex))
    }
  }

  const handleRemoveFile = (index: number) => {
    if (!imageFiles) return
    setImageFiles(imageFiles.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col gap-y-3">
      <p className="subtitle-lg flex gap-x-1">이미지 (드래그하여 순서 변경)</p>
      <Button
        size={'sm'}
        onClick={() => fileInputRef.current?.click()}
        leftIcon={<UploadIcon width={20} height={20} />}
        variant={'outline'}
        customClassName={'h-[36px] w-fit pl-3 pr-4'}
      >
        이미지 업로드
      </Button>
      <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleFileSelect} className="hidden" />

      {/* Dnd 영역 */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={imageFiles?.map((f, i) => `${f.name}-${i}`) || []}
          strategy={verticalListSortingStrategy}
        >
          <div className="flex flex-col gap-y-2">
            {imageFiles?.map((file, index) => (
              <SortableFileItem
                key={`${file.name}-${index}`}
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
