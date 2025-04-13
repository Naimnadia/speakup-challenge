import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Clock, Play } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
interface DailyChallengeProps {
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeEstimate: string;
  xpReward: number;
  onStart: () => void;
}
const DailyChallenge: React.FC<DailyChallengeProps> = ({
  title,
  description,
  difficulty,
  timeEstimate,
  xpReward,
  onStart
}) => {
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800',
    'medium': 'bg-orange-100 text-orange-800',
    'hard': 'bg-red-100 text-red-800'
  };
  return <Card className="border-2 border-speakup-blue shadow-md hover:shadow-lg transition-shadow bg-purple-100">
      <CardHeader className="pb-2 bg-slate-50">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold text-speakup-dark">{title}</CardTitle>
          <Badge className={difficultyColors[difficulty]} variant="outline">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="bg-slate-50">
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1 text-speakup-gray" />
            <span>{timeEstimate}</span>
          </div>
          <div className="flex items-center">
            <Mic className="w-4 h-4 mr-1 text-speakup-gray" />
            <span>Speaking</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm font-medium text-speakup-purple">
          <Star className="w-4 h-4 mr-1" />
          <span>{xpReward} XP Reward</span>
        </div>
      </CardContent>
      
      <CardFooter className="bg-slate-50">
        <Button onClick={onStart} className="w-full group bg-blue-950 hover:bg-blue-800 text-slate-50 font-medium">
          <Play className="w-4 h-4 mr-2 group-hover:animate-pulse" />
          Start Challenge
        </Button>
      </CardFooter>
    </Card>;
};

// Add missing Star import
import { Star } from 'lucide-react';
export default DailyChallenge;