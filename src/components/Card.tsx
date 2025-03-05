
import React from 'react';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/utils/gameUtils';

interface CardProps {
  card: CardType;
  isDisabled: boolean;
  onCardClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, isDisabled, onCardClick }) => {
  const { isFlipped, isMatched, icon: Icon, type, customImage, customName, isShuffling } = card;
  
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onCardClick(card);
    }
  };

  // Get background color based on card type
  const getCardColor = () => {
    const colorMap: Record<string, string> = {
      apple: 'from-red-50 to-red-100',
      cherry: 'from-pink-50 to-pink-100',
      leaf: 'from-green-50 to-green-100',
      pizza: 'from-amber-50 to-amber-100',
      'ice cream': 'from-blue-50 to-blue-100',
      cake: 'from-purple-50 to-purple-100',
      cookie: 'from-yellow-50 to-yellow-100',
      candy: 'from-rose-50 to-rose-100',
      coffee: 'from-amber-50 to-brown-100',
    };
    
    return colorMap[type] || 'from-gray-50 to-gray-100';
  };

  return (
    <div 
      className={cn(
        "memory-card relative w-full aspect-[3/4] rounded-xl cursor-pointer transition-all duration-500",
        isMatched && "matched",
        isShuffling && "shuffling"
      )}
      onClick={handleClick}
      style={isShuffling ? { transform: `rotate(${Math.random() * 10 - 5}deg)` } : undefined}
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
          {customImage ? (
            <div className="w-full h-2/3 rounded-t-xl overflow-hidden">
              <img 
                src={customImage} 
                alt={customName || 'Custom card'} 
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className={cn(
              "w-full h-2/3 rounded-t-xl bg-gradient-to-b p-4 flex items-center justify-center",
              getCardColor()
            )}>
              <div className={cn(
                "w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center",
                isMatched && "animate-match-success"
              )}>
                {Icon && <Icon className="w-10 h-10 text-primary" strokeWidth={1.5} />}
              </div>
            </div>
          )}
          <div className="w-full h-1/3 flex items-center justify-center p-2">
            <span className="text-sm font-medium capitalize text-gray-700">
              {customName || type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
