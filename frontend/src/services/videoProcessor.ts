import { v4 as uuidv4 } from 'uuid';

export interface VideoSection {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  startTime: number;
  endTime: number;
  duration: number; // in minutes
  xpReward: number;
  order: number;
}

export interface ProcessedVideo {
  totalDuration: number; // in minutes
  sections: VideoSection[];
  totalXp: number;
}

export interface ProcessingProgress {
  stage: 'validating' | 'processing' | 'complete';
  progress: number;
  message: string;
}

/**
 * Service for processing videos and creating course sections
 */
export class VideoProcessor {
  private videoUrl: string;
  private baseXpPerMinute: number = 10; // Base XP per minute of video content
  private minSectionDuration: number = 5; // Minimum section duration in minutes
  private maxSectionDuration: number = 30; // Maximum section duration in minutes
  private maxFileSize: number = 500 * 1024 * 1024; // 500MB
  private allowedFormats: string[] = ['video/mp4', 'video/webm', 'video/quicktime'];

  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
  }

  /**
   * Validate a video file
   * @param file The video file to validate
   * @returns Promise with validation result
   */
  public async validateVideo(file: File): Promise<{ valid: boolean; message: string }> {
    // Check file size
    if (file.size > this.maxFileSize) {
      return {
        valid: false,
        message: 'Video file is too large. Maximum size is 500MB.'
      };
    }

    // Check file format
    if (!this.allowedFormats.includes(file.type)) {
      return {
        valid: false,
        message: 'Invalid video format. Supported formats: MP4, WebM, QuickTime'
      };
    }

    // Check if file is actually a video
    try {
      const duration = await this.getVideoDuration(file);
      if (duration <= 0) {
        return {
          valid: false,
          message: 'Invalid video file. Could not determine duration.'
        };
      }
    } catch (error) {
      return {
        valid: false,
        message: 'Invalid video file. Could not process video metadata.'
      };
    }

    return {
      valid: true,
      message: 'Video file is valid'
    };
  }

  /**
   * Process a video and split it into sections based on duration
   * @param videoFile The video file to process
   * @param courseTitle The title of the course
   * @param onProgress Callback for progress updates
   * @returns Promise with the processed video data
   */
  public async processVideo(
    videoFile: File,
    courseTitle: string,
    onProgress?: (progress: ProcessingProgress) => void
  ): Promise<ProcessedVideo> {
    try {
      // Validate video
      onProgress?.({
        stage: 'validating',
        progress: 0,
        message: 'Validating video file...'
      });

      const validation = await this.validateVideo(videoFile);
      if (!validation.valid) {
        throw new Error(validation.message);
      }

      // Get video duration
      onProgress?.({
        stage: 'processing',
        progress: 20,
        message: 'Processing video metadata...'
      });

      const duration = await this.getVideoDuration(videoFile);
      const totalDuration = Math.ceil(duration / 60); // Convert to minutes
      
      // Calculate number of sections based on duration
      const numSections = this.calculateNumberOfSections(totalDuration);
      
      // Calculate XP per section
      const totalXp = totalDuration * this.baseXpPerMinute;
      const xpPerSection = Math.round(totalXp / numSections);
      
      // Create sections
      onProgress?.({
        stage: 'processing',
        progress: 40,
        message: 'Creating course sections...'
      });

      const sections: VideoSection[] = [];
      const sectionDuration = totalDuration / numSections;
      
      for (let i = 0; i < numSections; i++) {
        const startTime = i * sectionDuration * 60; // Convert back to seconds
        const endTime = (i + 1) * sectionDuration * 60;
        
        // Generate a more descriptive title based on section number and duration
        const title = this.generateSectionTitle(courseTitle, i + 1, numSections, sectionDuration);
        
        sections.push({
          id: uuidv4(),
          title,
          description: `Section ${i + 1} of ${numSections} - ${Math.round(sectionDuration)} minutes`,
          videoUrl: URL.createObjectURL(videoFile),
          startTime,
          endTime,
          duration: sectionDuration,
          xpReward: xpPerSection,
          order: i + 1
        });

        // Update progress
        onProgress?.({
          stage: 'processing',
          progress: 40 + ((i + 1) / numSections) * 60,
          message: `Creating section ${i + 1} of ${numSections}...`
        });
      }
      
      onProgress?.({
        stage: 'complete',
        progress: 100,
        message: 'Video processing complete'
      });

      return {
        totalDuration,
        sections,
        totalXp
      };
    } catch (error) {
      console.error('Error processing video:', error);
      throw new Error(error instanceof Error ? error.message : 'Failed to process video');
    }
  }
  
  /**
   * Get the duration of a video file
   * @param videoFile The video file
   * @returns Promise with the duration in seconds
   */
  private getVideoDuration(videoFile: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        resolve(video.duration);
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        reject(new Error('Failed to load video metadata'));
      };
      
      video.src = URL.createObjectURL(videoFile);
    });
  }
  
  /**
   * Calculate the number of sections based on total duration
   * @param totalDuration Total duration in minutes
   * @returns Number of sections
   */
  private calculateNumberOfSections(totalDuration: number): number {
    // For videos under 30 minutes, create one section
    if (totalDuration <= this.maxSectionDuration) {
      return 1;
    }
    
    // For longer videos, split into sections of max 30 minutes
    return Math.ceil(totalDuration / this.maxSectionDuration);
  }

  /**
   * Generate a descriptive section title
   * @param courseTitle The course title
   * @param sectionNumber The section number
   * @param totalSections Total number of sections
   * @param duration Section duration in minutes
   * @returns Generated section title
   */
  private generateSectionTitle(
    courseTitle: string,
    sectionNumber: number,
    totalSections: number,
    duration: number
  ): string {
    const durationStr = Math.round(duration) === 1 ? '1 minute' : `${Math.round(duration)} minutes`;
    return `${courseTitle} - Part ${sectionNumber} (${durationStr})`;
  }
  
  /**
   * Update section titles and descriptions
   * @param sections The sections to update
   * @param titles Array of section titles
   * @param descriptions Array of section descriptions
   * @returns Updated sections
   */
  public updateSectionDetails(
    sections: VideoSection[], 
    titles: string[], 
    descriptions: string[]
  ): VideoSection[] {
    return sections.map((section, index) => ({
      ...section,
      title: titles[index] || section.title,
      description: descriptions[index] || section.description
    }));
  }
} 