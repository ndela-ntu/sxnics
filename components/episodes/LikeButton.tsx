'use client';

import React, { useState, useEffect } from 'react';
import { Heart, HeartHandshake } from 'lucide-react';
import { toggleMixLike } from '@/lib/episode-actions';

interface LikeButtonProps {
  mixId: number;
  initialLikeCount: number;
}

const LikeButton: React.FC<LikeButtonProps> = ({ 
  mixId, 
  initialLikeCount
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Check if this mix is liked on component mount
    const likedMixes = getLikedMixesFromCookie();
    setIsLiked(likedMixes.includes(mixId));
  }, [mixId]);

  const getLikedMixesFromCookie = (): number[] => {
    if (typeof document === 'undefined') return [];

    const cookie = document.cookie
      .split('; ')
      .find(row => row.startsWith('likedMixes='));
    
    try {
      if (cookie) {
        return JSON.parse(decodeURIComponent(cookie.split('=')[1]));
      }
    } catch (error) {
      console.error('Error parsing liked mixes cookie:', error);
    }
    return [];
  };

  const setLikedMixesCookie = (likedMixes: number[]): void => {
    if (typeof document === 'undefined') return;

    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    document.cookie = `likedMixes=${encodeURIComponent(JSON.stringify(likedMixes))}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  };

  const handleLikeClick = async (): Promise<void> => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      // Generate or retrieve a unique identifier for this client
      const clientId = getOrCreateClientId();

      // Call server action to toggle like
      const result = await toggleMixLike(mixId, clientId);

      // Update local state based on server response
      let likedMixes = getLikedMixesFromCookie();
      
      if (result.liked) {
        // Add mix to liked list
        if (!likedMixes.includes(mixId)) {
          likedMixes.push(mixId);
        }
        setLikeCount(prev => prev + 1);
      } else {
        // Remove mix from liked list
        const updatedLikes = likedMixes.filter(id => id !== mixId);
        setLikeCount(prev => prev - 1);
        likedMixes = updatedLikes;
      }

      // Update cookie
      setLikedMixesCookie(likedMixes);
      
      // Update liked state
      setIsLiked(result.liked);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getOrCreateClientId = (): string => {
    // Check if client ID exists in cookie
    const cookieName = 'clientId';
    const existingCookie = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${cookieName}=`));

    if (existingCookie) {
      return existingCookie.split('=')[1];
    }

    // Generate a new client ID if not exists
    const newClientId = crypto.randomUUID();
    
    // Set cookie for 1 year
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    
    document.cookie = `${cookieName}=${newClientId}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;

    return newClientId;
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <button
        onClick={handleLikeClick}
        className={`${isLiked ? 'border bg-white' : 'border bg-transparent'} rounded-full transition-all duration-150 flex items-center gap-2 px-2 py-2`}
        aria-label={isLiked ? 'Unlike mix' : 'Like mix'}
        type="button"
        disabled={isLoading}
      >
        {isLiked ? (
          <HeartHandshake className={`${isLiked && 'text-black'} w-5 h-5`} />
        ) : (
          <Heart className="w-5 h-5" />
        )}
      </button>

      <span className="text-sm">
        {likeCount}
      </span>
    </div>
  );
};

export default LikeButton;