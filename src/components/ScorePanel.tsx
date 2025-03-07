
import React from 'react';
import { Button } from '@/components/ui/button';
import { Clock, RotateCcw } from 'lucide-react';
import { formatTime } from '@/utils/gameUtils';

interface ScorePanelProps {
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  timer: number;
  onRestart: () => void;
}

const ScorePanel: React.FC<ScorePanelProps> = ({ 
  moves, 
  matchedPairs, 
  totalPairs,
  timer,
  onRestart 
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-white/80 backdrop-blur-md rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 font-medium">Langkah</span>
          <span className="text-2xl font-semibold text-gray-800">{moves}</span>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 font-medium">Pasangan</span>
          <span className="text-2xl font-semibold text-gray-800">
            {matchedPairs}/{totalPairs}
          </span>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-full">
          <Clock className="w-4 h-4 text-gray-600" />
          <span className="font-mono font-medium">{formatTime(timer)}</span>
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="gap-2 border-gray-200 hover:bg-gray-50 transition-all duration-300"
        onClick={onRestart}
      >
        <RotateCcw className="w-4 h-4" />
        Mulai Ulang
      </Button>
    </div>
  );
};

export default ScorePanel;
