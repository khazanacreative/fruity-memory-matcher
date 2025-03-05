
import React, { useState, useEffect, useCallback } from 'react';
import Card from './Card';
import ScorePanel from './ScorePanel';
import GameCompleteModal from './GameCompleteModal';
import PlayerSetup from './PlayerSetup';
import PlayerScoreBoard from './PlayerScoreBoard';
import { Card as CardType, GameState, Player, initializeGame, initializePlayers, nextPlayerTurn } from '@/utils/gameUtils';
import { toast } from "sonner";

const GameBoard: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlayerSetupOpen, setIsPlayerSetupOpen] = useState(true);
  const [players, setPlayers] = useState<Player[]>([]);
  const [totalPairs] = useState(24);

  // Initialize game
  const startNewGame = useCallback((numPlayers: number = 2, playerNames: string[] = []) => {
    const newCards = initializeGame();
    setCards(newCards);
    
    // Initialize players
    const newPlayers = initializePlayers(numPlayers);
    // Update player names if provided
    if (playerNames.length > 0) {
      newPlayers.forEach((player, index) => {
        if (playerNames[index]) {
          player.name = playerNames[index];
        }
      });
    }
    
    setPlayers(newPlayers);
    setGameState('playing');
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
    setTimer(0);
    setIsModalOpen(false);
    setIsProcessing(false);
    setIsPlayerSetupOpen(false);
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
      
      // Get current active player
      const activePlayerIndex = players.findIndex(p => p.isActive);
      
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
          // Increment score for current player
          setPlayers(prev => 
            prev.map((player, idx) => 
              idx === activePlayerIndex
                ? { ...player, score: player.score + 1 }
                : player
            )
          );
          
          setMatchedPairs(prev => prev + 1);
          
          // Show toast for matched pair
          toast.success(`${players[activePlayerIndex].name} found a match!`);
        } else {
          // Move to next player's turn if no match
          setPlayers(nextPlayerTurn);
          
          // Show toast for turn change
          const nextActivePlayerIndex = (activePlayerIndex + 1) % players.length;
          toast.info(`${players[nextActivePlayerIndex].name}'s turn`, {
            description: "Try to find a matching pair!"
          });
        }
        
        setFlippedCards([]);
        setIsProcessing(false);
      }, 800);
    }
  }, [flippedCards, players]);
  
  // Check for game completion
  useEffect(() => {
    if (matchedPairs === totalPairs && totalPairs > 0 && players.length > 0) {
      setGameState('completed');
      setIsModalOpen(true);
    }
  }, [matchedPairs, totalPairs, players.length]);
  
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
  
  // Handle player setup completion
  const handlePlayerSetup = (numPlayers: number, playerNames: string[]) => {
    startNewGame(numPlayers, playerNames);
  };
  
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-4">
      <PlayerSetup 
        isOpen={isPlayerSetupOpen}
        onClose={() => setIsPlayerSetupOpen(false)}
        onStartGame={handlePlayerSetup}
      />
      
      {players.length > 0 && (
        <>
          <ScorePanel 
            moves={moves}
            matchedPairs={matchedPairs}
            totalPairs={totalPairs}
            timer={timer}
            onRestart={() => setIsPlayerSetupOpen(true)}
          />
          
          <div className="mt-4">
            <PlayerScoreBoard players={players} />
          </div>
          
          <div className="mt-6 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3 sm:gap-4">
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
            players={players}
            time={timer}
            totalMoves={moves}
            onRestart={() => setIsPlayerSetupOpen(true)}
            onClose={() => setIsModalOpen(false)}
          />
        </>
      )}
    </div>
  );
};

export default GameBoard;
