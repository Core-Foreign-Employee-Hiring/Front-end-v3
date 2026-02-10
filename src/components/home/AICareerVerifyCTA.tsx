import { Label } from '@/components/common'
import CTACard from '@/components/home/CTACard'
import { WhiteClopboardIcon, WhiteEditDocumentIcon, WhiteVoiceChatOutlineIcon } from '@/assets/svgComponents'

interface AICareerVerifyCTAProps {
  lang: string
}

export default function AICareerVerifyCTA({ lang }: AICareerVerifyCTAProps) {
  const ctaCardList = [
    {
      icon: <WhiteClopboardIcon width={21} height={26} />,
      title: '커리어 진단',
      description: 'AI 분석을 통해 나의 역량과 적성을 진단해,\n' + '커리어 방향과 전략을 제안받으세요.',
      path: `/${lang}/carrer?tab=spec&step=1`,
    },
    {
      icon: <WhiteEditDocumentIcon width={23} height={25} />,
      title: '이력서 작성',
      description: '스펙을 기반으로 지원하는 회사와 직무에 맞게\n' + '이력서를 작성하고 관리할 수 있어요.',
      path: `/${lang}/carrer?tab=resume`,
    },
    {
      icon: <WhiteVoiceChatOutlineIcon width={30} height={30} />,
      title: 'AI 면접',
      description: '실제 면접처럼 반복 연습하면서,\n' + '정밀한 AI 분석을 통해 면접 역량 점검해요.',
      path: `/${lang}/interview?tab=home`,
    },
  ]
  return (
    <div className="bg-gray1 flex flex-col gap-y-[12px] px-[40px] py-[60px]">
      <div className="flex flex-col gap-y-2">
        <Label type={'titleLg'} label={'AI 커리어 검증'} />
        <p className="kr-body-md">체계적인 프로세스로 커리어를 준비해보세요.</p>
      </div>

      <div className="desktop:flex-row tablet:flex-row flex flex-col gap-x-6 gap-y-4">
        {ctaCardList.map((cta) => (
          <CTACard path={cta.path} key={cta.title} title={cta.title} description={cta.description} Icon={cta.icon} />
        ))}
      </div>
    </div>
  )
}
