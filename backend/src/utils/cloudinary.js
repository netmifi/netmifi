const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'netmifi',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mov'],
        resource_type: 'auto'
    }
});

// Configure multer
const upload = multer({ storage: storage });

// Function to upload file to Cloudinary
const uploadToCloudinary = async (file, folder) => {
    try {
        const result = await cloudinary.uploader.upload(file, {
            folder: `netmifi/${folder}`,
            resource_type: 'auto'
        });
        return result;
    } catch (error) {
        throw new Error('Error uploading to Cloudinary: ' + error.message);
    }
};

// Function to delete file from Cloudinary
const deleteFromCloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result;
    } catch (error) {
        throw new Error('Error deleting from Cloudinary: ' + error.message);
    }
};

module.exports = {
    upload,
    uploadToCloudinary,
    deleteFromCloudinary
}; 