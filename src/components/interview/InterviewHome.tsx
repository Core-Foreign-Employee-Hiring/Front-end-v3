import { InterviewIntro, InterviewResult, InterviewResultInfoItem } from '@/components/interview/index'
import { ResultContent, Spacing } from '@/components/common'

export default function InterviewHome() {
  return (
    <>
      <InterviewIntro />
      <Spacing height={20} />

      <div className="flex gap-x-[24px]">
        <InterviewResult />
        <div>
          <div className="flex w-full gap-x-3">
            <InterviewResultInfoItem title={'총 면접 횟수'} content={'12회'} option={'+3건'} />
            <InterviewResultInfoItem title={'총 면접 횟수'} content={'12회'} option={'+3건'} />
            <InterviewResultInfoItem title={'총 면접 횟수'} content={'12회'} option={'+3건'} />
          </div>

          <Spacing height={20} />
          <ResultContent
            analysis={
              '아직 ㅇㅇㅇㅇ 점과 ㅇㅇㅇ점이 부족해요\n' +
              '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요 이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +
              '이런 이런점을 채우면 좋은 성과를 얻을 수 있을 거에요.\n' +
              '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +
              '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +
              '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요이런 이런점을 채우면 좋은 성과를 얻을 수 있음.'
            }
          />
        </div>
      </div>
    </>
  )
}
