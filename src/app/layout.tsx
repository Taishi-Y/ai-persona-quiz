// layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://ai-persona-quiz.vercel.app'), // あなたのドメインに変更
  title: '生成AIペルソナ診断',
  description: 'あなたのAIとの関わり方を診断します',
  openGraph: {
    type: 'website',
    url: 'https://ai-persona-quiz.vercel.app',
    title: '生成AIペルソナ診断',
    description: 'あなたのAIとの関わり方を診断します',
    images: [
      {
        url: '/opengraph-image?result=あなたの診断結果', // クエリパラメータを追加
        width: 1200,
        height: 630,
        alt: 'AIペルソナ診断',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@taishi_jade',
    creator: '@taishi_jade',
    title: '生成AIペルソナ診断',
    description: 'あなたのAIとの関わり方を診断します',
    images: 'https://ai-persona-quiz.vercel.app/opengraph-image', // 絶対URLに変更
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <head>
        <title>AIペルソナ診断</title>
        <meta property="og:title" content="生成AIペルソナ診断" />
        <meta property="og:description" content="あなたのAIとの関わり方を診断します" />


        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
        <meta property="og:image:alt" content="生成AIペルソナ診断" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@taishi_jade" />
        <meta name="twitter:creator" content="@taishi_jade" />
        <meta name="twitter:title" content="生成AIペルソナ診断" />
        <meta name="twitter:description" content="あなたのAIとの関わり方を診断します" />
        <meta name="twitter:image" content="<generated>" />
        <meta name="twitter:image:type" content="<generated>" />
        <meta name="twitter:image:width" content="<generated>" />
        <meta name="twitter:image:height" content="<generated>" />

        <meta property="twitter:image:alt" content="生成AIペルソナ診断" />

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
