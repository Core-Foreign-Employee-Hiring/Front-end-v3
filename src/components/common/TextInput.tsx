'use client'

import { ChangeEvent, FocusEvent, MouseEvent, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const statusStyleType = {
  default: 'border-gray2 hover:border-main-300 focus-within:border-main-500 placeholder:text-gray4 text-black',
  filled: 'border-gray3 text-black',
  error: 'border-error text-black',
}

interface TextInputProps {
  value: string | number
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  textType?: 'textField' | 'textArea'
  inputType?: 'number' | 'text' | 'password'
  placeholder?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
  onClick?: (e: MouseEvent<HTMLElement>) => void
  status?: 'default' | 'filled' | 'error'
  helperText?: string
  buttonElement?: ReactNode
  leftElement?: ReactNode
  rightElement?: ReactNode
  maxLength?: number
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  customClassName?: string
  readOnly?: boolean
}

export default function TextInput({
  textType = 'textField',
  inputType = 'text',
  placeholder,
  value,
  onChange,
  status = 'default',
  helperText,
  buttonElement,
  leftElement,
  rightElement,
  onClick,
  onKeyDown,
  onBlur,
  onFocus,
  customClassName,
  maxLength,
  readOnly = false,
}: TextInputProps) {
  const textFieldBase = 'border p-4 bg-white rounded-[12px] kr-body-md outline-none w-full transition'
  const textAreaBase = 'border py-3 px-4 bg-white rounded-[16px] kr-body-md h-[147px] w-full outline-none transition'
  const statusStyle = statusStyleType[status]
  const textFieldClassName = [textFieldBase, statusStyle].join(' ')
  const textAreaClassName = [textAreaBase, statusStyle].join(' ')

  return textType === 'textField' ? (
    <div className={twMerge('flex w-full flex-col gap-y-2 whitespace-nowrap', customClassName)}>
      <div className="flex w-full items-center gap-x-2">
        <div className={`${textFieldClassName} flex w-full items-center gap-x-2`}>
          {leftElement && leftElement}
          <input
            readOnly={readOnly}
            onFocus={onFocus}
            onBlur={onBlur}
            onKeyDown={onKeyDown}
            onClick={onClick}
            type={inputType}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            className={'w-full outline-none'}
          />
          {rightElement && rightElement}
        </div>
        {buttonElement && buttonElement}
      </div>

      {helperText && status === 'error' ? <p className="kr-badge-md text-error">{helperText}</p> : null}
    </div>
  ) : (
    <div className="flex w-full flex-col gap-y-2">
      <textarea value={value} onChange={onChange} placeholder={placeholder} className={textAreaClassName} />
      {helperText && <p className="kr-badge-md text-error">{helperText}</p>}
    </div>
  )
}
