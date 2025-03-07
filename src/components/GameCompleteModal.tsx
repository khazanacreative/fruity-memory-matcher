
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Trophy, Clock, MousePointerClick, RotateCcw, Medal } from 'lucide-react';
import { formatTime } from '@/utils/gameUtils';
import { Player } from '@/utils/gameUtils';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

interface GameCompleteModalProps {
  isOpen: boolean;
  players: Player[];
  time: number;
  totalMoves: number;
  onRestart: () => void;
  onClose: () => void;
}

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  isOpen,
  players,
  time,
  totalMoves,
  onRestart,
  onClose
}) => {
  // Sort players by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isMultipleWinners = sortedPlayers.filter(p => p.score === winner.score).length > 1;

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
            Permainan Selesai!
          </DialogTitle>
          <DialogDescription className="text-center">
            {isMultipleWinners 
              ? "Seri! Beberapa pemain memiliki skor yang sama." 
              : `${winner.name} menang dengan ${winner.score} pasang!`}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col gap-4 my-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl">
              <Clock className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-sm text-gray-500">Waktu</span>
              <span className="text-lg font-semibold">{formatTime(time)}</span>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-secondary/50 rounded-xl">
              <MousePointerClick className="w-5 h-5 text-gray-600 mb-1" />
              <span className="text-sm text-gray-500">Total Langkah</span>
              <span className="text-lg font-semibold">{totalMoves}</span>
            </div>
          </div>
          
          <div className="mt-2">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Papan Peringkat</h3>
            <div className="space-y-2">
              {sortedPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-white text-xs",
                      index === 0 ? "bg-yellow-500" : 
                      index === 1 ? "bg-gray-400" : 
                      index === 2 ? "bg-amber-700" : "bg-gray-300"
                    )}>
                      {index + 1}
                    </div>
                    <span className="font-medium">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {index === 0 && !isMultipleWinners && (
                      <Medal className="w-4 h-4 text-yellow-500" />
                    )}
                    <span className="font-semibold">{player.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button className="w-full sm:w-auto gap-2" onClick={onRestart}>
            <RotateCcw className="w-4 h-4" />
            Main Lagi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GameCompleteModal;
