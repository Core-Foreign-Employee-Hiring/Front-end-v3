export default function OrderInfo() {
  return (
    <div className="flex flex-col gap-y-4">
      <h2 className="kr-subtitle-lg">주문자 정보</h2>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">이름</div>
        <div className="kr-title-sm">황유림</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">휴대폰 번호</div>
        <div className="kr-title-sm">010-7557-9217</div>
      </section>

      <section className="flex items-center justify-between">
        <div className="kr-subtitle-md text-gray5">이메일</div>
        <div className="kr-title-sm">hske3602@naver.com</div>
      </section>
    </div>
  )
}
