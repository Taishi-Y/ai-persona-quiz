import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const type = searchParams.type as string
  const description = searchParams.description as string

  if (!type) {
    redirect('/')
  }

  const ogImage = `/api/og?` + new URLSearchParams({
    type,
    description,
    badges: searchParams.badges as string
  }).toString()

  return {
    title: `${type} | AIペルソナ診断`,
    description: description,
    openGraph: {
      title: `${type} | AIペルソナ診断`,
      description: description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@taishi_jade',
      images: [ogImage],
    },
  }
}

export default function ResultPage() {
  // 結果表示用のコンポーネントをここに実装
}