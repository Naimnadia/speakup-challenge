
import React from 'react';
import { Home, Trophy, Users, Star, Calendar, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Challenges', active: false },
    { icon: Star, label: 'Achievements', active: false },
    { icon: Trophy, label: 'Streaks', active: false },
    { icon: Users, label: 'Leaderboard', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 z-20 bg-black/50 transition-opacity"
          onClick={onClose}
        />
      )}
    
      <aside 
        className={cn(
          "fixed top-0 left-0 z-30 w-64 h-full bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out transform lg:relative lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 px-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-speakup-blue">Speak<span className="text-speakup-purple">Up</span></h1>
          </div>
          
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {menuItems.map((item, index) => (
              <Button
                key={index}
                variant={item.active ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-medium",
                  item.active 
                    ? "bg-speakup-blue text-white hover:bg-speakup-blue/90" 
                    : "text-speakup-dark hover:bg-gray-100"
                )}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            ))}
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center p-3 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 p-2 bg-speakup-blue rounded-full">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-speakup-dark">Current Streak</p>
                <p className="text-xl font-bold text-speakup-blue">7 days</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
