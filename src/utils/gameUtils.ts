import { Apple, Cherry, Leaf, CircleOff, Circle, CircleDot, Heart, Star, Flame, Cloud, Zap, Snowflake, Sun, Moon, Smile, Ghost, MessageCircle, Music, Camera, Coffee, Gift, Pizza, IceCream, Cake, Cookie, Candy, CircleUser, HeartHandshake } from "lucide-react";
import { CustomCardImage } from "@/components/CardUploader";

// Define types
export interface Card {
  id: number;
  type: string;
  icon?: any;
  isFlipped: boolean;
  isMatched: boolean;
  isShuffling?: boolean;
  customImage?: string;
  customName?: string;
  letter?: string; // For alphabet cards
  number?: number; // For number cards
}

export interface Player {
  id: number;
  name: string;
  score: number;
  isActive: boolean;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'completed' | 'shuffling';
export type CardType = 'default' | 'alphabet' | 'numbers' | 'custom';

// Custom icons limited to 24 pairs
export const fruitCards = [
  { type: 'apple', icon: Apple },
  { type: 'cherry', icon: Cherry },
  { type: 'leaf', icon: Leaf },
  { type: 'circle', icon: Circle },
  { type: 'circle dot', icon: CircleDot },
  { type: 'heart', icon: Heart },
  { type: 'star', icon: Star },
  { type: 'flame', icon: Flame },
  { type: 'cloud', icon: Cloud },
  { type: 'lightning', icon: Zap },
  { type: 'snowflake', icon: Snowflake },
  { type: 'sun', icon: Sun },
  { type: 'moon', icon: Moon },
  { type: 'smile', icon: Smile },
  { type: 'ghost', icon: Ghost },
  { type: 'message', icon: MessageCircle },
  { type: 'music', icon: Music },
  { type: 'camera', icon: Camera },
  { type: 'coffee', icon: Coffee },
  { type: 'gift', icon: Gift },
  { type: 'pizza', icon: Pizza },
  { type: 'ice cream', icon: IceCream },
  { type: 'cake', icon: Cake },
  { type: 'cookie', icon: Cookie }
];

// Alphabet cards A-Z (26 letters)
export const alphabetCards = [
  { type: 'letter-a', letter: 'A' },
  { type: 'letter-b', letter: 'B' },
  { type: 'letter-c', letter: 'C' },
  { type: 'letter-d', letter: 'D' },
  { type: 'letter-e', letter: 'E' },
  { type: 'letter-f', letter: 'F' },
  { type: 'letter-g', letter: 'G' },
  { type: 'letter-h', letter: 'H' },
  { type: 'letter-i', letter: 'I' },
  { type: 'letter-j', letter: 'J' },
  { type: 'letter-k', letter: 'K' },
  { type: 'letter-l', letter: 'L' },
  { type: 'letter-m', letter: 'M' },
  { type: 'letter-n', letter: 'N' },
  { type: 'letter-o', letter: 'O' },
  { type: 'letter-p', letter: 'P' },
  { type: 'letter-q', letter: 'Q' },
  { type: 'letter-r', letter: 'R' },
  { type: 'letter-s', letter: 'S' },
  { type: 'letter-t', letter: 'T' },
  { type: 'letter-u', letter: 'U' },
  { type: 'letter-v', letter: 'V' },
  { type: 'letter-w', letter: 'W' },
  { type: 'letter-x', letter: 'X' },
  { type: 'letter-y', letter: 'Y' },
  { type: 'letter-z', letter: 'Z' }
];

// Generate number cards 1-36 (will be limited based on user selection)
export const numberCards = Array.from({ length: 36 }, (_, i) => ({
  type: `number-${i + 1}`,
  number: i + 1
}));

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Initialize a new game with cards based on the selected type
export const initializeGame = (
  cardType: CardType = 'default',
  customCards?: CustomCardImage[],
  numPairs?: number
): Card[] => {
  let selectedCards: any[] = [];
  
  switch (cardType) {
    case 'alphabet':
      selectedCards = alphabetCards;
      break;
    case 'numbers':
      // Use the custom number of pairs (between 12 and 36)
      const numCount = Math.min(Math.max(numPairs || 25, 12), 36);
      selectedCards = numberCards.slice(0, numCount);
      break;
    case 'custom':
      if (customCards && customCards.length > 0) {
        // Use all provided custom cards, limit to 36 pairs
        selectedCards = shuffleArray(customCards).slice(0, 36);
        break;
      }
      // Fallback to default if no custom cards
    default:
      // Default icon cards, limit to 24 pairs
      selectedCards = fruitCards.slice(0, 24);
  }
  
  // Fix TypeScript errors by using a proper map function instead of flatMap
  let id = 0;
  const pairs: Card[] = [];
  
  selectedCards.forEach(card => {
    if ('letter' in card) {
      // Alphabet card
      pairs.push({ 
        id: id++, 
        type: card.type, 
        letter: card.letter,
        isFlipped: false, 
        isMatched: false,
        isShuffling: true 
      });
      pairs.push({ 
        id: id++, 
        type: card.type, 
        letter: card.letter,
        isFlipped: false, 
        isMatched: false,
        isShuffling: true 
      });
    } else if ('number' in card) {
      // Number card
      pairs.push({ 
        id: id++, 
        type: card.type, 
        number: card.number,
        isFlipped: false, 
        isMatched: false,
        isShuffling: true 
      });
      pairs.push({ 
        id: id++, 
        type: card.type, 
        number: card.number,
        isFlipped: false, 
        isMatched: false,
        isShuffling: true 
      });
    } else if ('url' in card) {
      // Custom image card
      pairs.push({ 
        id: id++, 
        type: `custom-${card.id}`, 
        isFlipped: false, 
        isMatched: false,
        customImage: card.url,
        customName: card.name,
        isShuffling: true 
      });
      pairs.push({ 
        id: id++, 
        type: `custom-${card.id}`, 
        isFlipped: false, 
        isMatched: false,
        customImage: card.url,
        customName: card.name,
        isShuffling: true 
      });
    } else {
      // Default icon card
      pairs.push({ 
        id: id++, 
        type: card.type, 
        icon: card.icon, 
        isFlipped: false, 
        isMatched: false, 
        isShuffling: true 
      });
      pairs.push({ 
        id: id++, 
        type: card.type, 
        icon: card.icon, 
        isFlipped: false, 
        isMatched: false, 
        isShuffling: true 
      });
    }
  });
  
  // Shuffle the pairs
  return shuffleArray(pairs);
};

// Initialize players for multiplayer game
export const initializePlayers = (numPlayers: number): Player[] => {
  return Array.from({ length: numPlayers }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    score: 0,
    isActive: i === 0 // First player starts
  }));
};

// Move to next player's turn
export const nextPlayerTurn = (players: Player[]): Player[] => {
  const currentPlayerIndex = players.findIndex(player => player.isActive);
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  
  return players.map((player, index) => ({
    ...player,
    isActive: index === nextPlayerIndex
  }));
};

// Format time from seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
