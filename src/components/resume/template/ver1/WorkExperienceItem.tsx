export default function WorkExperienceItem() {
  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <p className="kr-title-md">K-Tech Solutions (스타트업)</p>
        <p className="kr-body-sm">2025. 09 - 2026. 01 (4개월)</p>
      </div>

      <p className="kr-subtitle-lg">Frontend Developer Intern</p>

      <p className="kr-body-md">
        React 기반 기업 내부 관리자 페이지 개발 공통 UI 컴포넌트 구조 설계 및 재사용성 개선 API 연동 및 비동기 상태 관리
        (Axios, React Query) 페이지 로딩 속도 개선으로 사용자 이탈률 약 25% 감소
      </p>
    </div>
  )
}
