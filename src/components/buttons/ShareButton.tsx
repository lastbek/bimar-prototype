'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ShareButtonProps {
  title: string;
  text: string;
}

export function ShareButton({ title, text }: ShareButtonProps) {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // Only show the share button if the Web Share API is available
  if (!navigator.share) {
    return null;
  }

  return (
    <Button
      variant="outline"
      className="gap-2"
      onClick={handleShare}
    >
      <Share2 className="h-4 w-4" />
      Maqolani ulashing
    </Button>
  );
}
