
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import TopicCard from '@/components/challenge/TopicCard';
import ChallengeTimer from '@/components/challenge/ChallengeTimer';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Award, Check, ChevronLeft, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ChallengePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stage, setStage] = useState<'intro' | 'recording' | 'completed'>('intro');
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const currentChallenge = {
    title: "Describe Your Hometown",
    prompt: "Talk about what makes your hometown special. Describe the places, people, and why you like or dislike living there. What would you recommend visitors to see and do?",
    difficulty: "easy",
    duration: 120, // in seconds
    xpReward: 100,
    tips: [
      "Start with a brief introduction of your hometown (name, location)",
      "Use descriptive vocabulary to paint a picture",
      "Include both advantages and challenges of living there",
      "End with a personal reflection on what your hometown means to you"
    ]
  };
  
  const handleComplete = () => {
    setStage('completed');
    toast({
      title: "Challenge completed!",
      description: "You've earned 100 XP and continued your streak!",
    });
  };
  
  const handleCancel = () => {
    setStage('intro');
    toast({
      description: "Challenge canceled. You can try again.",
      variant: "destructive",
    });
  };
  
  const handleBackToDashboard = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-4 lg:p-6 lg:ml-64 transition-all duration-300">
          <div className="container mx-auto max-w-3xl">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={handleBackToDashboard}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back to Dashboard
            </Button>
            
            {stage === 'intro' && (
              <div className="space-y-6">
                <TopicCard 
                  title={currentChallenge.title}
                  prompt={currentChallenge.prompt}
                  difficulty={currentChallenge.difficulty as 'easy' | 'medium' | 'hard'}
                  tips={currentChallenge.tips}
                />
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="bg-speakup-blue hover:bg-speakup-blue/90"
                    onClick={() => setStage('recording')}
                  >
                    Start Speaking Challenge
                  </Button>
                </div>
              </div>
            )}
            
            {stage === 'recording' && (
              <div className="space-y-6">
                <TopicCard 
                  title={currentChallenge.title}
                  prompt={currentChallenge.prompt}
                  difficulty={currentChallenge.difficulty as 'easy' | 'medium' | 'hard'}
                  tips={currentChallenge.tips}
                />
                
                <ChallengeTimer 
                  duration={currentChallenge.duration}
                  onComplete={handleComplete}
                  onCancel={handleCancel}
                />
              </div>
            )}
            
            {stage === 'completed' && (
              <Card className="border-2 border-green-500 shadow-md animate-bounce-in">
                <CardHeader className="pb-2 text-center">
                  <CardTitle className="text-xl text-green-600 flex items-center justify-center">
                    <Check className="w-5 h-5 mr-2" />
                    Challenge Completed!
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="text-center">
                  <div className="flex items-center justify-center my-4">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                      <Award className="w-10 h-10 text-green-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-1">Great job speaking today!</h3>
                  <p className="text-gray-600 mb-4">You've completed today's challenge and maintained your streak.</p>
                  
                  <div className="flex items-center justify-center gap-6 my-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">XP Earned</p>
                      <div className="flex items-center justify-center">
                        <Star className="w-5 h-5 text-speakup-purple mr-1" />
                        <span className="text-xl font-bold">{currentChallenge.xpReward}</span>
                      </div>
                    </div>
                    
                    <Separator orientation="vertical" className="h-10" />
                    
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Streak</p>
                      <div className="flex items-center justify-center">
                        <Award className="w-5 h-5 text-speakup-orange mr-1" />
                        <span className="text-xl font-bold">8 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-center gap-3">
                  <Button
                    onClick={handleBackToDashboard}
                    className="bg-speakup-blue hover:bg-speakup-blue/90"
                  >
                    Back to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChallengePage;
