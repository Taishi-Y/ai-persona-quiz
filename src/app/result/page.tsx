import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type SearchParams = Promise<{
  type?: string | string[];
  description?: string | string[];
  badges?: string | string[];
  [key: string]: string | string[] | undefined;
}>

type Props = {
  params: Promise<Record<string, never>>;
  searchParams: SearchParams;
}

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const params = await searchParams;
  const type = (Array.isArray(params.type) ? params.type[0] : params.type) || 'AIペルソナ診断';
  const description = (Array.isArray(params.description) ? params.description[0] : params.description) || 'あなたのAIとの関わり方を診断します';

  if (!type) {
    redirect('/')
  }

  return {
    title: `${type} | AIペルソナ診断`,
    description: description,
    openGraph: {
      title: `${type} | AIペルソナ診断`,
      description: description,
      images: [
        {
          url: `/result/opengraph-image?type=${encodeURIComponent(type)}&description=${encodeURIComponent(description)}&badges=${params.badges || ''}`,
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      creator: '@taishi_jade',
    },
  }
}

export default async function ResultPage({
  searchParams,
}: Props) {
  const params = await searchParams;
  if (!params.type) {
    redirect('/')
  }
  return null;
}