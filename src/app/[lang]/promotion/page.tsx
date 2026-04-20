import Image from 'next/image'
import Link from 'next/link'

export default function PromotionPage() {
  return (
    <main className="min-h-screen bg-black">
      <div className="mx-auto max-w-[600px]">
        <div className="relative w-full">
          <Image
            src="/poster.png"
            alt="프로모션 포스터"
            width={600}
            height={0} // height는 sizes와 함께 자동 계산
            sizes="(max-width: 600px) 100vw, 600px"
            className="h-auto w-full"
            priority
          />
        </div>

        <div className="h-[80px]" />
        <section className="fixed bottom-0 w-full max-w-[600px] bg-black px-[20px] py-[20px]">
          <Link
            href={'https://forms.gle/ZAqJZLEwr4dW4shh7'}
            className={
              'bg-main-500 kr-subtitle-md flex h-[52px] w-full items-center justify-center rounded-[12px] text-white'
            }
          >
            무료 LIVE CLASS 신청하기
          </Link>
        </section>
      </div>
    </main>
  )
}
