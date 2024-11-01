import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = '生成AIペルソナ診断'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* 装飾的な背景要素 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(99,102,241,0.15) 0%, transparent 20%),
            radial-gradient(circle at 90% 80%, rgba(124,58,237,0.15) 0%, transparent 20%),
            radial-gradient(circle at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 50%)
          `,
          zIndex: 1,
        }} />

        {/* メインコンテンツコンテナ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2,
            padding: '60px',
          }}
        >
          {/* タイトル */}
          <div
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #818CF8, #C084FC)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '32px',
              textAlign: 'center',
            }}
          >
            AIペルソナ診断
          </div>

          {/* サブタイトル */}
          <div
            style={{
              fontSize: 32,
              color: '#FFFFFF',
              opacity: 0.9,
              marginBottom: '48px',
              textAlign: 'center',
            }}
          >
            あなたのAIとの関わり方を診断します
          </div>

          {/* 特徴タグ */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '48px',
            }}
          >
            {['簡単診断', '即時結果', '共有可能'].map((feature, i) => (
              <div
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '999px',
                  padding: '12px 24px',
                  color: '#FFFFFF',
                  fontSize: 24,
                }}
              >
                {feature}
              </div>
            ))}
          </div>

          {/* ペルソナ例 */}
          <div
            style={{
              display: 'flex',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            {['開発者', 'アーティスト', 'ビジネス'].map((type, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(124,58,237,0.2) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '16px 24px',
                  color: '#FFFFFF',
                  fontSize: 20,
                  opacity: 0.8,
                }}
              >
                {type}タイプ
              </div>
            ))}
          </div>

          {/* フッター */}
          <div
            style={{
              position: 'absolute',
              bottom: '30px',
              fontSize: 20,
              color: '#FFFFFF',
              opacity: 0.6,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            Created by @taishi_jade
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  )
}