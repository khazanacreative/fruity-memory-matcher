
import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import ScorePanel from './ScorePanel';
import GameCompleteModal from './GameCompleteModal';
import { Card as CardType, GameState, initializeGame } from '@/utils/gameUtils';

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Initialize game
  const startNewGame = useCallback(() => {
    const newCards = initializeGame();
    setCards(newCards);
    setGameState('playing');
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTimer(0);
    setIsModalOpen(false);
    setIsProcessing(false);
  }, []);
  
  // Handle card click
  const handleCardClick = useCallback((clickedCard: CardType) => {
    if (isProcessing || flippedCards.length >= 2) return;
    
    // If game is idle, start the game
    if (gameState === 'idle') {
      setGameState('playing');
    }
    
    // If the card is already flipped, do nothing
    if (clickedCard.isFlipped || clickedCard.isMatched) return;
    
    // Flip the card
    setCards(prev => 
      prev.map(card => 
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      )
    );
    
    setFlippedCards(prev => [...prev, clickedCard]);
  }, [flippedCards, gameState, isProcessing]);
  
  // Check for matches when two cards are flipped
  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      setMoves(prev => prev + 1);
      
      const [firstCard, secondCard] = flippedCards;
      const isMatch = firstCard.type === secondCard.type;
      
      setTimeout(() => {
        setCards(prev => 
          prev.map(card => {
            if (card.id === firstCard.id || card.id === secondCard.id) {
              return {
                ...card,
                isFlipped: isMatch ? true : false,
                isMatched: isMatch
              };
            }
            return card;
          })
        );
        
        if (isMatch) {
          setMatchedPairs(prev => prev + 1);
        }
        
        setFlippedCards([]);
        setIsProcessing(false);
      }, 800);
    }
  }, [flippedCards]);
  
  // Check for game completion
  useEffect(() => {
    const totalPairs = cards.length / 2;
    if (matchedPairs === totalPairs && totalPairs > 0) {
      setGameState('completed');
      setIsModalOpen(true);
    }
  }, [matchedPairs, cards.length]);
  
  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (gameState === 'playing') {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [gameState]);
  
  // Initialize game on component mount
  useEffect(() => {
    startNewGame();
  }, [startNewGame]);
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <ScorePanel 
        moves={moves}
        matchedPairs={matchedPairs}
        totalPairs={cards.length / 2}
        timer={timer}
        onRestart={startNewGame}
      />
      
      <div className="mt-8 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            isDisabled={isProcessing || gameState === 'completed'}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
      
      <GameCompleteModal 
        isOpen={isModalOpen}
        moves={moves}
        time={timer}
        onRestart={startNewGame}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default GameBoard;
