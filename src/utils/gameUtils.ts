
import { Apple, Cherry, Leaf, CircleOff, Circle, CircleDot, Heart, Star, Flame, Cloud, Zap, Snowflake, Sun, Moon, Smile, Ghost, MessageCircle, Music, Camera, Coffee, Gift, Pizza, IceCream, Cake, Cookie, Candy, CircleUser, HeartHandshake, Diamond, Hexagon, Target, Banana, Pencil, PenTool, Bell, Bird, Bookmark, Book, Coins, Crown, DollarSign, Map, Palette, Plane } from "lucide-react";
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
}

export interface Player {
  id: number;
  name: string;
  score: number;
  isActive: boolean;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'completed' | 'shuffling';

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
  { type: 'diamond', icon: Diamond },
  { type: 'hexagon', icon: Hexagon },
  { type: 'target', icon: Target },
  { type: 'banana', icon: Banana },
  { type: 'pencil', icon: Pencil },
  { type: 'pen', icon: PenTool },
  { type: 'bell', icon: Bell },
  { type: 'bird', icon: Bird },
  { type: 'bookmark', icon: Bookmark },
  { type: 'book', icon: Book },
  { type: 'coins', icon: Coins },
  { type: 'crown', icon: Crown },
  { type: 'dollar', icon: DollarSign },
  { type: 'map', icon: Map },
  { type: 'palette', icon: Palette },
  { type: 'plane', icon: Plane },
  { type: 'masked', icon: CircleOff }
];

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Initialize a new game with 50 cards (25 pairs)
export const initializeGame = (customCards?: CustomCardImage[]): Card[] => {
  if (customCards && customCards.length > 0) {
    // Create pairs from the custom cards
    const selectedCustomCards = shuffleArray(customCards).slice(0, 25);
    
    // Double the cards to create pairs and assign unique IDs
    let id = 0;
    const pairs = selectedCustomCards.flatMap(card => [
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
    ]);
    
    // Shuffle the pairs
    return shuffleArray(pairs);
  } else {
    // Create pairs from the fruit cards (25 pairs = 50 cards)
    const selectedPairs = shuffleArray(fruitCards).slice(0, 25);
    
    // Double the cards to create pairs and assign unique IDs
    let id = 0;
    const pairs = selectedPairs.flatMap(fruit => [
      { id: id++, type: fruit.type, icon: fruit.icon, isFlipped: false, isMatched: false, isShuffling: true },
      { id: id++, type: fruit.type, icon: fruit.icon, isFlipped: false, isMatched: false, isShuffling: true }
    ]);
    
    // Shuffle the pairs
    return shuffleArray(pairs);
  }
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
