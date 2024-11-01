import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const contentType = 'image/png'

export const size = {
  width: 1200,
  height: 630,
}

type SearchParams = {
  type?: string
  description?: string
  badges?: string
}

export default function Image({ searchParams }: { searchParams: SearchParams }) {
  const type = searchParams.type as string || 'AIペルソナ診断';
  const description = searchParams.description as string || 'あなたのAIとの関わり方を診断します';
  const badges = (searchParams.badges as string || '').split(',').filter(Boolean);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: 'linear-gradient(to bottom right, #EEF2FF, #E0E7FF)',
          padding: '40px',
        }}
      >
        <div tw="flex flex-col items-center justify-center">
          <div tw="text-[32px] text-gray-600 mb-4">診断結果</div>
          <h1 tw="text-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-6">
            {type}
          </h1>
          <p tw="text-[24px] text-gray-700 text-center max-w-[800px] mb-8">
            {description}
          </p>
          <div tw="flex flex-wrap gap-4 justify-center">
            {badges.map((badge, i) => (
              <span
                key={i}
                tw="px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-[20px]"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}