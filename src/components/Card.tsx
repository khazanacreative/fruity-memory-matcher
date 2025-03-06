
import React from 'react';
import { cn } from '@/lib/utils';
import { Card as CardType } from '@/utils/gameUtils';

interface CardProps {
  card: CardType;
  isDisabled: boolean;
  onCardClick: (card: CardType) => void;
}

const Card: React.FC<CardProps> = ({ card, isDisabled, onCardClick }) => {
  const { isFlipped, isMatched, icon: Icon, type, customImage, customName, letter, number, isShuffling } = card;
  
  const handleClick = () => {
    if (!isFlipped && !isMatched && !isDisabled) {
      onCardClick(card);
    }
  };

  // Get background color based on card type, letter, or number
  const getCardColor = () => {
    if (type.startsWith('letter-')) {
      // Generate color based on letter
      const letterColors: Record<string, string> = {
        'A': 'from-red-50 to-red-100',
        'B': 'from-blue-50 to-blue-100',
        'C': 'from-green-50 to-green-100',
        'D': 'from-yellow-50 to-yellow-100',
        'E': 'from-purple-50 to-purple-100',
        'F': 'from-pink-50 to-pink-100',
        'G': 'from-indigo-50 to-indigo-100',
        'H': 'from-gray-50 to-gray-100',
        'I': 'from-orange-50 to-orange-100',
        'J': 'from-teal-50 to-teal-100',
        'K': 'from-cyan-50 to-cyan-100',
        'L': 'from-lime-50 to-lime-100',
        'M': 'from-amber-50 to-amber-100',
        'N': 'from-emerald-50 to-emerald-100',
        'O': 'from-fuchsia-50 to-fuchsia-100',
        'P': 'from-rose-50 to-rose-100',
        'Q': 'from-sky-50 to-sky-100',
        'R': 'from-violet-50 to-violet-100',
        'S': 'from-slate-50 to-slate-100',
        'T': 'from-zinc-50 to-zinc-100',
        'U': 'from-neutral-50 to-neutral-100',
        'V': 'from-stone-50 to-stone-100',
        'W': 'from-red-50 to-pink-100',
        'X': 'from-blue-50 to-purple-100',
        'Y': 'from-green-50 to-yellow-100',
        'Z': 'from-teal-50 to-cyan-100',
      };
      
      return letter ? letterColors[letter] : 'from-gray-50 to-gray-100';
    }
    
    if (type.startsWith('number-')) {
      // Generate color based on number (1-25)
      const hue = (number || 1) * 14 % 360; // Spread colors around the color wheel
      return `from-[hsl(${hue},70%,90%)] to-[hsl(${hue},70%,80%)]`;
    }

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
          (isFlipped || isMatched) && "rotate-y-180"
        )}
      >
        {/* Card Front (Hidden) */}
        <div className="memory-card-front absolute inset-0 w-full h-full rounded-xl bg-white border border-gray-200 shadow-sm flex items-center justify-center preserve-3d backface-hidden">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/10 to-primary/30 flex items-center justify-center">
            <span className="text-2xl text-primary">?</span>
          </div>
        </div>
        
        {/* Card Back (Revealed) */}
        <div className="memory-card-back absolute inset-0 w-full h-full rounded-xl bg-white border border-gray-200 shadow-sm flex flex-col items-center justify-center preserve-3d backface-hidden rotate-y-180">
          {customImage ? (
            <div className="w-full h-2/3 rounded-t-xl overflow-hidden">
              <img 
                src={customImage} 
                alt={customName || 'Custom card'} 
                className="w-full h-full object-contain"
              />
            </div>
          ) : number ? (
            <div className={cn(
              "w-full h-2/3 rounded-t-xl bg-gradient-to-b p-4 flex items-center justify-center",
              getCardColor()
            )}>
              <div className={cn(
                "w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center",
                isMatched && "animate-match-success"
              )}>
                <span className="text-4xl font-bold text-primary">{number}</span>
              </div>
            </div>
          ) : letter ? (
            <div className={cn(
              "w-full h-2/3 rounded-t-xl bg-gradient-to-b p-4 flex items-center justify-center",
              getCardColor()
            )}>
              <div className={cn(
                "w-16 h-16 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center",
                isMatched && "animate-match-success"
              )}>
                <span className="text-4xl font-bold text-primary">{letter}</span>
              </div>
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
              {customName || (letter ? `Letter ${letter}` : number ? `Number ${number}` : type)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
