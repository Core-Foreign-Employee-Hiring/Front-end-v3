import { I18nParams } from '@/lib/i18n.types'
import { Header, Label, PageLayout, Spacing } from '@/components/common'
import React from 'react'
import ModifyId from '@/components/mypage/change-auth/ModifyId'
import ModifyPW from '@/components/mypage/change-auth/ModifyPW'
import SideBar from '@/components/mypage/SideBar'
import Footer from '@/components/common/Footer'
import NavBar from '@/components/common/NavBar'
import ChangeAuthSwitchButton from '@/components/mypage/change-auth/ChangeAuthSwitchButton'
import BottomButton from '@/components/mypage/change-auth/BottomButton'

type SearchType = 'id' | 'pw'

/**
 * 'step' 에 따라 올바른 컴포넌트를 반환하는 스위처 컴포넌트
 */
function FindAccountProcessStepSwitcher({ type }: { type: SearchType }) {
  if (type === 'id') return <ModifyId />
  if (type === 'pw') return <ModifyPW />

  return <ModifyId />
}

export default async function MyPageChangeAuthPage({
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

  const type = (rawType === 'pw' ? 'pw' : 'id') as SearchType

  return (
    <main>
      <Header headerType={'default'} currentLng={lang} />
      <PageLayout>
        <Label className={'desktop:block hidden'} label={'마이페이지'} type={'titleLg'} />
        <Spacing className={'desktop:block tablet:block hidden'} height={16} />
        <div className="flex gap-x-[32px]">
          <SideBar lang={lang} />
          <div className="flex w-full flex-col gap-y-4">
            <Label label={'아이디 / 비밀번호 변경'} type={'titleMd'} />
            <ChangeAuthSwitchButton type={type} />

            {/* 본문 */}
            <FindAccountProcessStepSwitcher type={type} />

            <BottomButton type={type} />
            <Spacing height={250} />
          </div>
        </div>
      </PageLayout>
      <Footer />
      <Spacing height={80} className="desktop:hidden" />
      <NavBar path={`/${lang}/mypage`} lang={lang} />
    </main>
  )
}
