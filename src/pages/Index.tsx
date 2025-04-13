import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import StatsCard from '@/components/dashboard/StatsCard';
import DailyChallenge from '@/components/dashboard/DailyChallenge';
import StreakCounter from '@/components/dashboard/StreakCounter';
import LeaderboardCard from '@/components/dashboard/LeaderboardCard';
import LevelProgress from '@/components/dashboard/LevelProgress';
import AchievementCard from '@/components/dashboard/AchievementCard';
import { useIsMobile } from '@/hooks/use-mobile';
import { Mic, Star, Trophy, Clock, Award, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Sample data
  const mockLeaderboard = [
    {
      id: 1,
      name: 'Sarah Johnson',
      xp: 1250,
      position: 1,
      isCurrentUser: false
    },
    {
      id: 2,
      name: 'David Chen',
      xp: 1120,
      position: 2,
      isCurrentUser: false
    },
    {
      id: 3,
      name: 'You',
      xp: 980,
      position: 3,
      isCurrentUser: true
    },
    {
      id: 4,
      name: 'Michael Brown',
      xp: 840,
      position: 4,
      isCurrentUser: false
    },
    {
      id: 5,
      name: 'Emily Davis',
      xp: 720,
      position: 5,
      isCurrentUser: false
    }
  ];

  const dailyChallenges = [
    {
      title: "Describe Your Hometown",
      description: "Talk about what makes your hometown special. Describe places, people, and why you like or dislike living there.",
      difficulty: "easy",
      timeEstimate: "2-3 min",
      xpReward: 100
    },
    {
      title: "Technology's Impact",
      description: "Discuss how technology has changed your life. Focus on both positive and negative impacts.",
      difficulty: "medium",
      timeEstimate: "3-4 min",
      xpReward: 150
    }
  ];

  const achievements = [
    {
      title: "Early Bird",
      description: "Complete 5 daily challenges",
      progress: 60,
      completed: false,
      icon: Award,
      iconBgColor: "bg-purple-100",
      iconColor: "text-speakup-purple"
    },
    {
      title: "Consistent Speaker",
      description: "Maintain a 7-day streak",
      progress: 100,
      completed: true,
      icon: Mic,
      iconBgColor: "bg-blue-100",
      iconColor: "text-speakup-blue"
    }
  ];

  const handleStartChallenge = () => {
    navigate('/challenge/daily');
    toast({
      title: "Challenge started!",
      description: "Good luck with today's speaking challenge."
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 lg:p-6 lg:ml-64 transition-all duration-300">
          <div className="container mx-auto">
            {/* Welcome and level progress */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-speakup-dark mb-2">Welcome back!</h1>
              <LevelProgress currentLevel={4} xp={350} xpToNextLevel={500} />
            </div>
            
            {/* Stats row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <StatsCard title="Total XP" value="1,350" icon={Star} trend={{
                value: 12,
                isPositive: true
              }} iconColor="text-speakup-purple" />
              <StatsCard title="Current Streak" value="7 days" icon={Trophy} iconColor="text-speakup-orange" />
              <StatsCard title="Speaking Time" value="45 min" icon={Clock} trend={{
                value: 8,
                isPositive: true
              }} />
            </div>
            
            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - challenges */}
              <div className="lg:col-span-2 space-y-6">
                <div>
                  <h2 className="text-lg font-semibold text-speakup-dark mb-3 flex items-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-speakup-blue" />
                    Today's Challenges
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dailyChallenges.map((challenge, index) => (
                      <DailyChallenge 
                        key={index} 
                        title={challenge.title} 
                        description={challenge.description} 
                        difficulty={challenge.difficulty as 'easy' | 'medium' | 'hard'} 
                        timeEstimate={challenge.timeEstimate} 
                        xpReward={challenge.xpReward} 
                        onStart={handleStartChallenge} 
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-speakup-dark mb-3 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-speakup-purple" />
                    Achievements
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => (
                      <AchievementCard 
                        key={index} 
                        title={achievement.title} 
                        description={achievement.description} 
                        progress={achievement.progress} 
                        icon={achievement.icon} 
                        completed={achievement.completed} 
                        iconBgColor={achievement.iconBgColor} 
                        iconColor={achievement.iconColor} 
                      />
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    
                  </div>
                </div>
              </div>
              
              {/* Right column - streak and leaderboard */}
              <div className="space-y-6">
                <StreakCounter currentStreak={7} longestStreak={10} weekProgress={[true, true, true, true, true, true, true]} />
                <LeaderboardCard users={mockLeaderboard} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
