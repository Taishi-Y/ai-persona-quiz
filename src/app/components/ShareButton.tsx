'use client';

import { Share2 } from 'lucide-react';
import { Button } from './ui/button';

interface ShareButtonProps {
  url: string;
  text: string;
}

export default function ShareButton({ url, text }: ShareButtonProps) {
  const shareToX = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={shareToX}
      aria-label="Share to X"
    >
      <Share2 className="h-4 w-4" />
    </Button>
  );
} 