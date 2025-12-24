import Header from '@/components/common/Header'

interface HomeProps {
  params: Promise<{ lang: string }>
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params
  return (
    <main>
      <Header headerType={'default'} currentLng={lang}></Header>
    </main>
  )
}
