'use client'

import React, { KeyboardEvent, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpIcon } from 'lucide-react'
import { Loading } from '@/components/common'

interface ChatInputFieldProps {
  value: string
  isLoading: boolean
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string
  handleMessageSubmit: () => void
}

export default function ChatInputField({
  placeholder,
  value,
  onChange,
  handleMessageSubmit,
  isLoading,
}: ChatInputFieldProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isDisable = value.trim() === '' || isLoading

  // 1. 입력창 높이 자동 조절 로직 (최대 100px 제한)
  const handleResizeHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // 높이 초기화 후 scrollHeight 계산

      // scrollHeight와 100 중 작은 값을 선택하여 높이 설정
      const nextHeight = Math.min(textarea.scrollHeight, 100)
      textarea.style.height = `${nextHeight}px`
    }
  }

  useEffect(() => {
    handleResizeHeight()
  }, [value])

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter') {
      if (e.shiftKey) {
        return
      } else {
        e.preventDefault()
        if (!isDisable) handleMessageSubmit()
      }
    }
  }

  return (
    <div className="relative mx-auto w-full">
      <div className="border-gray2 focus-within:border-main-500 relative flex w-full items-end overflow-hidden rounded-[12px] border bg-white p-2 transition-colors">
        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={onChange}
          disabled={isLoading}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || '메시지를 입력하세요...'}
          className={cn(
            'w-full resize-none bg-transparent px-4 py-3 pr-14',
            // max-h를 100px로 수정하고, 스크롤이 자연스럽게 생기도록 설정
            'kr-body-md max-h-[100px] overflow-y-auto focus:outline-none'
          )}
        />

        <button
          onClick={handleMessageSubmit}
          disabled={isDisable}
          className={cn(
            'absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-[10px] transition-all',
            isDisable ? 'bg-gray2 text-gray4 cursor-not-allowed' : 'bg-main-500 hover:bg-main-600 text-white'
          )}
        >
          {isLoading ? <Loading size={'sm'} /> : <ArrowUpIcon size={20} />}
        </button>
      </div>
    </div>
  )
}
