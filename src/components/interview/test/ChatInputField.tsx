'use client'

import React, { KeyboardEvent, useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowUpIcon } from 'lucide-react' // 전송 아이콘용

interface ChatInputFieldProps {
  onSend: (message: string) => void
  placeholder?: string
}

export default function ChatInputField({ onSend, placeholder }: ChatInputFieldProps) {
  const [value, setValue] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // 1. 입력창 높이 자동 조절 로직
  const handleResizeHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto' // 높이 초기화
      textarea.style.height = `${textarea.scrollHeight}px` // 내용만큼 높이 설정
    }
  }

  // 값이 변할 때마다 높이 조절 실행
  useEffect(() => {
    handleResizeHeight()
  }, [value])

  // 2. 메시지 전송 핸들러
  const handleMessageSubmit = () => {
    if (value.trim() === '') return
    onSend(value)
    setValue('') // 입력창 초기화
  }

  // 3. 키다운 이벤트 핸들러 (Enter vs Shift+Enter)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // 한글 입력 시 중복 이벤트 방지 (composition check)
    if (e.nativeEvent.isComposing) return

    if (e.key === 'Enter') {
      if (e.shiftKey) {
        // Shift + Enter: 기본 동작 수행 (줄바꿈)
        return
      } else {
        // Enter: 전송
        e.preventDefault() // 기본 줄바꿈 방지
        handleMessageSubmit()
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
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || '메시지를 입력하세요...'}
          className={cn(
            'w-full resize-none bg-transparent px-4 py-3 pr-14',
            'kr-body-md max-h-[200px] overflow-y-auto focus:outline-none'
          )}
        />

        {/* 오른쪽 아래 전송 버튼 */}
        <button
          onClick={handleMessageSubmit}
          disabled={value.trim() === ''}
          className={cn(
            'absolute right-3 bottom-3 flex h-10 w-10 items-center justify-center rounded-[10px] transition-all',
            value.trim() !== '' ? 'bg-main-500 hover:bg-main-600 text-white' : 'bg-gray2 text-gray4 cursor-not-allowed'
          )}
        >
          <ArrowUpIcon size={20} />
        </button>
      </div>
    </div>
  )
}
