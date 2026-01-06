import { ResultContent, Spacing } from '@/components/common'
import { InterviewResult } from '@/components/interview'
import { fetchInterviewResult } from '@/lib/server/interview'

interface InterviewResultPageProps {
  params: Promise<{ setId: string }>
}

export default async function InterviewResultPage({ params }: InterviewResultPageProps) {
  const { setId } = await params
  const response = await fetchInterviewResult(setId)
  const evaluation = response.data?.evaluation
  console.log(response)

  return (
    <main>
      <div className="flex gap-x-[32px]">
        <InterviewResult
          completeness={evaluation?.completeness}
          overall_feedback={evaluation?.overall_feedback}
          evidence={evaluation?.evidence}
          formality={evaluation?.formality}
          job_understanding={evaluation?.job_understanding}
          logic={evaluation?.logic}
        />
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
      <Spacing height={32} />
      {/*<div className="flex flex-col gap-y-[20px]">*/}
      {/*  <QuestionEvaluationItem>*/}
      {/*    <QuestionEvaluationItem.QuestionItem*/}
      {/*      question={'입사 후 1년 내 목표는 무엇인가요?'}*/}
      {/*      questionNumber={1}*/}
      {/*      rightElement={*/}
      {/*        <Button customClassName={'w-[150px]'} size={'sm'} variant={'outline'}>*/}
      {/*          답변노트에 저장*/}
      {/*        </Button>*/}
      {/*      }*/}
      {/*    />*/}
      {/*    <QuestionEvaluationItem.AnalysisItem>*/}
      {/*      <div className="flex gap-x-[20px]">*/}
      {/*        <MyAnswerHistory />*/}
      {/*        <ResultContent*/}
      {/*          analysis={*/}
      {/*            '아직 ㅇㅇㅇㅇ 점과 ㅇㅇㅇ점이 부족해요\n' +*/}
      {/*            '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요 이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +*/}
      {/*            '이런 이런점을 채우면 좋은 성과를 얻을 수 있을 거에요.\n' +*/}
      {/*            '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +*/}
      {/*            '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요\n' +*/}
      {/*            '이런 이런점을 채우면 좋은 성과를 얻을 수 있을거에요이런 이런점을 채우면 좋은 성과를 얻을 수 있음.'*/}
      {/*          }*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*    </QuestionEvaluationItem.AnalysisItem>*/}
      {/*  </QuestionEvaluationItem>*/}
      {/*</div>*/}
    </main>
  )
}
