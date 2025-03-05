
import React from 'react';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/utils/gameUtils';

interface CardProps {
  card: CardType;
  isDisabled: boolean;
  onCardClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, isDisabled, onCardClick }) => {
  const { isFlipped, isMatched, icon: Icon, type } = card;
  
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onCardClick(card);
    }
  };

  return (
    <div 
      className={cn(
        "memory-card relative w-full aspect-[3/4] rounded-xl cursor-pointer",
        isMatched && "matched"
      )}
      onClick={handleClick}
    >
      <div 
        className={cn(
          "memory-card-inner absolute inset-0 w-full h-full transition-transform duration-500",
          (isFlipped || isMatched) && "transform rotate-y-180"
        )}
      >
        {/* Card Front (Hidden) */}
        <div className="memory-card-front absolute inset-0 w-full h-full rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center transform-style-3d backface-hidden">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            <span className="text-2xl text-primary">?</span>
          </div>
        </div>
        
        {/* Card Back (Revealed) */}
        <div className="memory-card-back absolute inset-0 w-full h-full rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center transform-style-3d backface-hidden rotate-y-180">
          <div className={cn(
            "w-16 h-16 rounded-full flex items-center justify-center",
            isMatched && "animate-match-success"
          )}>
            <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />
          </div>
          <span className="mt-2 text-sm font-medium capitalize text-gray-700">{type}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
