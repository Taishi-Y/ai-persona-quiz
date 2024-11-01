// src/app/r/[id]/page.tsx
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Share2 } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import ShareButton from '@/app/components/ShareButton';

type Params = Promise<{ id: string }>

interface Props {
    params: Params
}

// 結果データの定義
const resultData = {
    developer: {
        type: "生成AI開発してる人",
        percentage: "0.1%",
        description: "AIの最前線で開発に携わる革新的な存在です。",
        badges: ["開発者", "イノベーター", "テクノロジスト"]
    },
    artist: {
        type: "生成AI活用アーティスト",
        percentage: "1%",
        description: "AIを創造的に活用して作品を生み出しています。",
        badges: ["クリエイター", "アーティスト", "イノベーター"]
    },
    business: {
        type: "生成AI業務効率化検討中の会社員",
        percentage: "8%",
        description: "ビジネスにおけるAI活用の可能性を探っています。",
        badges: ["ビジネスパーソン", "イノベーター"]
    },
    explorer: {
        type: "生成AIツール体験者",
        percentage: "20%",
        description: "AIツールを積極的に試している探求者です。",
        badges: ["エクスプローラー", "アーリーアダプター"]
    },
    observer: {
        type: "生成AI様子見層",
        percentage: "15%",
        description: "AIの動向を注視しながら、適切なタイミングを待っています。",
        badges: ["オブザーバー"]
    }
} as const;

// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const result = resultData[resolvedParams.id as keyof typeof resultData];

    if (!result) {
        return {
            title: 'AIペルソナ診断',
            description: 'あなたのAIペルソナを診断しましょう。',
        }
    }

    return {
        title: `${result.type} | AIペルソナ診断`,
        description: result.description,
        openGraph: {
            title: `${result.type} | AIペルソナ診断`,
            description: result.description,
            images: [{
                url: `https://ai-persona-quiz.vercel.app/api/og?type=${result.type}`,
                width: 1200,
                height: 630,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${result.type} | AIペルソナ診断`,
            description: result.description,
        },
    }
}

export default async function ResultPage({ params }: Props) {
    const resolvedParams = await params;
    const result = resultData[resolvedParams.id as keyof typeof resultData];

    // 無効なIDの場合はトップページにリダイレクト
    if (!result) {
        redirect('/');
    }

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${resolvedParams.id}`;
    const shareText = `私は「${result.type}」タイプでした！\n\n${result.badges.map(b => `#${b}`).join(' ')}\n\nAIペルソナ診断で自分のタイプを確認しよう👇\n`;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const ogImage = `https://ai-persona-quiz.vercel.app/api/og?title=${result.type}`;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4 flex flex-col items-center justify-center">
            <Card className="w-full max-w-md bg-white/80 backdrop-blur-lg shadow-xl border-0">
                <CardContent className="p-8">
                    <div className="text-center">
                        <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm mt-8 mb-8">
                            診断完了！
                        </div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            {result.type}
                        </h2>
                        <div className="text-sm text-gray-600 mb-4">全体の約{result.percentage}</div>
                        <div className="flex gap-2 justify-center flex-wrap mb-6">
                            {result.badges.map((badge, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium"
                                >
                                    {badge}
                                </span>
                            ))}
                        </div>
                        <p className="text-gray-700 mb-8">{result.description}</p>
                        <div className="flex gap-3 justify-center">
                            <ShareButton url={shareUrl} text={shareText} />
                        </div>
                        <div className="mt-8">
                            <Link
                                href="/"
                                className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                            >
                                → 診断をやり直す
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <a
                href="https://x.com/taishi_jade"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm text-gray-600 hover:text-gray-800 transition-colors"
            >
                Created by @taishi_jade
            </a>
        </div>
    );
}