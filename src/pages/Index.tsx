
import React from 'react';
import GameBoard from '@/components/GameBoard';

const Index = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-background to-secondary/30 flex flex-col items-center justify-start">
      <header className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            Memory Match Game
          </span>
        </h1>
        <p className="mt-3 text-gray-500 text-center max-w-xl">
          Match pairs of cards to win the game. Play with 2-3 players and take turns finding matching pairs. 
          Choose from icon cards, alphabet cards (A-Y), or upload your own images!
        </p>
      </header>
      
      <main className="w-full flex-1 flex flex-col">
        <GameBoard />
      </main>
      
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        <p>Take turns to find all 25 pairs and win! Use alphabet cards or custom images for more fun.</p>
      </footer>
    </div>
  );
};

export default Index;
