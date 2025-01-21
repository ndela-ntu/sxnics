'use client';

import React, { useState } from 'react';
import { Share, Share2, X } from 'lucide-react';
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Button
} from "@/components/ui/button";

interface ShareButtonProps {
  mixTitle: string;
  mixUrl: string;
  artistName: string;
}

const ShareButton = ({ mixTitle, mixUrl, artistName }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareData = {
    title: `${mixTitle} by ${artistName}`,
    text: `Check out this mix: ${mixTitle} by ${artistName}`,
    url: mixUrl,
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      url: `https://wa.me/?text=${encodeURIComponent(`${shareData.text} ${mixUrl}`)}`,
      color: 'bg-green-500',
    },
    {
      name: 'Facebook',
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(mixUrl)}`,
      color: 'bg-blue-600',
    },
    {
      name: 'Twitter',
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(mixUrl)}`,
      color: 'bg-sky-500',
    },
    {
      name: 'Copy Link',
      action: () => {
        navigator.clipboard.writeText(mixUrl);
        alert('Link copied to clipboard!');
      },
      color: 'bg-gray-600',
    },
  ];

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      setIsOpen(true);
    }
  };

  return (
    <div className="relative">
      <Button
        onClick={handleNativeShare}
        className="flex items-center bg-white text-black py-1 px-2 rounded-none"
      >
        <Share2 className="h-5 w-5" />
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 z-50 w-64">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Share this mix</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {shareLinks.map((platform) => (
                <Button
                  key={platform.name}
                  onClick={() => {
                    if (platform.action) {
                      platform.action();
                    } else {
                      window.open(platform.url, '_blank');
                    }
                    setIsOpen(false);
                  }}
                  className={`${platform.color} text-white w-full`}
                >
                  {platform.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ShareButton;