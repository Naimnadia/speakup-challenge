
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
          Your Streak
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-between mb-6">
          <div className="text-center">
            <p className="text-sm text-gray-500">Current</p>
            <div className="flex items-center justify-center mt-1">
              <Flame className={cn(
                "w-5 h-5 mr-1",
                currentStreak > 0 ? "text-speakup-orange" : "text-gray-400"
              )} />
              <span className="text-2xl font-bold">{currentStreak}</span>
              <span className="text-sm text-gray-500 ml-1">days</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500">Longest</p>
            <div className="flex items-center justify-center mt-1">
              <Flame className="w-5 h-5 mr-1 text-speakup-orange" />
              <span className="text-2xl font-bold">{longestStreak}</span>
              <span className="text-sm text-gray-500 ml-1">days</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          {weekProgress.map((completed, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center mb-1",
                completed 
                  ? "bg-speakup-orange text-white" 
                  : "bg-gray-100 text-gray-400"
              )}>
                <span className="text-xs font-medium">{dayNames[index]}</span>
              </div>
              <div className={cn(
                "w-2 h-2 rounded-full",
                completed ? "bg-speakup-orange" : "bg-gray-200"
              )} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StreakCounter;
