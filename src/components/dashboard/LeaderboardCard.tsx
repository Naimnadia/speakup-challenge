
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface LeaderboardUser {
  id: number;
  name: string;
  avatar?: string;
  xp: number;
  position: number;
  isCurrentUser: boolean;
}

interface LeaderboardCardProps {
  users: LeaderboardUser[];
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ users }) => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center">
          <Users className="w-5 h-5 mr-2 text-speakup-blue" />
          Leaderboard
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {users.map((user) => (
            <div 
              key={user.id}
              className={cn(
                "flex items-center p-2 rounded-lg",
                user.isCurrentUser ? "bg-blue-50" : ""
              )}
            >
              <div className="flex items-center justify-center w-6 mr-3">
                <span 
                  className={cn(
                    "font-semibold text-sm",
                    user.position <= 3 ? "text-speakup-blue" : "text-gray-500"
                  )}
                >
                  {user.position}
                </span>
              </div>
              
              <Avatar className="h-8 w-8 mr-3">
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-speakup-purple text-white text-xs">
                  {user.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className={cn(
                  "font-medium text-sm",
                  user.isCurrentUser ? "text-speakup-blue" : "text-speakup-dark"
                )}>
                  {user.name} {user.isCurrentUser && "(You)"}
                </p>
              </div>
              
              <div className="flex items-center">
                <span className="text-sm font-semibold">{user.xp}</span>
                <span className="text-xs text-gray-500 ml-1">XP</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LeaderboardCard;
