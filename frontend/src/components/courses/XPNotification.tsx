import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Medal, Award } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface XPNotificationProps {
  xp: number;
  type: 'achievement' | 'level_up' | 'course_complete' | 'leaderboard';
  message: string;
  onClose: () => void;
}

const XPNotification = ({ xp, type, message, onClose }: XPNotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getIcon = () => {
    switch (type) {
      case 'achievement':
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 'level_up':
        return <Star className="w-6 h-6 text-blue-500" />;
      case 'course_complete':
        return <Medal className="w-6 h-6 text-green-500" />;
      case 'leaderboard':
        return <Award className="w-6 h-6 text-purple-500" />;
      default:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-4 right-4 bg-background p-4 rounded-lg shadow-lg border border-border max-w-sm"
        >
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {getIcon()}
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg">{message}</h3>
              <p className="text-muted-foreground">+{xp} XP</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsVisible(false);
                onClose();
              }}
            >
              ×
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default XPNotification; 