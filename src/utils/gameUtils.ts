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

// All available fruit/food-related icons with friendly names
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
  { type: 'cookie', icon: Cookie },
  { type: 'candy', icon: Candy },
  { type: 'user', icon: CircleUser },
  { type: 'handshake', icon: HeartHandshake },
  { type: 'masked', icon: CircleOff }
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

// Number cards 1-25
export const numberCards = Array.from({ length: 25 }, (_, i) => ({
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
): Card[] => {
  let selectedCards: any[] = [];
  let maxPairs = 26; // Default to 26 pairs (52 cards)
  
  switch (cardType) {
    case 'alphabet':
      selectedCards = alphabetCards;
      maxPairs = 26; // 26 letters in the alphabet
      break;
    case 'numbers':
      selectedCards = numberCards;
      maxPairs = 25; // Numbers 1-25
      break;
    case 'custom':
      if (customCards && customCards.length > 0) {
        // Use all provided custom cards, limit to maxPairs
        selectedCards = shuffleArray(customCards).slice(0, maxPairs);
        break;
      }
      // Fallback to default if no custom cards
    default:
      // Default icon cards, limit to maxPairs
      selectedCards = shuffleArray(fruitCards).slice(0, maxPairs);
  }
  
  // Double the cards to create pairs and assign unique IDs
  let id = 0;
  const pairs = selectedCards.flatMap(card => {
    if ('letter' in card) {
      // Alphabet card
      return [
        { 
          id: id++, 
          type: card.type, 
          letter: card.letter,
          isFlipped: false, 
          isMatched: false,
          isShuffling: true 
        },
        { 
          id: id++, 
          type: card.type, 
          letter: card.letter,
          isFlipped: false, 
          isMatched: false,
          isShuffling: true 
        }
      ];
    } else if ('number' in card) {
      // Number card
      return [
        { 
          id: id++, 
          type: card.type, 
          number: card.number,
          isFlipped: false, 
          isMatched: false,
          isShuffling: true 
        },
        { 
          id: id++, 
          type: card.type, 
          number: card.number,
          isFlipped: false, 
          isMatched: false,
          isShuffling: true 
        }
      ];
    } else if ('url' in card) {
      // Custom image card
      return [
        { 
          id: id++, 
          type: `custom-${card.id}`, 
          isFlipped: false, 
          isMatched: false,
          customImage: card.url,
          customName: card.name,
          isShuffling: true 
        },
        { 
          id: id++, 
          type: `custom-${card.id}`, 
          isFlipped: false, 
          isMatched: false,
          customImage: card.url,
          customName: card.name,
          isShuffling: true 
        }
      ];
    } else {
      // Default icon card
      return [
        { 
          id: id++, 
          type: card.type, 
          icon: card.icon, 
          isFlipped: false, 
          isMatched: false, 
          isShuffling: true 
        },
        { 
          id: id++, 
          type: card.type, 
          icon: card.icon, 
          isFlipped: false, 
          isMatched: false, 
          isShuffling: true 
        }
      ];
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
