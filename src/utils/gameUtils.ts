
import { Apple, Cherry, Leaf, CircleOff, Circle, CircleDot, Heart, Star, Flame, Cloud, Zap, Snowflake, Sun, Moon, Smile, Ghost, MessageCircle, Music, Camera, Coffee, Gift, Pizza, IceCream, Cake, Cookie, Candy, CircleUser, HeartHandshake } from "lucide-react";

// Define types
export interface Card {
  id: number;
  type: string;
  icon: any;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
  name: string;
  score: number;
  isActive: boolean;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'completed';

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

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Initialize a new game with 48 cards (24 pairs)
export const initializeGame = (): Card[] => {
  // Create pairs from the fruit cards (24 pairs = 48 cards)
  const selectedPairs = shuffleArray(fruitCards).slice(0, 24);
  
  // Double the cards to create pairs and assign unique IDs
  let id = 0;
  const pairs = selectedPairs.flatMap(fruit => [
    { id: id++, type: fruit.type, icon: fruit.icon, isFlipped: false, isMatched: false },
    { id: id++, type: fruit.type, icon: fruit.icon, isFlipped: false, isMatched: false }
  ]);
  
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
