export default function ListHeader() {
  return (
    <div className="bg-gray1 flex h-[52px] items-center justify-between rounded-t-[20px] px-5 py-2">
      <div className="kr-body-sm text-gray5 flex w-[168px] shrink-0 items-center justify-center">스펙 이름</div>
      <div className="kr-body-sm text-gray5 flex w-[84px] shrink-0 items-center justify-center">진단일</div>
      <div className="kr-body-sm text-gray5 flex w-[56px] shrink-0 items-center justify-center">점수</div>
      <div className="kr-body-sm text-gray5 flex w-[360px] shrink-0 items-center justify-center">요약</div>
      <div className="w-[100px]" />
      <div className="w-[32px]" />
    </div>
  )
}
