import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const uploadDirs = {
  thumbnails: 'uploads/thumbnails',
  videos: 'uploads/videos',
  images: 'uploads/images',
};

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage for thumbnails
const thumbnailStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirs.thumbnails);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'thumbnail-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Configure storage for videos
const videoStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirs.videos);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Configure storage for images
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirs.images);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'image-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for thumbnails
const thumbnailFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed for thumbnails'));
  }
};

// File filter for videos
const videoFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only video files are allowed'));
  }
};

// File filter for images
const imageFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'));
  }
};

// Create upload middleware
export const upload = {
  thumbnail: multer({
    storage: thumbnailStorage,
    fileFilter: thumbnailFilter,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB limit for thumbnails
    },
  }),
  video: multer({
    storage: videoStorage,
    fileFilter: videoFilter,
    limits: {
      fileSize: 500 * 1024 * 1024, // 500MB limit for videos
    },
  }),
  image: multer({
    storage: imageStorage,
    fileFilter: imageFilter,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB limit for images
    },
  }),
};

// Helper function to delete files
export const deleteFile = (filePath: string) => {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
};

// Helper function to get file URL
export const getFileUrl = (filePath: string) => {
  if (!filePath) return null;
  return `${process.env.BASE_URL}/${filePath}`;
}; 