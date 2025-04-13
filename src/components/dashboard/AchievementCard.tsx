
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  title: string;
  description: string;
  progress: number;
  icon: LucideIcon;
  completed: boolean;
  iconBgColor?: string;
  iconColor?: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  title,
  description,
  progress,
  icon: Icon,
  completed,
  iconBgColor = "bg-blue-100",
  iconColor = "text-speakup-blue"
}) => {
  return (
    <Card className={cn(
      "border transition-all duration-300",
      completed ? "border-speakup-green shadow-md" : "border-gray-200"
    )}>
      <CardContent className="pt-6">
        <div className="flex items-start mb-3">
          <div className={cn("p-3 rounded-lg mr-3", iconBgColor)}>
            <Icon className={cn("w-5 h-5", iconColor)} />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-speakup-dark">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          
          {completed && (
            <div className="ml-2 flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
              <Check className="w-3 h-3 text-green-600" />
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className={cn(
            completed ? "text-speakup-green" : "text-speakup-blue"
          )} />
        </div>
      </CardContent>
    </Card>
  );
};

import { Check } from 'lucide-react';

export default AchievementCard;
