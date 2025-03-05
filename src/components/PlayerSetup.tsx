
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Users, Images, LetterA } from 'lucide-react';
import CardUploader, { CustomCardImage } from './CardUploader';

interface PlayerSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (numPlayers: number, playerNames: string[], customCards?: CustomCardImage[], useAlphabet?: boolean) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ isOpen, onClose, onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['Player 1', 'Player 2', 'Player 3']);
  const [isCardUploaderOpen, setIsCardUploaderOpen] = useState(false);
  const [customCards, setCustomCards] = useState<CustomCardImage[]>([]);
  const [cardType, setCardType] = useState<'default' | 'custom' | 'alphabet'>('default');

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    onStartGame(
      numPlayers, 
      playerNames.slice(0, numPlayers), 
      cardType === 'custom' ? customCards : undefined,
      cardType === 'alphabet'
    );
  };

  const handleSaveCustomCards = (cards: CustomCardImage[]) => {
    setCustomCards(cards);
    setCardType('custom');
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Player Setup
            </DialogTitle>
            <DialogDescription className="text-center">
              Configure the number of players for your memory match game.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 my-4">
            <div className="flex flex-col gap-2">
              <Label>Number of Players</Label>
              <div className="flex gap-2">
                {[2, 3].map((num) => (
                  <Button
                    key={num}
                    variant={numPlayers === num ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => setNumPlayers(num)}
                  >
                    <Users className="w-4 h-4" />
                    {num} Players
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Label>Player Names</Label>
              {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <Input 
                    value={playerNames[index]} 
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Player ${index + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-2">
              <Label>Game Cards</Label>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={cardType === 'default' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setCardType('default')}
                >
                  Default
                </Button>
                <Button
                  variant={cardType === 'alphabet' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setCardType('alphabet')}
                >
                  <LetterA className="w-4 h-4" />
                  Alphabet
                </Button>
                <Button
                  variant={cardType === 'custom' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setIsCardUploaderOpen(true)}
                >
                  <Images className="w-4 h-4" />
                  Custom
                  {cardType === 'custom' && customCards.length > 0 && (
                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {customCards.length}
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button className="w-full" onClick={handleStartGame}>
              Start Game
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <CardUploader
        isOpen={isCardUploaderOpen}
        onClose={() => setIsCardUploaderOpen(false)}
        onSaveCards={handleSaveCustomCards}
      />
    </>
  );
};

export default PlayerSetup;
