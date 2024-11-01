'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Share2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

// 結果タイプからIDを生成する関数
const getResultId = (resultType: string): string => {
  const typeToId: Record<string, string> = {
    "生成AI開発してる人": "ai-developer",
    "生成AIファーストのプロダクト開発してる人": "ai-first-developer",
    "生成AI教育者": "ai-educator",
    "生成AI投資家/アナリスト": "ai-investor",
    "生成AI倫理/ガバナンス専門家": "ai-ethics",
    "生成AIコミュニティオーガナイザー": "ai-community",
    "生成AI活用アーティスト": "ai-artist",
    "生成AIを既存プロダクトに組み込んでる人": "ai-integrator",
    "生成AIコンテンツクリエイター": "ai-creator",
    "生成AI活用してプロダクト開発してる人": "ai-product",
    "生成AI対応に苦心する教育者": "ai-struggling-educator",
    "生成AI懐疑的な職人層": "ai-skeptic-artisan",
    "生成AI導入に不安を持つ管理職": "ai-concerned-manager",
    "生成AI試行錯誤中のクリエイター": "ai-experimenting-creator",
    "生成AI反対層": "ai-opponent",
    "生成AI懸念層": "ai-concerned",
    "生成AI関心なし層": "ai-uninterested",
    "生成AI時代の学生": "ai-student",
    "生成AI業務効率化検討中の会社員": "ai-business-user",
    "生成AI活用して副業で儲ける情報収集だけしてる人": "ai-side-researcher",
    "生成AI活用して副業で儲けたい人": "ai-side-business",
    "生成AIツール体験者": "ai-explorer",
    "生成AI初心者": "ai-beginner",
    "生成AI様子見層": "ai-observer"
  };

  return typeToId[resultType] || 'general';
};

const categories = {
  attitude: {
    questions: [
      "生成AIは人類の進歩に貢献すると思いますか？",
      "生成AIの利用には規制が必要だと思いますか？", // 逆転項目
      "生成AIの進歩のスピードは適切だと思いますか？",
      "生成AIと人間は共存できると思いますか？"
    ]
  },
  experience: {
    questions: [
      "過去1ヶ月以内に3回以上生成AIを使用しましたか？",
      "生成AI関連のイベントやコミュニティに所属していますか？",
      "職場や学校で生成AIを活用していますか？",
      "ChatGPT以外の生成AIも使用していますか？"
    ]
  },
  technical: {
    questions: [
      "APIを使って生成AIを利用したことがありますか？",
      "プロンプトエンジニアリングの知識がありますか？",
      "生成AIモデルの仕組みを他人に説明できますか？",
      "生成AIを使ったアプリやサービスを開発したことがありますか？"
    ]
  },
  creative: {
    questions: [
      "生成AIを使って収益化できる作品を作ったことがありますか？",
      "生成AIと協働して作品制作のワークフローを確立していますか？",
      "生成AIを使った独自の表現技法を確立していますか？",
      "生成AIを使った作品を継続的に発表していますか？"
    ]
  },
  business: {
    questions: [
      "生成AI関連の具体的な収益計画がありますか？",
      "生成AIを活用した事業を立ち上げていますか？",
      "生成AI関連の市場調査や競合分析をしていますか？",
      "生成AIを使った製品やサービスに投資していますか？"
    ]
  }
};

interface QuizResult {
  type: string;
  percentage: string;
  description: string;
  badges: string[];
}

const calculatePersona = (scores: Record<string, number>): QuizResult => {
  const attitudeScore = scores.attitude || 0;
  const expScore = scores.experience || 0;
  const techScore = scores.technical || 0;
  const creativeScore = scores.creative || 0;
  const businessScore = scores.business || 0;

  // スコアの重み付け合計を計算
  const totalWeightedScore = (
    attitudeScore * 1.0 +
    expScore * 1.2 +
    techScore * 1.5 +
    creativeScore * 1.3 +
    businessScore * 1.4
  ) / 6.4; // 正規化

  // 否定的な態度スコアを計算 (attitudeScoreの逆数)
  const negativeAttitude = 1 - attitudeScore;

  // 各ペルソナの判定条件を厳格化
  if (techScore > 0.95 && expScore > 0.9 && businessScore > 0.8) {
    return {
      type: "生成AI開発してる人",
      percentage: "0.1%",
      description: "最先端のAI開発に携わり、技術革新を牽引しています。",
      badges: ["開発者", "イノベーター", "エンジニア"]
    };
  }

  if (techScore > 0.85 && businessScore > 0.85 && expScore > 0.8) {
    return {
      type: "生成AIファーストのプロダクト開発してる人",
      percentage: "0.5%",
      description: "AIを核として新しいプロダクトを開発しています。",
      badges: ["開発者", "起業家", "イノベーター"]
    };
  }

  if (expScore > 0.9 && attitudeScore > 0.85 && techScore > 0.6) {
    return {
      type: "生成AI教育者",
      percentage: "0.5%",
      description: "AI技術の教育と普及に貢献しています。",
      badges: ["教育者", "メンター", "インフルエンサー"]
    };
  }

  if (businessScore > 0.9 && expScore > 0.8 && attitudeScore > 0.7) {
    return {
      type: "生成AI投資家/アナリスト",
      percentage: "0.3%",
      description: "AI市場を分析し投資機会を見出しています。",
      badges: ["投資家", "アナリスト", "ストラテジスト"]
    };
  }

  if (expScore > 0.85 && attitudeScore > 0.8 && techScore > 0.6) {
    return {
      type: "生成AI倫理/ガバナンス専門家",
      percentage: "0.2%",
      description: "AI技術の倫理的な発展を導いています。",
      badges: ["専門家", "アドバイザー", "エシシスト"]
    };
  }

  if (expScore > 0.85 && businessScore > 0.7 && attitudeScore > 0.8) {
    return {
      type: "生成AIコミュニティオーガナイザー",
      percentage: "0.4%",
      description: "AI技術のコミュニティを育成・運営しています。",
      badges: ["オーガナイザー", "リーダー", "コネクター"]
    };
  }

  if (creativeScore > 0.9 && expScore > 0.8 && attitudeScore > 0.7) {
    return {
      type: "生成AI活用アーティスト",
      percentage: "1%",
      description: "AIを使って革新的な作品を生み出しています。",
      badges: ["アーティスト", "クリエイター", "イノベーター"]
    };
  }

  if (techScore > 0.8 && businessScore > 0.8 && expScore > 0.7) {
    return {
      type: "生成AIを既存プロダクトに組み込んでる人",
      percentage: "1%",
      description: "既存製品にAIを統合して価値を高めています。",
      badges: ["開発者", "プロダクトマネージャー", "イノベーター"]
    };
  }

  // 以下、他の条件は少し緩和して残りの割合を適切に分散
  if (creativeScore > 0.8 && businessScore > 0.7 && expScore > 0.6) {
    return {
      type: "生成AIコンテンツクリエイター",
      percentage: "2%",
      description: "AIを活用したコンテンツ制作で収益を上げています。",
      badges: ["クリエイター", "起業家", "インフルエンサー"]
    };
  }

  if (techScore > 0.6 && businessScore > 0.7) {
    return {
      type: "生成AI活用してプロダクト開発してる人",
      percentage: "1.5%",
      description: "AIを活用して新しい製品やサービスを開発しています。",
      badges: ["開発者", "起業家", "プロダクトマネージャー"]
    };
  }

  if (expScore > 0.6 && negativeAttitude > 0.7) {
    return {
      type: "生成AI対応に苦心する教育者",
      percentage: "1.5%",
      description: "教育現場でのAI対応に取り組んでいます。",
      badges: ["教育者", "チャレンジャー", "アダプター"]
    };
  }

  if (creativeScore > 0.6 && negativeAttitude > 0.6) {
    return {
      type: "生成AI懐疑的な職人層",
      percentage: "1.5%",
      description: "伝統的な技術とAIの関係を模索しています。",
      badges: ["職人", "トラディショナリスト", "スキルド"]
    };
  }

  if (businessScore > 0.7 && negativeAttitude > 0.5) {
    return {
      type: "生成AI導入に不安を持つ管理職",
      percentage: "2.5%",
      description: "AI導入のリスクとベネフィットを慎重に検討しています。",
      badges: ["マネージャー", "デシジョンメーカー", "アナリスト"]
    };
  }

  if (creativeScore > 0.7) {
    return {
      type: "生成AI試行錯誤中のクリエイター",
      percentage: "3%",
      description: "AIを使った新しい表現方法を探求しています。",
      badges: ["クリエイター", "エクスペリメンター", "アーティスト"]
    };
  }

  if (negativeAttitude > 0.8) {
    return {
      type: "生成AI反対層",
      percentage: "1%",
      description: "AI技術の普及に警鐘を鳴らしています。",
      badges: ["クリティカルシンカー", "アクティビスト"]
    };
  }

  if (negativeAttitude > 0.7) {
    return {
      type: "生成AI懸念層",
      percentage: "3%",
      description: "AI技術の影響を懸念しています。",
      badges: ["オブザーバー", "クリティカルシンカー"]
    };
  }

  if (expScore < 0.2) {
    return {
      type: "生成AI関心なし層",
      percentage: "12%",
      description: "現時点ではAIへの関心が低い状態です。",
      badges: ["トラディショナル", "オブザーバー"]
    };
  }

  if (attitudeScore > 0.6 && expScore > 0.4) {
    return {
      type: "生成AI時代の学生",
      percentage: "4%",
      description: "AI時代に適応しながら学びを深めています。",
      badges: ["スチューデント", "ラーナー", "チャレンジャー"]
    };
  }

  if (businessScore > 0.6 && expScore > 0.5) {
    return {
      type: "生成AI業務効率化検討中の会社員",
      percentage: "8%",
      description: "業務へのAI導入を積極的に検討しています。",
      badges: ["ビジネスパーソン", "イノベーター"]
    };
  }

  if (businessScore > 0.7 && expScore < 0.4) {
    return {
      type: "生成AI活用して副業で儲ける情報収集だけしてる人",
      percentage: "6%",
      description: "AI活用による副収入の可能性を探っています。",
      badges: ["アスピラント", "リサーチャー"]
    };
  }

  if (businessScore > 0.5 && expScore > 0.3) {
    return {
      type: "生成AI活用して副業で儲けたい人",
      percentage: "5%",
      description: "AI活用による副業にチャレンジしようとしています。",
      badges: ["チャレンジャー", "アントレプレナー"]
    };
  }

  if (expScore > 0.6) {
    return {
      type: "生成AIツール体験者",
      percentage: "20%",
      description: "様々なAIツールを積極的に試しています。",
      badges: ["エクスプローラー", "アーリーアダプター"]
    };
  }

  if (expScore > 0.3) {
    return {
      type: "生成AI初心者",
      percentage: "10%",
      description: "AIツールの利用を始めたばかりです。",
      badges: ["ビギナー", "チャレンジャー"]
    };
  }

  return {
    type: "生成AI様子見層",
    percentage: "15%",
    description: "AIの動向を注視しながら、様子を見ています。",
    badges: ["オブザーバー", "ウォッチャー"]
  };
};

const AIPersonaQuiz = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('attitude');
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // アニメーション用のstate
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [currentQuestionText, setCurrentQuestionText] = useState(
    categories[currentCategory as keyof typeof categories].questions[currentQuestionIndex]
  );

  // スマートフォンでのスクロールを防止
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.addEventListener('touchmove', preventDefault, { passive: false });
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  const currentQuestions = categories[currentCategory as keyof typeof categories].questions;
  const totalQuestions = Object.values(categories).reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = answers.length;

  const handleAnswer = useCallback((answer: boolean) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setSlideDirection(answer ? 'right' : 'left');
    
    setTimeout(() => {
      const newAnswers = [...answers, answer];
      setAnswers(newAnswers);
      
      if (currentQuestionIndex < currentQuestions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        const categoryScore = newAnswers.slice(-currentQuestions.length).filter(a => a).length / currentQuestions.length;
        const newScores = { ...categoryScores, [currentCategory]: categoryScore };
        setCategoryScores(newScores);
        
        const categoryKeys = Object.keys(categories);
        const currentIndex = categoryKeys.indexOf(currentCategory);
        const nextCategory = categoryKeys[currentIndex + 1];
        
        if (nextCategory) {
          setCurrentCategory(nextCategory);
          setCurrentQuestionIndex(0);
        } else {
          setResult(calculatePersona(newScores));
          return;
        }
      }

      setTimeout(() => {
        const nextQuestionText = currentQuestionIndex < currentQuestions.length - 1
          ? currentQuestions[currentQuestionIndex + 1]
          : categories[Object.keys(categories)[Object.keys(categories).indexOf(currentCategory) + 1] as keyof typeof categories]?.questions[0];
        
        setCurrentQuestionText(nextQuestionText);
        setSlideDirection(null);
        setIsTransitioning(false);
        setOffsetX(0);
      }, 50);
    }, 300);
  }, [answers, currentQuestionIndex, currentQuestions, currentCategory, categoryScores, isTransitioning]);

  const handleStart = (clientX: number) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || isTransitioning) return;
    const offset = clientX - startX;
    setOffsetX(offset);
  };

  const handleEnd = useCallback(() => {
    if (!isDragging || isTransitioning) return;
    setIsDragging(false);
    if (Math.abs(offsetX) > 100) {
      handleAnswer(offsetX > 0);
    }
    setOffsetX(0);
  }, [isDragging, offsetX, handleAnswer, isTransitioning]);

  const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  const handleTouchStart = (e: React.TouchEvent) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) => handleMove(e.touches[0].clientX);
  const handleTouchEnd = () => handleEnd();

  useEffect(() => {
    const handleMouseLeave = () => handleEnd();
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [handleEnd]);

  const shareToX = () => {
    if (!result) return;
    
    const resultId = getResultId(result.type);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/+$/, '');
    const shareUrl = `${baseUrl}/r/${resultId}`;
    const shareText = `私は「${result.type}」タイプでした！\n\n#生成AIペルソナ診断\n\n生成AIペルソナ診断で自分のタイプを確認しよう👇\n`;
    
    const twitterUrl = `https://twitter.com/intent/tweet?` + new URLSearchParams({
      text: shareText,
      url: shareUrl,
      via: 'taishi_jade',
    }).toString();
    
    window.open(twitterUrl, '_blank');
  };

  if (result) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden">
        <div className="h-full w-full flex flex-col items-center justify-center px-4">
          <Card className="w-full max-w-xl bg-white/80 backdrop-blur-lg shadow-xl border-0">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm mt-4 mb-6">
                  診断完了！
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
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
                <p className="text-gray-700 mb-6 text-sm">{result.description}</p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={shareToX}
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white transform transition-all duration-200 hover:scale-105"
                  >
                    <Share2 className="w-4 h-4 mr-2" />Share on X
                  </Button>
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
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 overflow-hidden">
      <div className="h-full w-full flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-xl mx-auto">
          <div className="mb-8 text-center">
            <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
              Question {answeredQuestions + 1} / {totalQuestions}
            </div>
          </div>
          
          <div className="relative">
            <Card
              ref={cardRef}
              className={`w-full bg-white/80 backdrop-blur-lg shadow-xl border-0 cursor-grab active:cursor-grabbing transition-all duration-300 transform
                ${isTransitioning ? (
                  slideDirection === 'right' 
                    ? 'translate-x-full opacity-0 rotate-12' 
                    : '-translate-x-full opacity-0 -rotate-12'
                ) : ''}`}
              style={{
                transform: isDragging 
                  ? `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)` 
                  : undefined
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <CardContent className="p-6">
              <div className="min-h-[160px] flex flex-col justify-between">
                  <div className="flex items-center justify-center flex-1 mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 text-center opacity-100 transition-opacity duration-300">
                      {currentQuestionText}
                    </h2>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className={`transition-opacity duration-200 ${offsetX < -50 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="flex items-center text-red-500">
                        <X className="w-5 h-5 mr-2" />
                        <span className="text-sm">いいえ</span>
                      </div>
                    </div>
                    <div className={`transition-opacity duration-200 ${offsetX > 50 ? 'opacity-100' : 'opacity-30'}`}>
                      <div className="flex items-center text-green-500">
                        <span className="text-sm">はい</span>
                        <Check className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="absolute -bottom-12 left-0 right-0 flex justify-center gap-4">
              <Button
                variant="outline"
                onClick={() => handleAnswer(false)}
                className="bg-white/80 hover:bg-white/90 transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                <span className="text-sm">いいえ</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleAnswer(true)}
                className="bg-white/80 hover:bg-white/90 transition-all duration-200 hover:scale-105"
                disabled={isTransitioning}
              >
                <span className="text-sm">はい</span>
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonaQuiz;