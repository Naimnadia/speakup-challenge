import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Star } from 'lucide-react';
interface LevelProgressProps {
  currentLevel: number;
  xp: number;
  xpToNextLevel: number;
}
const LevelProgress: React.FC<LevelProgressProps> = ({
  currentLevel,
  xp,
  xpToNextLevel
}) => {
  const progressPercentage = Math.min(100, Math.round(xp / xpToNextLevel * 100));
  return <Card className="border-0 shadow-none bg-gradient-to-r from-blue-50 to-purple-50">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center mr-3 bg-[#e505b7]">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Current Level</p>
              <p className="text-lg font-bold text-speakup-blue">{currentLevel}</p>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-500">XP</p>
            <p className="text-lg font-bold text-speakup-purple">
              {xp}/{xpToNextLevel}
            </p>
          </div>
        </div>
        
        <div className="space-y-1">
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex justify-between text-xs text-gray-500">
            <span>Level {currentLevel}</span>
            <span>Level {currentLevel + 1}</span>
          </div>
        </div>
      </CardContent>
    </Card>;
};
export default LevelProgress;