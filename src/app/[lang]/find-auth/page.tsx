import React from 'react'
import { I18nParams } from '@/lib/i18n.types'

import Header from '@/components/common/Header'
import { Label, PageLayout, Spacing } from '@/components/common'
import FindAuthSwitchButton from '@/components/auth/find-auth/FindAuthSwitchButton'
import { LogoIcon } from '@/assets/svgComponents'
import IdProcess from '@/components/auth/find-auth/id/IdProcess'
import IdResult from '@/components/auth/find-auth/id/IdResult'
import PassWordProcess from '@/components/auth/find-auth/password/PassWordProcess'
import PassWordResult from '@/components/auth/find-auth/password/PassWordResult'

type StepType = '1' | '2'
type SearchType = 'id' | 'pw'

/**
 * 'step' 에 따라 올바른 컴포넌트를 반환하는 스위처 컴포넌트
 */
function FindAccountProcessStepSwitcher({ type, step }: { step: StepType; type: SearchType }) {
  if (type === 'id') {
    if (step === '1') return <IdProcess step={step} />
    if (step === '2') return <IdResult step={step} />
  }
  if (type === 'pw') {
    if (step === '1') return <PassWordProcess />
    if (step === '2') return <PassWordResult />
  }

  return <IdProcess step={step} />
}

export default async function FindAccountProcessPage({
  searchParams,
  params,
}: {
  params: Promise<I18nParams>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { lang } = await params
  const resolvedSearchParams = await searchParams
  // URL에 진짜로 "undefined"라는 글자가 올 경우를 대비해 처리
  const rawType = resolvedSearchParams.type
  const rawStep = resolvedSearchParams.step

  const type = (rawType === 'pw' ? 'pw' : 'id') as SearchType
  const step = (rawStep === '2' ? '2' : '1') as StepType

  return (
    <main className="desktop:items-center desktop:justify-center flex min-h-screen w-full flex-col">
      <div className="desktop:hidden block">
        <Header headerType={'dynamic'} currentLng={lang} title={type === 'id' ? '아이디 찾기' : '비밀번호 찾기'} />
      </div>
      <PageLayout className={'desktop:w-[600px]'}>
        {/* 메뉴바 */}
        <div className="desktop:items-center desktop:justify-center flex flex-col gap-y-5">
          <div className="desktop:flex hidden flex-col items-center justify-center gap-y-[80px]">
            <LogoIcon width={193} height={60} />
            <Label label={'아이디 찾기'} type={'titleLg'} />
          </div>

          <FindAuthSwitchButton type={type} />
        </div>

        <Spacing height={40} />
        {/* 본문 */}
        <FindAccountProcessStepSwitcher step={step} type={type} />
      </PageLayout>
    </main>
  )
}
