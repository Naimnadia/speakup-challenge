
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Mic } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TopicCardProps {
  title: string;
  prompt: string;
  difficulty: 'easy' | 'medium' | 'hard';
  tips?: string[];
}

const TopicCard: React.FC<TopicCardProps> = ({
  title,
  prompt,
  difficulty,
  tips = []
}) => {
  const difficultyColors = {
    'easy': 'bg-green-100 text-green-800',
    'medium': 'bg-orange-100 text-orange-800',
    'hard': 'bg-red-100 text-red-800'
  };
  
  return (
    <Card className="border shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="flex items-center text-lg font-bold text-speakup-dark">
            <MessageSquare className="w-5 h-5 mr-2 text-speakup-blue" />
            {title}
          </CardTitle>
          <Badge className={difficultyColors[difficulty]} variant="outline">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-speakup-dark">{prompt}</p>
        </div>
        
        {tips.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-speakup-dark">Speaking Tips:</p>
            <ul className="space-y-1 text-sm text-gray-600">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-speakup-blue mr-2">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="mt-4 flex items-center text-sm text-gray-500">
          <Mic className="w-4 h-4 mr-1 text-speakup-gray" />
          <span>Speak clearly and at a natural pace</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default TopicCard;
