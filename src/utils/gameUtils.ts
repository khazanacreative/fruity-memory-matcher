
import { Apple, Banana, Cherry, Grape, Lemon, Orange, Strawberry, Pear, Coconut, Watermelon, Avocado, Kiwi, Mango, Pineapple, Peach, Fig, Plum, Pomegranate, Blueberry, Raspberry, Blackberry, Apricot, Papaya, Dragonfruit } from "lucide-react";

// Define types
export interface Card {
  id: number;
  type: string;
  icon: any;
  isFlipped: boolean;
  isMatched: boolean;
}

export type GameState = 'idle' | 'playing' | 'paused' | 'completed';

// All available fruit cards
export const fruitCards = [
  { type: 'apple', icon: Apple },
  { type: 'banana', icon: Banana },
  { type: 'cherry', icon: Cherry },
  { type: 'grape', icon: Grape },
  { type: 'lemon', icon: Lemon },
  { type: 'orange', icon: Orange },
  { type: 'strawberry', icon: Strawberry },
  { type: 'pear', icon: Pear },
  { type: 'coconut', icon: Coconut },
  { type: 'watermelon', icon: Watermelon },
  { type: 'avocado', icon: Avocado },
  { type: 'kiwi', icon: Kiwi },
  { type: 'mango', icon: Mango },
  { type: 'pineapple', icon: Pineapple },
  { type: 'peach', icon: Peach },
  { type: 'fig', icon: Fig },
  { type: 'plum', icon: Plum },
  { type: 'pomegranate', icon: Pomegranate },
  { type: 'blueberry', icon: Blueberry },
  { type: 'raspberry', icon: Raspberry },
  { type: 'blackberry', icon: Blackberry },
  { type: 'apricot', icon: Apricot },
  { type: 'papaya', icon: Papaya },
  { type: 'dragonfruit', icon: Dragonfruit }
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

// Format time from seconds to MM:SS
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};
