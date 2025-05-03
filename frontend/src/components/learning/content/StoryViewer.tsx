import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface StoryViewerProps {
  content: string;
  onComplete: () => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({ content, onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  // Split content into pages
  useEffect(() => {
    // In a real implementation, this would use a more sophisticated algorithm
    // to split content into pages based on length, paragraphs, etc.
    const contentPages = content.split('\n\n').filter(page => page.trim() !== '');
    setPages(contentPages);
  }, [content]);
  
  // Update progress
  useEffect(() => {
    if (pages.length > 0) {
      const progressPercent = ((currentPage + 1) / pages.length) * 100;
      setProgress(progressPercent);
      
      // Check if story is completed (read at least 90%)
      if (progressPercent >= 90 && !hasCompleted) {
        setHasCompleted(true);
        onComplete();
      }
    }
  }, [currentPage, pages, hasCompleted, onComplete]);
  
  // Navigate to next page
  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Navigate to previous page
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  if (pages.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Story Progress</span>
          <span className="text-sm text-gray-500">
            Page {currentPage + 1} of {pages.length}
          </span>
        </div>
        <Progress value={progress} />
      </div>
      
      {/* Story content */}
      <Card>
        <CardHeader>
          <CardTitle>Story</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose prose-lg max-w-none min-h-[300px]">
            {pages[currentPage]}
          </div>
          
          {/* Navigation */}
          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline"
              onClick={goToPreviousPage}
              disabled={currentPage === 0}
              className="flex items-center gap-2"
            >
              <ChevronLeft size={16} />
              Previous
            </Button>
            
            <Button
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === pages.length - 1}
              className="flex items-center gap-2"
            >
              Next
              <ChevronRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 