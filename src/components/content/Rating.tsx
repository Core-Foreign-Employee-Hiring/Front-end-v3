import { GrayStarIcon, StarIcon } from '@/assets/svgComponents'

interface RatingProps {
  star: number
}

export default function Rating({ star }: RatingProps) {
  const totalStars = 5
  const activeStarCount = Math.floor(star)

  return (
    <section className="flex">
      {Array.from({ length: totalStars }).map((_, index) => {
        return index < activeStarCount ? (
          <StarIcon key={index} width={20} height={20} />
        ) : (
          <GrayStarIcon key={index} width={20} height={20} />
        )
      })}
    </section>
  )
}
