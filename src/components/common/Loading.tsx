interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | number
}

export default function Loading({ size = 'md' }: LoadingProps) {
  // 1. 미리 정의된 크기 스타일 맵
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-4',
    lg: 'h-12 w-12 border-4', // 크기가 커지면 두께도 약간 두꺼워지는게 보기 좋습니다.
  }

  // 2. 숫자가 들어올 경우를 위한 인라인 스타일 처리
  const isNumber = typeof size === 'number'

  const customStyle = isNumber
    ? {
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: size > 40 ? '4px' : '2px', // 크기에 따른 두께 자동 조절
      }
    : {}

  return (
    <div className="flex items-center justify-center">
      <div
        style={customStyle}
        className={` ${!isNumber ? sizeStyles[size] : ''} border-main-100 border-t-main-500 animate-spin rounded-full`}
      />
    </div>
  )
}
