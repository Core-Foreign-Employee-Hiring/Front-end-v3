import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variantStyles = {
  primary: {
    default: 'bg-main-500 hover:bg-main-800 text-white cursor-pointer active:scale-90 transition',
    selected: 'active:scale-50',
    disable: 'bg-gray2 text-gray5 cursor-not-allowed',
  },
  secondary: {
    default:
      'border border-transparent bg-main-50 text-main-500 hover:border-main-100 cursor-pointer active:scale-90 transition',
    selected: 'bg-main-50 border border-main-300 text-main-500 active:scale-50',
    disable: 'bg-gray2 text-gray5 cursor-not-allowed',
  },
  outline: {
    default: 'bg-white text-gray5 border border-gray2 hover:border-main-100 cursor-pointer active:scale-90 transition',
    selected: 'bg-main-100 border border-main-500 text-main-500',
    disable: 'bg-gray2 text-gray5 cursor-not-allowed',
  },
  ghost: {
    default: 'text-gray5 hover:bg-gray2 cursor-pointer active:scale-90 transition',
    selected: 'bg-gray1 border border-gray3 text-gray5',
    disable: 'bg-gray2 text-gray5 cursor-not-allowed',
  },
}
const sizeStyles = {
  lg: 'gap-x-2 h-[52px] kr-subtitle-md py-4 px-4 rounded-[12px]',
  md: 'gap-x-2 h-[40px] kr-button py-2 px-4 rounded-[10px]',
  sm: 'gap-x-1 h-[36px] kr-button py-1 px-4 rounded-[8px]',
}

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  state?: 'default' | 'selected' | 'disable'
  size?: 'lg' | 'md' | 'sm'
  customClassName?: string
  children?: ReactNode
  onClick?: () => void
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  disabled?: boolean
  buttonType?: 'button' | 'submit'
  isLoading?: boolean
}

export default function Button({
  variant = 'primary',
  state = 'default',
  size = 'lg',
  buttonType,
  disabled,
  children,
  onClick,
  rightIcon,
  leftIcon,
  customClassName,
  isLoading,
}: ButtonProps) {
  const isDisabled = disabled || isLoading
  const currentState = isDisabled ? 'disable' : state

  const base = 'flex items-center justify-center w-full rounded'
  const variantClass = variantStyles[variant][currentState]
  const sizeClass = sizeStyles[size]
  const className = [base, variantClass, sizeClass].join(' ')

  return (
    <button
      disabled={disabled}
      type={buttonType}
      onClick={onClick}
      className={twMerge(`${className}`, customClassName)}
    >
      <div className={twMerge('flex items-center gap-x-2', isLoading ? 'opacity-0' : 'opacity-100')}>
        {leftIcon && leftIcon}
        {isLoading ? <LoadingSpinner /> : children}
        {rightIcon && rightIcon}
      </div>
    </button>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>로딩중...</span>
    </div>
  )
}
