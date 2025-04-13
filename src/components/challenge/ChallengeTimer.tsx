
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Mic, MicOff, Play, Square } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface ChallengeTimerProps {
  duration: number; // in seconds
  onComplete: () => void;
  onCancel: () => void;
}

const ChallengeTimer: React.FC<ChallengeTimerProps> = ({
  duration,
  onComplete,
  onCancel
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (isRecording && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((prev) => {
          const newTime = prev - 1;
          setProgress(((duration - newTime) / duration) * 100);
          return newTime;
        });
      }, 1000);
    } else if (timeRemaining === 0) {
      onComplete();
    }
    
    return () => clearInterval(interval);
  }, [isRecording, timeRemaining, duration, onComplete]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const toggleRecording = () => {
    setIsRecording((prev) => !prev);
  };
  
  const handleCancel = () => {
    setIsRecording(false);
    onCancel();
  };
  
  return (
    <Card className="border shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-center mb-4">
          <div className={cn(
            "w-24 h-24 rounded-full flex items-center justify-center transition-all",
            isRecording ? "bg-red-100 animate-pulse" : "bg-gray-100"
          )}>
            <Clock className="w-10 h-10 text-speakup-blue" />
          </div>
        </div>
        
        <div className="text-center mb-4">
          <p className="text-3xl font-bold">{formatTime(timeRemaining)}</p>
          <p className="text-sm text-gray-500">
            {isRecording ? "Recording..." : "Ready to start"}
          </p>
        </div>
        
        <Progress value={progress} className="mb-4" />
        
        <div className="flex gap-3">
          <Button
            variant={isRecording ? "destructive" : "default"}
            className="flex-1"
            onClick={toggleRecording}
          >
            {isRecording ? (
              <>
                <Square className="w-4 h-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                Start
              </>
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            disabled={!isRecording}
            className={cn(
              isRecording ? "text-red-600 animate-pulse" : "text-gray-500"
            )}
          >
            {isRecording ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChallengeTimer;
