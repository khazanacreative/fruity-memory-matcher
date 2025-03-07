
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Users, Images, AlignJustify, Hash, Minus, Plus } from 'lucide-react';
import CardUploader, { CustomCardImage } from './CardUploader';
import { CardType } from '@/utils/gameUtils';

interface PlayerSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onStartGame: (numPlayers: number, playerNames: string[], cardType: CardType, customCards?: CustomCardImage[], numPairs?: number) => void;
}

const PlayerSetup: React.FC<PlayerSetupProps> = ({ isOpen, onClose, onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState<number>(2);
  const [playerNames, setPlayerNames] = useState<string[]>(['Pemain 1', 'Pemain 2', 'Pemain 3']);
  const [isCardUploaderOpen, setIsCardUploaderOpen] = useState(false);
  const [customCards, setCustomCards] = useState<CustomCardImage[]>([]);
  const [cardMode, setCardMode] = useState<CardType>('default');
  const [numberPairs, setNumberPairs] = useState<number>(25);

  const handleNameChange = (index: number, name: string) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleStartGame = () => {
    onStartGame(
      numPlayers, 
      playerNames.slice(0, numPlayers),
      cardMode,
      cardMode === 'custom' ? customCards : undefined,
      cardMode === 'numbers' ? numberPairs : undefined
    );
  };

  const handleSaveCustomCards = (cards: CustomCardImage[]) => {
    setCustomCards(cards);
    setCardMode('custom');
  };

  const increaseNumberPairs = () => {
    if (numberPairs < 36) {
      setNumberPairs(prev => prev + 1);
    }
  };

  const decreaseNumberPairs = () => {
    if (numberPairs > 12) {
      setNumberPairs(prev => prev - 1);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Pengaturan Pemain
            </DialogTitle>
            <DialogDescription className="text-center">
              Atur jumlah pemain untuk permainan kartu memori Anda.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-6 my-4">
            <div className="flex flex-col gap-2">
              <Label>Jumlah Pemain</Label>
              <div className="flex gap-2">
                {[2, 3].map((num) => (
                  <Button
                    key={num}
                    variant={numPlayers === num ? "default" : "outline"}
                    className="flex-1 gap-2"
                    onClick={() => setNumPlayers(num)}
                  >
                    <Users className="w-4 h-4" />
                    {num} Pemain
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <Label>Nama Pemain</Label>
              {Array.from({ length: numPlayers }).map((_, index) => (
                <div key={index} className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  <Input 
                    value={playerNames[index]} 
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`Pemain ${index + 1}`}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
            
            <div className="flex flex-col gap-2">
              <Label>Kartu Permainan</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={cardMode === 'default' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setCardMode('default')}
                >
                  Ikon Default (24 pasang)
                </Button>
                <Button
                  variant={cardMode === 'alphabet' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setCardMode('alphabet')}
                >
                  <AlignJustify className="w-4 h-4" />
                  Alfabet (A-Z)
                </Button>
                <Button
                  variant={cardMode === 'numbers' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setCardMode('numbers')}
                >
                  <Hash className="w-4 h-4" />
                  Angka (1-{numberPairs})
                </Button>
                <Button
                  variant={cardMode === 'custom' ? "default" : "outline"}
                  className="flex-1 gap-2"
                  onClick={() => setIsCardUploaderOpen(true)}
                >
                  <Images className="w-4 h-4" />
                  Gambar Kustom
                  {cardMode === 'custom' && customCards.length > 0 && (
                    <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                      {customCards.length}
                    </span>
                  )}
                </Button>
              </div>
              
              {cardMode === 'numbers' && (
                <div className="flex items-center gap-2 mt-2">
                  <Label className="text-sm">Jumlah pasangan:</Label>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={decreaseNumberPairs}
                    disabled={numberPairs <= 12}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-2 py-1 border rounded-md min-w-10 text-center">
                    {numberPairs}
                  </span>
                  <Button 
                    size="icon" 
                    variant="outline" 
                    className="h-8 w-8"
                    onClick={increaseNumberPairs}
                    disabled={numberPairs >= 36}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-xs text-muted-foreground ml-auto">
                    (12-36 pasang)
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button className="w-full" onClick={handleStartGame}>
              Mulai Permainan
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
