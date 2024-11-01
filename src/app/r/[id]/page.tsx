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
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const result = resultData[params.id as keyof typeof resultData];
  
  return {
    title: `${result?.type} | AIペルソナ診断`,
    description: result?.description,
    openGraph: {
      title: `${result?.type} | AIペルソナ診断`,
      description: result?.description,
      images: [`/r/${params.id}/opengraph-image`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${result?.type} | AIペルソナ診断`,
      description: result?.description,
      images: [`/r/${params.id}/opengraph-image`],
    },
  }
}

export default function ResultPage() {
  return <AIPersonaQuiz />;
}