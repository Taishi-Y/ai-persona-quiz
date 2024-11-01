// src/app/r/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const contentType = 'image/png';
export const size = { width: 1200, height: 630 };
export const alt = 'AIペルソナ診断結果';

export default async function og({ params }: { params: { id: string } }) {
  const resultData = {
    developer: {
      type: "生成AI開発してる人",
      percentage: "0.1%",
      badges: ["開発者", "イノベーター", "テクノロジスト"],
      gradient: "from-blue-600 to-purple-600"
    },
    artist: {
      type: "生成AI活用アーティスト",
      percentage: "1%",
      badges: ["クリエイター", "アーティスト", "イノベーター"],
      gradient: "from-pink-600 to-purple-600"
    },
    business: {
      type: "生成AI業務効率化検討中の会社員",
      percentage: "8%",
      badges: ["ビジネスパーソン", "イノベーター"],
      gradient: "from-blue-600 to-green-600"
    },
    explorer: {
      type: "生成AIツール体験者",
      percentage: "20%",
      badges: ["エクスプローラー", "アーリーアダプター"],
      gradient: "from-purple-600 to-blue-600"
    },
    observer: {
      type: "生成AI様子見層",
      percentage: "15%",
      badges: ["オブザーバー"],
      gradient: "from-gray-600 to-blue-600"
    }
  }[params.id];

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #1a1a1a, #2a2a2a)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          position: 'relative',
        }}
      >
        {/* 背景の装飾パターン */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.03) 0%, transparent 20%)',
          }}
        />
        
        {/* ロゴ的な要素 */}
        <div
          style={{
            fontSize: '28px',
            color: '#ffffff',
            opacity: 0.9,
            marginBottom: '30px',
            padding: '8px 24px',
            border: '2px solid rgba(255,255,255,0.1)',
            borderRadius: '99999px',
          }}
        >
          AIペルソナ診断
        </div>

        {/* メインの結果表示 */}
        <div
          style={{
            fontSize: '56px',
            fontWeight: 'bold',
            color: '#ffffff',
            textAlign: 'center',
            marginBottom: '30px',
            lineHeight: 1.2,
          }}
        >
          {resultData?.type}
        </div>

        {/* バッジエリア */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
            maxWidth: '800px',
          }}
        >
          {resultData?.badges.map((badge, index) => (
            <div
              key={index}
              style={{
                padding: '8px 20px',
                background: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                borderRadius: '99999px',
                fontSize: '24px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {badge}
            </div>
          ))}
        </div>

        {/* 割合表示 */}
        <div
          style={{
            fontSize: '32px',
            color: '#ffffff',
            opacity: 0.8,
          }}
        >
          全体の約{resultData?.percentage}
        </div>

        {/* フッター */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '20px',
            color: '#ffffff',
            opacity: 0.6,
          }}
        >
          @taishi_jade
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable'
      }
    }
  );
}