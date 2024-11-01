import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type') ?? 'AIペルソナ診断';
  const description = searchParams.get('description') ?? 'あなたのAIとの関わり方を診断します';
  const badges = searchParams.get('badges')?.split(',') ?? [];
  const percentage = searchParams.get('percentage') ?? '??%';
  
  try {
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
            background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)',
            position: 'relative',
          }}
        >
          {/* 背景グラデーション */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 10% 20%, rgba(99,102,241,0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(124,58,237,0.15) 0%, transparent 20%)',
          }} />

          {/* メインコンテンツ */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              padding: '60px',
              width: '100%',
            }}
          >
            {/* ヘッダー */}
            <div style={{
              display: 'flex',
              background: 'rgba(255,255,255,0.1)',
              padding: '12px 24px',
              borderRadius: '999px',
              border: '1px solid rgba(255,255,255,0.2)',
            }}>
              {/* spanをdivに変更 */}
              <div style={{
                fontSize: 28,
                color: '#FFFFFF',
                opacity: 0.9,
              }}>
                AIペルソナ診断結果
              </div>
            </div>

            {/* メインタイトル */}
            <div style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #818CF8, #C084FC)',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center',
            }}>
              {type}
            </div>

            {/* パーセンテージ */}
            <div style={{
              display: 'flex',
              fontSize: 36,
              color: '#FFFFFF',
              opacity: 0.8,
            }}>
              全体の約{percentage}
            </div>

            {/* バッジコンテナ */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '800px',
            }}>
              {badges.map((badge, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    background: 'linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(124,58,237,0.2) 100%)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#FFFFFF',
                    padding: '12px 24px',
                    borderRadius: '999px',
                    fontSize: 24,
                  }}
                >
                  {badge}
                </div>
              ))}
            </div>

            {/* 説明文 */}
            <div style={{
              display: 'flex',
              fontSize: 28,
              color: '#FFFFFF',
              opacity: 0.8,
              textAlign: 'center',
              maxWidth: '800px',
            }}>
              {description}
            </div>
          </div>

          {/* フッター */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            display: 'flex',
            alignItems: 'center',
          }}>
            <div style={{
              fontSize: 20,
              color: '#FFFFFF',
              opacity: 0.6,
            }}>
              Created by @taishi_jade
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      }
    )
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
}