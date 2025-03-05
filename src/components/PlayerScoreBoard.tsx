
import React from 'react';
import { Trophy } from 'lucide-react';
import { Player } from '@/utils/gameUtils';
import { cn } from '@/lib/utils';

interface PlayerScoreBoardProps {
  players: Player[];
}

const PlayerScoreBoard: React.FC<PlayerScoreBoardProps> = ({ players }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
      {players.map((player) => (
        <div 
          key={player.id}
          className={cn(
            "flex items-center justify-between p-3 rounded-xl border transition-all",
            player.isActive 
              ? "border-primary bg-primary/10 shadow-sm" 
              : "border-gray-200 bg-white"
          )}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center",
              player.isActive ? "bg-primary text-white" : "bg-gray-100 text-gray-500"
            )}>
              {player.id}
            </div>
            <span className="font-medium truncate">{player.name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Trophy className={cn(
              "w-4 h-4",
              player.isActive ? "text-primary" : "text-gray-400"
            )} />
            <span className="text-lg font-semibold">{player.score}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PlayerScoreBoard;
