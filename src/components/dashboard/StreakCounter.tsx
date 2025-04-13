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
  return <Card className="border shadow-sm">
      
      
      
    </Card>;
};
export default StreakCounter;