// src/app/r/[id]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const alt = 'AIペルソナ診断結果';
export const size = {
  width: 1200,
  height: 630,
};
 
export const contentType = 'image/png';

export default async function Image({ params }: { params: { id: string } }) {
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
          background: 'linear-gradient(to bottom right, #EDE9FF, #E9F2FF, #E5FBFF)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            color: '#1a1a1a',
            marginBottom: '20px',
          }}
        >
          AIペルソナ診断
        </div>
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #7C3AED, #2563EB)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
          }}
        >
          {resultData?.type}
        </div>
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '20px',
          }}
        >
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
        <div
          style={{
            fontSize: '24px',
            color: '#4B5563',
          }}
        >
          全体の約{resultData?.percentage}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

// src/app/r/[id]/page.tsx
import { Metadata } from 'next';
import { AIPersonaQuiz } from '@/components/quiz/AIPersonaQuiz';

interface Props {
  params: { id: string }
}

const resultData = {
  developer: {
    type: "生成AI開発してる人",
    description: "AIの最前線で開発に携わる革新的な存在です。",
  },
  artist: {
    type: "生成AI活用アーティスト",
    description: "AIを創造的に活用して作品を生み出しています。",
  },
  business: {
    type: "生成AI業務効率化検討中の会社員",
    description: "ビジネスにおけるAI活用の可能性を探っています。",
  },
  explorer: {
    type: "生成AIツール体験者",
    description: "AIツールを積極的に試している探求者です。",
  },
  observer: {
    type: "生成AI様子見層",
    description: "AIの動向を注視しながら、適切なタイミングを待っています。",
  }
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = resultData[params.id as keyof typeof resultData];
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const ogImageUrl = `${baseUrl}/r/${params.id}/opengraph-image`;
  
  return {
    title: `${result?.type} | AIペルソナ診断`,
    description: result?.description,
    openGraph: {
      title: `${result?.type} | AIペルソナ診断`,
      description: result?.description,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: 'AIペルソナ診断結果',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${result?.type} | AIペルソナ診断`,
      description: result?.description,
      images: [ogImageUrl],
    },
  }
}

export default function ResultPage() {
  return <AIPersonaQuiz />;
}