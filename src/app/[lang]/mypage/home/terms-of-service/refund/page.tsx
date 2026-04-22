'use client'

import { useState } from 'react'

// ─── 타입 ───────────────────────────────────────────────────────────────────
interface Section {
  id: string
  title: string
  content: React.ReactNode
}

interface Tab {
  id: 'refund' | 'terms'
  label: string
}

// ─── 상수 데이터 ─────────────────────────────────────────────────────────────
const TABS: Tab[] = [
  { id: 'refund', label: '환불 및 교환 안내' },
  { id: 'terms', label: '유료 서비스 이용약관' },
]

const REFUND_SECTIONS: Section[] = [
  {
    id: 'refund-policy',
    title: '1. 환불 및 취소 규정',
    content: (
      <div className="space-y-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">환불 가능한 경우</p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-gray-400">·</span>
              콘텐츠 파일에 결함이 있어 정상적인 이용이 불가능한 경우 (전액 환불 또는 교환)
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-2 text-sm font-semibold text-gray-700">환불이 불가능한 경우 (청약철회 제한)</p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-gray-400">·</span>
              콘텐츠 파일 및 시스템 결함 이외의 단순 변심에 의한 경우
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-gray-400">·</span>
              판매자가 사전에 공지한 '업데이트 예정 사항' 미이행을 제외한 주관적 만족도(내용이 기대와 다름 등)에 의한
              경우
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: 'exchange',
    title: '2. 콘텐츠 하자 및 정보 오류에 관한 교환',
    content: (
      <ul className="space-y-1.5 text-sm text-gray-600">
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          제공된 채용 팁이 상세 설명에 명시된 내용과 현저히 다르거나 허위 사실이 포함된 경우, 구매자는 결제 후{' '}
          <span className="font-semibold text-gray-800">14일 이내</span>에 수정 보완 또는 환불을 요청할 수 있습니다.
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          판매자의 사정으로 서비스 제공이 중단되거나 약속된 혜택(예: 1:1 상담권 등)이 이행되지 않을 경우, 미이행분에
          대해 부분 또는 전액 환불됩니다.
        </li>
      </ul>
    ),
  },
  {
    id: 'process',
    title: '3. 신청 방법 및 절차',
    content: (
      <ul className="space-y-1.5 text-sm text-gray-600">
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          <span>
            <span className="font-semibold text-gray-800">신청 방법:</span> 마이페이지 &gt; 구매 내역 &gt;
            고객센터(채널톡/메일)를 통해 접수해 주세요.
          </span>
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          <span>
            <span className="font-semibold text-gray-800">처리 기간:</span> 환불 요건 확인 후 영업일 기준 3~5일 이내에
            결제 수단별로 취소 처리가 완료됩니다.
          </span>
        </li>
      </ul>
    ),
  },
  {
    id: 'copyright',
    title: '4. 저작권 및 이용 주의사항',
    content: (
      <ul className="space-y-1.5 text-sm text-gray-600">
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          구매하신 콘텐츠는 구매자 본인만 이용 가능하며, 무단 복제·배포·공유 및 상업적 재판매를 엄격히 금지합니다.
        </li>
        <li className="flex gap-2">
          <span className="mt-0.5 shrink-0 text-gray-400">·</span>
          이를 위반할 경우 저작권법에 따라 민·형사상의 책임을 질 수 있으며, 서비스 이용이 제한될 수 있습니다.
        </li>
      </ul>
    ),
  },
]

const TERMS_SECTIONS: Section[] = [
  {
    id: 'purpose',
    title: '제1조 (목적)',
    content: (
      <p className="text-sm leading-relaxed text-gray-600">
        이 약관은 <span className="font-semibold text-gray-800">[굿에티튜드]</span>가 운영하는 플랫폼 KORFIT에서
        제공하는 유료 서비스(PDF, 전자책 등 디지털 콘텐츠 및 관련 제반 서비스)의 이용과 관련하여 회사와 회원 간의 권리,
        의무 및 책임사항을 규정함을 목적으로 합니다.
      </p>
    ),
  },
  {
    id: 'terms-update',
    title: '제2조 (약관의 게시와 개정)',
    content: (
      <ol className="space-y-1.5 text-sm text-gray-600">
        {[
          '회사는 이 약관의 내용을 회원이 쉽게 확인할 수 있도록 서비스 초기 화면에 게시합니다.',
          '회사는 「콘텐츠산업진흥법」, 「전자상거래 등에서의 소비자보호에 관한 법률」 등 관련 법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.',
          '약관 개정 시 적용일자 7일 전(회원에게 불리한 경우 30일 전)부터 공지하며, 회원이 개정일 이후에도 서비스를 계속 이용할 경우 개정된 약관에 동의한 것으로 간주합니다.',
        ].map((text, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0 text-gray-400">{i + 1}.</span>
            {text}
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'service-content',
    title: '제3조 (유료서비스의 내용 게시)',
    content: (
      <>
        <p className="mb-2 text-sm text-gray-600">회사는 다음 사항을 해당 유료 서비스의 상세 페이지에 표시합니다.</p>
        <ol className="space-y-1.5 text-sm text-gray-600">
          {['유료 서비스(PDF, 전자책 등)의 명칭 및 내용', '판매 가격', '환불 규정 및 절차'].map((text, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 text-gray-400">{i + 1}.</span>
              {text}
            </li>
          ))}
        </ol>
      </>
    ),
  },
  {
    id: 'contract',
    title: '제4조 (이용계약의 성립 및 제한)',
    content: (
      <ol className="space-y-1.5 text-sm text-gray-600">
        {[
          '이용계약은 회원이 회사가 제시한 절차에 따라 구매 신청을 하고, 결제가 완료된 시점에 성립합니다.',
          '회원은 구매한 콘텐츠를 타인에게 양도, 대여, 판매할 수 없으며 이를 위반 시 서비스 이용 제한 및 법적 조치가 취해질 수 있습니다.',
        ].map((text, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0 text-gray-400">{i + 1}.</span>
            {text}
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'refund-terms',
    title: '제5조 (청약철회 및 환불 정책)',
    content: (
      <>
        <p className="mb-2 text-sm text-gray-600">
          KORFIT의 유료 서비스는 '디지털 콘텐츠'의 특성에 따라 다음과 같은 환불 원칙을 따릅니다.
        </p>
        <ol className="space-y-1.5 text-sm text-gray-600">
          <li className="flex gap-2">
            <span className="shrink-0 text-gray-400">1.</span>
            <span>
              <span className="font-semibold text-gray-800">전액 환불:</span> 구매 후 해당 PDF/전자책 파일에 기술적
              결함이 발견된 경우
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-gray-400">2.</span>
            <span>
              <span className="font-semibold text-gray-800">환불 불가 (청약철회 제한):</span> 「전자상거래 등에서의
              소비자보호에 관한 법률」 제17조 제2항에 따라, 기술적 결함이 아닌 모든 경우에는 콘텐츠 환불이 불가능합니다.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="shrink-0 text-gray-400">3.</span>
            <span>
              <span className="font-semibold text-gray-800">오류 발생 시:</span> 파일 자체의 결함으로 인해 정상적인
              이용이 불가능한 경우, 회사는 이를 수정하거나 전액 환불합니다.
            </span>
          </li>
        </ol>
      </>
    ),
  },
  {
    id: 'copyright-terms',
    title: '제6조 (저작권 보호)',
    content: (
      <ol className="space-y-1.5 text-sm text-gray-600">
        {[
          '회사가 제공하는 모든 유료 콘텐츠의 저작권은 회사에 귀속됩니다.',
          '회원은 구매한 콘텐츠를 개인적인 용도로만 사용해야 하며, 이를 무단으로 복제·배포·수정하거나 커뮤니티 및 SNS에 공유하는 행위는 엄격히 금지됩니다.',
        ].map((text, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0 text-gray-400">{i + 1}.</span>
            {text}
          </li>
        ))}
      </ol>
    ),
  },
  {
    id: 'service-period',
    title: '제7조 (서비스 제공 기간 및 이용 방법)',
    content: (
      <ol className="space-y-1.5 text-sm text-gray-600">
        {[
          '구매한 콘텐츠는 결제 완료 후 즉시 다운로드, 조회·열람하여 이용 가능합니다.',
          '다운로드한 파일은 구매자의 기기에 저장하여 이용할 수 있으며, 플랫폼 내 조회·열람 서비스는 회사의 운영 정책에 따라 제공 기간이 변경될 수 있습니다.',
          '단, 파일 결함 등 회사 귀책 사유가 발생한 경우 구매일로부터 14일 이내에 재다운로드, 재열람 제공 또는 환불을 요청할 수 있습니다.',
        ].map((text, i) => (
          <li key={i} className="flex gap-2">
            <span className="shrink-0 text-gray-400">{i + 1}.</span>
            {text}
          </li>
        ))}
      </ol>
    ),
  },
]

// ─── 서브 컴포넌트 ────────────────────────────────────────────────────────────
function SectionItem({ section }: { section: Section }) {
  return (
    <div className="border-b border-gray-100 py-6 last:border-none">
      <h3 className="mb-3 text-sm font-semibold tracking-wide text-gray-900">{section.title}</h3>
      {section.content}
    </div>
  )
}

function NoticeBanner() {
  return (
    <div className="mb-6 rounded-md border border-amber-200 bg-amber-50 px-4 py-3">
      <p className="text-xs leading-relaxed text-amber-700">
        📢 이 약관은 <span className="font-semibold">2026년 4월 1일</span>부터 유효합니다.
      </p>
    </div>
  )
}

// ─── 메인 페이지 ──────────────────────────────────────────────────────────────
export default function TermsPage() {
  const [activeTab, setActiveTab] = useState<'refund' | 'terms'>('refund')

  const sections = activeTab === 'refund' ? REFUND_SECTIONS : TERMS_SECTIONS

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-2xl px-5 py-12">
        {/* 헤더 */}
        <header className="mb-10 border-b border-gray-200 pb-6">
          <p className="mb-1 text-xs font-medium tracking-widest text-gray-400 uppercase">KORFIT</p>
          <h1 className="text-xl font-semibold text-gray-900">이용약관 및 환불 규정</h1>
        </header>

        {/* 탭 */}
        <nav className="mb-8 flex gap-1 border-b border-gray-200">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors ${
                activeTab === tab.id ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 약관 탭 배너 */}
        {activeTab === 'terms' && <NoticeBanner />}

        {/* 섹션 목록 */}
        <main>
          {/* 환불 안내 상단 설명 */}
          {activeTab === 'refund' && (
            <p className="mb-6 text-sm leading-relaxed text-gray-500">
              본 서비스에서 판매되는 채용 팁 및 노하우는 전자상거래법상 '디지털 콘텐츠'로 분류되며, 이에 따라 다음과
              같은 환불 및 교환 규정이 적용됩니다.
            </p>
          )}

          <div>
            {sections.map((section) => (
              <SectionItem key={section.id} section={section} />
            ))}
          </div>
        </main>

        {/* 푸터 */}
        <footer className="mt-10 border-t border-gray-100 pt-6">
          <p className="text-xs text-gray-400">
            문의사항은{' '}
            <a
              href="https://pf.kakao.com/_xfxbmMX"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 transition-colors hover:text-gray-600"
            >
              고객센터(채널톡)
            </a>
            를 통해 접수해 주세요.
          </p>
        </footer>
      </div>
    </div>
  )
}
