import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'AIペルソナ診断'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'

export default async function og() {
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
        }}
      >
        <div tw="flex flex-col items-center justify-center">
          <h1 tw="text-[60px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            AIペルソナ診断
          </h1>
          <p tw="text-[30px] text-gray-700 mt-4">
            あなたのAIとの関わり方を診断します
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}