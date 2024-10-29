'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Share2, X, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';

const categories = {
  basic: {
    questions: [
      "AIツールを実際に使用したことがありますか？",
      "AIに関する最新ニュースをよくチェックしますか？",
      "AIの可能性に興味がありますか？"
    ]
  },
  technical: {
    questions: [
      "プログラミングの経験はありますか？",
      "機械学習の基礎知識はありますか？",
      "AIモデルの仕組みを理解していますか？"
    ]
  },
  business: {
    questions: [
      "仕事でAIツールを使用していますか？",
      "AIを使って業務効率化を検討していますか？",
      "AI関連のビジネスプランがありますか？"
    ]
  },
  creative: {
    questions: [
      "AIを使って創作活動をしていますか？",
      "AIアートに興味がありますか？",
      "AIを使った表現手法を模索していますか？"
    ]
  }
};

// 結果の型定義
interface QuizResult {
  type: string;
  percentage: string;
  description: string;
  badges: string[];
}

const AIPersonaQuiz = () => {
  const [currentCategory, setCurrentCategory] = useState<string>('basic');
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetX, setOffsetX] = useState(0);
  const [result, setResult] = useState<QuizResult | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const currentQuestions = categories[currentCategory as keyof typeof categories].questions;
  const totalQuestions = Object.values(categories).reduce((sum, cat) => sum + cat.questions.length, 0);
  const answeredQuestions = answers.length;

  const calculatePersona = (scores: Record<string, number>): QuizResult => {
    const avgScore = Object.values(scores).reduce((a, b) => a + b, 0) / Object.keys(scores).length;

    if (scores.technical > 0.8) {
      return {
        type: "生成AI開発してる人",
        percentage: "0.1%",
        description: "AIの最前線で開発に携わる革新的な存在です。",
        badges: ["開発者", "イノベーター", "テクノロジスト"]
      };
    }
    if (scores.creative > 0.8) {
      return {
        type: "生成AI活用アーティスト",
        percentage: "1%",
        description: "AIを創造的に活用して作品を生み出しています。",
        badges: ["クリエイター", "アーティスト", "イノベーター"]
      };
    }
    if (scores.business > 0.7) {
      return {
        type: "生成AI業務効率化検討中の会社員",
        percentage: "8%",
        description: "ビジネスにおけるAI活用の可能性を探っています。",
        badges: ["ビジネスパーソン", "イノベーター"]
      };
    }
    if (avgScore > 0.6) {
      return {
        type: "生成AIツール体験者",
        percentage: "20%",
        description: "AIツールを積極的に試している探求者です。",
        badges: ["エクスプローラー", "アーリーアダプター"]
      };
    }
    return {
      type: "生成AI様子見層",
      percentage: "15%",
      description: "AIの動向を注視しながら、適切なタイミングを待っています。",
      badges: ["オブザーバー"]
    };
  };

  const handleAnswer = (answer: boolean) => {
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
      }
    }
  };

  // タッチ・マウス操作のハンドラー
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    const offset = clientX - startX;
    setOffsetX(offset);
  };

  const handleEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (Math.abs(offsetX) > 100) {
      handleAnswer(offsetX > 0);
    }
    setOffsetX(0);
  };

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
  }, []);

  const shareToX = () => {
    if (!result) return;
    
    // 診断結果に基づいてOGP画像のURLを生成
    const ogImageUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?` + new URLSearchParams({
      type: result.type,
      description: result.description,
      badges: result.badges.join(',')
    }).toString();
  
    // シェアテキストを生成
    const shareText = `私は「${result.type}」タイプでした！\n\n${result.badges.map(b => `#${b}`).join(' ')}\n${result.description}\n\nAIペルソナ診断で自分のタイプを確認しよう👇\n`;
    
    // シェアURL（実際のデプロイ先のURL）
    const shareUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ai-persona-quiz.example.com';
    
    // シェア用のURLを構築
    const twitterUrl = `https://twitter.com/intent/tweet?` + new URLSearchParams({
      text: shareText,
      url: shareUrl,
      via: 'taishi_jade',
    }).toString();
    
    window.open(twitterUrl, '_blank');
  };

  if (result) {
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
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm">
            Question {answeredQuestions + 1} / {totalQuestions}
          </div>
        </div>
        
        <div className="relative">
          <Card
            ref={cardRef}
            className="w-full bg-white/80 backdrop-blur-lg shadow-xl border-0 cursor-grab active:cursor-grabbing transition-all"
            style={{
              transform: `translateX(${offsetX}px) rotate(${offsetX * 0.1}deg)`,
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <CardContent className="p-8">
              <div className="min-h-[180px] flex flex-col justify-between">
                <div className="flex items-center justify-center flex-1 mt-8">
                  <h2 className="text-2xl font-semibold text-gray-800 text-center">
                    {currentQuestions[currentQuestionIndex]}
                  </h2>
                </div>
                
                <div className="flex justify-between items-center mt-8">
                  <div className={`transition-opacity ${offsetX < -50 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="flex items-center text-red-500">
                      <X className="w-6 h-6 mr-2" />
                      <span>いいえ</span>
                    </div>
                  </div>
                  <div className={`transition-opacity ${offsetX > 50 ? 'opacity-100' : 'opacity-30'}`}>
                    <div className="flex items-center text-green-500">
                      <span>はい</span>
                      <Check className="w-6 h-6 ml-2" />
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
              className="bg-white/80 hover:bg-white/90"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              いいえ
            </Button>
            <Button
              variant="outline"
              onClick={() => handleAnswer(true)}
              className="bg-white/80 hover:bg-white/90"
            >
              はい
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPersonaQuiz;