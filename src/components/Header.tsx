
import React from 'react';
import { User, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useIsMobile } from '@/hooks/use-mobile';
import { Link } from 'react-router-dom';

interface HeaderProps {
  toggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-10 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <div className="flex items-center gap-3">
          {isMobile && toggleSidebar && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="w-5 h-5" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-bold text-speakup-blue">
              Speak<span className="text-speakup-purple">Up</span>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/register">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Register
            </Button>
          </Link>
          <Link to="/admin/challenges">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Admin
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-speakup-gray">
            <Bell className="w-5 h-5" />
          </Button>
          <Avatar className="w-8 h-8 transition-transform hover:scale-110">
            <AvatarImage src="" />
            <AvatarFallback className="bg-speakup-purple text-white">
              <User className="w-4 h-4" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
