
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, MousePointerClick, RotateCcw } from 'lucide-react';
import { formatTime } from '@/utils/gameUtils';
import confetti from 'canvas-confetti';

interface GameCompleteModalProps {
  isOpen: boolean;
  moves: number;
  time: number;
  onRestart: () => void;
  onClose: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  isOpen,
  moves,
  time,
  onRestart,
  onClose
}) => {
  React.useEffect(() => {
    if (isOpen) {
      // Trigger confetti when the modal opens
      const duration = 2000;
      const end = Date.now() + duration;

      const interval = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }

        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#22c55e', '#f59e0b', '#ef4444']
        });
        
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#3b82f6', '#8b5cf6', '#ec4899']
        });
      }, 50);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="w-full flex justify-center my-2">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-primary" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold">
            Congratulations!
          </DialogTitle>
          <DialogDescription className="text-center">
            You've successfully matched all the fruit pairs!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 my-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl">
              <Clock className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-sm text-gray-500">Time</span>
              <span className="text-lg font-semibold">{formatTime(time)}</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl">
              <MousePointerClick className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-sm text-gray-500">Moves</span>
              <span className="text-lg font-semibold">{moves}</span>
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button className="w-full sm:w-auto gap-2" onClick={onRestart}>
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameCompleteModal;
