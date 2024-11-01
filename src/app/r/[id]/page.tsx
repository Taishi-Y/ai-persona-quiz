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
    'ai-developer': {
        type: "生成AI開発してる人",
        percentage: "0.1%",
        description: "AIの最前線で開発に携わる革新的な存在です。次世代の技術を創造しています。",
        badges: ["開発者", "イノベーター", "テクノロジスト"]
    },
    'ai-first-developer': {
        type: "生成AIファーストのプロダクト開発してる人",
        percentage: "0.5%",
        description: "AIを中心としたプロダクト開発を行っています。次世代のサービスを創造しています。",
        badges: ["開発者", "イノベーター"]
    },
    'ai-educator': {
        type: "生成AI教育者",
        percentage: "0.5%",
        description: "AI教育の最前線で活動しています。次世代のAI活用者を育成することに注力しています。",
        badges: ["教育者", "メンター"]
    },
    'ai-investor': {
        type: "生成AI投資家/アナリスト",
        percentage: "0.3%",
        description: "AI分野への投資判断や市場分析を行っています。技術と市場の未来を見据えています。",
        badges: ["アナリスト", "投資家"]
    },
    'ai-ethics': {
        type: "生成AI倫理/ガバナンス専門家",
        percentage: "0.2%",
        description: "AI倫理とガバナンスの専門家として、責任ある開発と利用を提唱しています。",
        badges: ["倫理専門家", "ガバナンス"]
    },
    'ai-community': {
        type: "生成AIコミュニティオーガナイザー",
        percentage: "0.4%",
        description: "AI関連のコミュニティを運営しています。知識と経験の共有を促進しています。",
        badges: ["オーガナイザー", "コミュニティリーダー"]
    },
    'ai-artist': {
        type: "生成AI活用アーティスト",
        percentage: "1%",
        description: "AIを創造的に活用して作品を生み出しています。新しい芸術表現の可能性を追求しています。",
        badges: ["アーティスト", "イノベーター"]
    },
    'ai-integrator': {
        type: "生成AIを既存プロダクトに組み込んでる人",
        percentage: "1%",
        description: "既存のプロダクトにAIを統合する専門家です。実用的なAI活用を推進しています。",
        badges: ["開発者", "インテグレーター"]
    },
    'ai-creator': {
        type: "生成AIコンテンツクリエイター",
        percentage: "2%",
        description: "AIを活用して新しいコンテンツを生み出しています。クリエイティビティの新境地を開拓中です。",
        badges: ["クリエイター", "イノベーター"]
    },
    'ai-product': {
        type: "生成AI活用してプロダクト開発してる人",
        percentage: "1.5%",
        description: "AIを既存のプロダクト開発に組み込んでいます。技術とビジネスの融合を追求しています。",
        badges: ["開発者", "プロダクトマネージャー"]
    },
    'ai-struggling-educator': {
        type: "生成AI対応に苦心する教育者",
        percentage: "1.5%",
        description: "教育現場でのAI活用と対応について模索しています。次世代の教育のあり方を考えています。",
        badges: ["教育者", "イノベーター"]
    },
    'ai-skeptic-artisan': {
        type: "生成AI懐疑的な職人層",
        percentage: "1.5%",
        description: "伝統的な技術とAIの関係性について慎重な立場をとっています。本質的な価値を守ろうとしています。",
        badges: ["職人", "トラディショナル"]
    },
    'ai-concerned-manager': {
        type: "生成AI導入に不安を持つ管理職",
        percentage: "2.5%",
        description: "組織へのAI導入に関して慎重に検討を重ねています。リスクと機会を見極めようとしています。",
        badges: ["マネージャー", "リスク管理"]
    },
    'ai-experimenting-creator': {
        type: "生成AI試行錯誤中のクリエイター",
        percentage: "3%",
        description: "AIをクリエイティブワークに組み込もうと挑戦中です。新しい表現方法を探求しています。",
        badges: ["クリエイター", "チャレンジャー"]
    },
    'ai-opponent': {
        type: "生成AI反対層",
        percentage: "1%",
        description: "AIの発展に反対の立場をとっています。人間中心の価値観を重視しています。",
        badges: ["クリティカルシンカー"]
    },
    'ai-concerned': {
        type: "生成AI懸念層",
        percentage: "3%",
        description: "AIの発展に対して慎重な立場を取っています。倫理的な観点から議論を重視します。",
        badges: ["シンカー", "エシカル"]
    },
    'ai-uninterested': {
        type: "生成AI関心なし層",
        percentage: "12%",
        description: "現時点ではAIへの関心が低く、従来の方法を重視しています。",
        badges: ["トラディショナル"]
    },
    'ai-student': {
        type: "生成AI時代の学生",
        percentage: "4%",
        description: "AI時代の新しい学習方法を模索しています。未来を見据えた学びを実践しています。",
        badges: ["学生", "イノベーター"]
    },
    'ai-business-user': {
        type: "生成AI業務効率化検討中の会社員",
        percentage: "8%",
        description: "ビジネスにおけるAI活用の可能性を探っています。効率化とイノベーションを追求します。",
        badges: ["ビジネスパーソン", "イノベーター"]
    },
    'ai-side-researcher': {
        type: "生成AI活用して副業で儲ける情報収集だけしてる人",
        percentage: "6%",
        description: "AIを活用した副収入の可能性を探っています。情報収集に特化しています。",
        badges: ["リサーチャー", "副業志望"]
    },
    'ai-side-business': {
        type: "生成AI活用して副業で儲けたい人",
        percentage: "5%",
        description: "AIを活用して新しい収入源を作ることを目指しています。起業家精神を持っています。",
        badges: ["アントレプレナー", "チャレンジャー"]
    },
    'ai-explorer': {
        type: "生成AIツール体験者",
        percentage: "20%",
        description: "AIツールを積極的に試している探求者です。新しい可能性を見出すことに長けています。",
        badges: ["エクスプローラー", "アーリーアダプター"]
    },
    'ai-beginner': {
        type: "生成AI初心者",
        percentage: "10%",
        description: "AIの世界に一歩を踏み出したばかり。新しい可能性に期待を寄せています。",
        badges: ["ビギナー", "チャレンジャー"]
    },
    'ai-observer': {
        type: "生成AI様子見層",
        percentage: "15%",
        description: "AIの動向を注視しながら、適切なタイミングを待っています。慎重な判断を心がけています。",
        badges: ["オブザーバー", "慎重派"]
    },
} as const;

// メタデータの生成
// メタデータの生成
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const result = resultData[resolvedParams.id as keyof typeof resultData];

    if (!result) {
        return {
            title: '生成AIペルソナ診断',
            description: 'あなたのAIペルソナを診断しましょう。',
        }
    }

    // URLパラメータをエンコード
    const ogParams = new URLSearchParams({
        type: result.type,
        description: result.description,
        badges: result.badges.join(','),
        percentage: result.percentage
    }).toString();

    return {
        title: `${result.type} | 生成AIペルソナ診断`,
        description: result.description,
        openGraph: {
            title: `${result.type} | 生成AIペルソナ診断`,
            description: result.description,
            images: [{
                url: `https://ai-persona-quiz.vercel.app/api/og?${ogParams}`,
                width: 1200,
                height: 630,
            }],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${result.type} | 生成AIペルソナ診断`,
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
    const shareText = `私は「${result.type}」タイプでした！\n\n${result.badges.map(b => `#${b}`).join(' ')}\n\n生成AIペルソナ診断で自分のタイプを確認しよう👇\n`;

    // OGP画像のURLを生成（generateMetadataと同じパラメータ形式を使用）
    const ogParams = new URLSearchParams({
        type: result.type,
        description: result.description,
        badges: result.badges.join(','),
        percentage: result.percentage
    }).toString();
    
    const ogImage = `https://ai-persona-quiz.vercel.app/api/og?${ogParams}`;

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