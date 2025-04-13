
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, Clock, Play, Star } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800',
    'medium': 'bg-orange-100 text-orange-800',
    'hard': 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className="border-2 border-speakup-blue shadow-md hover:shadow-lg transition-shadow bg-purple-100 w-full">
      <CardHeader className={`pb-2 bg-slate-50 rounded-sm ${isMobile ? 'p-3' : ''}`}>
        <div className="flex justify-between items-start">
          <CardTitle className={`font-bold text-[#db0189] ${isMobile ? 'text-lg' : 'text-xl'}`}>
            {title}
          </CardTitle>
          <Badge className={`${difficultyColors[difficulty]} ${isMobile ? 'text-xs' : ''}`} variant="outline">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className={`bg-slate-50 ${isMobile ? 'p-3 pt-0' : ''}`}>
        <p className={`text-gray-600 mb-4 ${isMobile ? 'text-sm' : ''}`}>{description}</p>
        
        <div className={`flex items-center space-x-4 text-gray-500 mb-2 ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <div className="flex items-center">
            <Clock className={`mr-1 text-speakup-gray ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span>{timeEstimate}</span>
          </div>
          <div className="flex items-center">
            <Mic className={`mr-1 text-speakup-gray ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
            <span>Speaking</span>
          </div>
        </div>
        
        <div className={`flex items-center font-medium text-speakup-purple ${isMobile ? 'text-xs' : 'text-sm'}`}>
          <Star className={`mr-1 ${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} />
          <span className="text-[#e20eb7]">{xpReward} XP Reward</span>
        </div>
      </CardContent>
      
      <CardFooter className={`rounded-xl bg-slate-50 ${isMobile ? 'p-3 pt-0' : ''}`}>
        <Button 
          onClick={onStart} 
          className={`w-full group text-slate-50 font-medium bg-[#e40f72] ${isMobile ? 'text-sm py-1' : ''}`}
        >
          <Play className={`group-hover:animate-pulse ${isMobile ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-2'}`} />
          Start Challenge
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyChallenge;
