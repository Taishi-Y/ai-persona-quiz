import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};
export const alt = 'AIペルソナ診断結果';

export default async function Image({ params }: { params: { id: string } }) {
  try {
    const resultData = {
      developer: {
        type: "生成AI開発してる人",
        percentage: "0.1%",
        badges: ["開発者", "イノベーター", "テクノロジスト"]
      },
      artist: {
        type: "生成AI活用アーティスト",
        percentage: "1%",
        badges: ["クリエイター", "アーティスト", "イノベーター"]
      },
      business: {
        type: "生成AI業務効率化検討中の会社員",
        percentage: "8%",
        badges: ["ビジネスパーソン", "イノベーター"]
      },
      explorer: {
        type: "生成AIツール体験者",
        percentage: "20%",
        badges: ["エクスプローラー", "アーリーアダプター"]
      },
      observer: {
        type: "生成AI様子見層",
        percentage: "15%",
        badges: ["オブザーバー"]
      }
    }[params.id];

    return new ImageResponse(
      (
        <div
          style={{
            background: 'white',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: 'linear-gradient(to bottom right, #EDE9FF, #E9F2FF, #E5FBFF)',
          }}
        >
          <div style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '20px' }}>
            AIペルソナ診断
          </div>
          <div style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#7C3AED',
            marginBottom: '20px',
          }}>
            {resultData?.type}
          </div>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            {resultData?.badges.map((badge, index) => (
              <div
                key={index}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#EEF2FF',
                  color: '#4F46E5',
                  borderRadius: '9999px',
                  fontSize: '24px',
                }}
              >
                {badge}
              </div>
            ))}
          </div>
          <div style={{ fontSize: '24px', color: '#4B5563' }}>
            全体の約{resultData?.percentage}
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'content-type': 'image/png',
          'cache-control': 'public, max-age=31536000, immutable',
        },
      }
    );
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
} 