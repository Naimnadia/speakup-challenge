
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
  weekProgress: boolean[];
}

const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  longestStreak,
  weekProgress
}) => {
  const dayNames = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Flame className="w-5 h-5 mr-2 text-speakup-orange" />
          Streak
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-sm text-gray-500">Current</p>
            <p className="text-2xl font-bold text-speakup-orange">{currentStreak} days</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Longest</p>
            <p className="text-lg font-semibold">{longestStreak} days</p>
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {weekProgress.map((isComplete, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                isComplete 
                  ? "bg-speakup-orange text-white" 
                  : "bg-gray-100 text-gray-400"
              )}>
                <Flame className={cn(
                  "w-4 h-4",
                  isComplete ? "text-white" : "text-gray-400"
                )} />
              </div>
              <span className="text-xs text-gray-500">{dayNames[index]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
