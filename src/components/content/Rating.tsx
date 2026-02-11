import { GrayStarIcon, StarIcon } from '@/assets/svgComponents'

interface RatingProps {
  star: number
}

export default function Rating({ star }: RatingProps) {
  // 5개의 요소를 가진 배열을 생성합니다.
  const totalStars = 5
  const activeStarCount = Math.floor(star)

  return (
    <section className="flex">
      {Array.from({ length: totalStars }).map((_, index) =>
        index < activeStarCount ? (
          <StarIcon key={index} width={20} height={20} />
        ) : (
          <GrayStarIcon key={index} width={20} height={20} />
        )
      )}
    </section>
  )
}
