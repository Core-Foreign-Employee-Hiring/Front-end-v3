interface MyPageProps {
  params: Promise<{ lang: string }>
}

export default async function MyPage({ params }: MyPageProps) {
  const { lang } = await params
  return <main className="w-full"></main>
}
