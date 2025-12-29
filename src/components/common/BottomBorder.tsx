interface BottomBorderProps {
  color?: 'gray2'
}

export default function BottomBorder({ color = 'gray2' }: BottomBorderProps) {
  return <div style={{ borderColor: `var(--color-${color})` }} className="w-full border-b-[1px]" />
}
