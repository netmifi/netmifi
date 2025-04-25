// this file handles user business login like updates, profiles, getting user

const { queryState } = require('../constants/queryState');
const User = require('../models/User');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken');
const { cookieOptions } = require('../constants/cookieOptions');
const { parseSafeUserData } = require('../utils');
const fs = require('fs/promises');
const fsSync = require('fs');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const { authCookieService } = require('../services/cookieService');
const SALT_ROUNDS = 12;
const Leaderboard = require('../models/Leaderboard');

const storage = multer.diskStorage({
    // multer storage for user profile photo and cover photo
    destination: (req, file, cb) => {
        console.log(file.fieldname);
        const destinationPath =
            file.fieldname == 'cover'
                ? path.join(__dirname, '..', 'uploads', 'cover')
                : file.fieldname == 'profile' ? path.join(__dirname, '..', 'uploads', 'profile') : null;
        cb(null, destinationPath);
    },

    filename: (req, file, cb) => {
        const filename = `${req.user.username}-${Date.now()}${path.extname(file.originalname)}`;
        cb(null, filename);
    },
});

const upload = multer({ storage });

const handleFindUser = async (req, res) => {
    // this function gets th currently logged in user
    try {
        const { id } = req.body;
        const user = await User.findById(id);

        if (!user) {
            res.status(500).json({
                message: 'user not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        const safeUser = parseSafeUserData(user);

        res.status(201).json({
            message: 'user found',
            state: queryState.success,
            data: safeUser,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}

const handleCheckUserAuth = async (req, res) => {
    // this function checks if current user is signed in
    //  it has extra features compared to the verifyJWT middleware
    try {
        const foundUser = await User.findById(req.user.id);
        console.log(req.user);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        const safeUserData = parseSafeUserData(foundUser);
        authCookieService(res, foundUser);

        res.status(200).json({
            message: 'user found',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}


// th e update profile function handles profile updates including profile image and cover image
const updateProfile = [upload.any(), async (req, res) => {
    let uploadedFiles = {};
    try {
        const { phone, country, residentialAddress, facebook, instagram, tiktok, youtube, website, about } = req.body;

        const existingPhoneNumber = await User.findOne({ phone });
        console.log(existingPhoneNumber)
        if (existingPhoneNumber && existingPhoneNumber._id !== req.user.id) {
            res.status(409).json({
                message: 'phone number already exists',
                state: queryState.error,
                data: undefined
            }); return;
        }

        if (req.files) {
            req.files.forEach((file) => {
                uploadedFiles[file.fieldname] = file.filename;
            });
        }
        console.log("files", uploadedFiles);
        const foundUser = await User.findById(req.user.id);
        const profilePath = path.join(__dirname, '..', 'uploads', 'profile', foundUser.profile ?? "");
        const coverPath = path.join(__dirname, '..', 'uploads', 'cover', foundUser.cover ?? "");
        if (uploadedFiles.profile && foundUser.profile && fsSync.existsSync(String(profilePath))) await fs.unlink(profilePath);
        if (uploadedFiles.cover && foundUser.cover && fsSync.existsSync(String(coverPath))) await fs.unlink(coverPath);

        if (uploadedFiles.profile) foundUser.profile = uploadedFiles.profile;
        if (uploadedFiles.cover) foundUser.cover = uploadedFiles.cover;
        if (phone) foundUser.phone = phone;
        if (country && country.dialCode) foundUser.country = country;
        if (residentialAddress) foundUser.residentialAddress = residentialAddress;
        if (facebook) foundUser.handles.facebook = facebook;
        if (instagram) foundUser.handles.instagram = instagram;
        if (tiktok) foundUser.handles.tiktok = tiktok;
        if (youtube) foundUser.handles.youtube = youtube;
        if (website) foundUser.handles.web = website;
        if (about) foundUser.about = about;

        const result = await foundUser.save();

        const safeUserData = parseSafeUserData(result);
        authCookieService(res, result);

        res.status(202).json({
            message: 'profile update successful',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}];

const updateNewPassword = async (req, res) => {
    // this function handles password change
    // unlike the auth forgotten password, this guy does not send any verification therefore it checks is the current password matches the hashed in the db then updates the password
    try {
        const { currentPassword, newPassword, confirmPassword } = req.body;
        const foundUser = await User.findById(req.user.id);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found',
                state: queryState.error,
                data: undefined
            }); return;
        }

        if (newPassword !== confirmPassword) {
            res.status(409).json({
                message: 'New password does not match confirm password',
                state: queryState.error,
                data: undefined,
            }); return;
        }

        const match = await bcrypt.compare(currentPassword, foundUser.password);

        if (!match) {
            res.status(409).json({
                message: 'Current password is incorrect',
                state: queryState.error,
                data: undefined,
            }); return;
        }


        const newHashedPwd = await bcrypt.hash(confirmPassword, SALT_ROUNDS);
        foundUser.password = newHashedPwd;

        const result = await foundUser.save();
        authCookieService(res, result);

        const safeUserData = parseSafeUserData(result);

        res.status(200).json({
            message: 'user found',
            state: queryState.success,
            data: safeUserData,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}

const changeTheme = async (req, res) => {
    // simply for changing background theme
    try {
        const { theme } = req.body;
        const foundUser = await User.findById(req.user.id);

        if (!foundUser) {
            res.status(404).json({
                message: 'account not found please signin',
                state: queryState.error,
                data: undefined
            }); return;
        }

        foundUser.theme = theme;
        const result = await foundUser.save();

        authCookieService(res, result);

        const safeUserData = parseSafeUserData(result);
        res.status(201).json({
            message: 'user found',
            state: queryState.success,
            data: safeUserData,
        });
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
}

// User Profile Management
const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('enrolledCourses.courseId', 'title thumbnail progress');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateProfileHandler = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: req.body },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateTheme = async (req, res) => {
    try {
        const { theme } = req.body;
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { theme },
            { new: true }
        ).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User Progress Management
const getProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('enrolledCourses.courseId', 'title thumbnail sections');
        res.json(user.enrolledCourses);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getCourseProgress = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courseProgress = user.enrolledCourses.find(
            course => course.courseId.toString() === req.params.courseId
        );
        if (!courseProgress) {
            return res.status(404).json({ message: 'Course progress not found' });
        }
        res.json(courseProgress);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const repeatCourse = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const courseProgressIndex = user.enrolledCourses.findIndex(
            course => course.courseId.toString() === req.params.courseId
        );

        if (courseProgressIndex === -1) {
            return res.status(404).json({ message: 'Course progress not found' });
        }

        // Reset progress
        user.enrolledCourses[courseProgressIndex] = {
            ...user.enrolledCourses[courseProgressIndex],
            currentSection: 0,
            completedSections: [],
            quizScores: [],
            lastAccessed: new Date()
        };

        await user.save();
        res.json(user.enrolledCourses[courseProgressIndex]);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User Level Management
const promoteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update level and rank based on XP
        const newLevel = Math.min(user.level + 1, 100);
        const newRank = calculateRank(newLevel);
        
        user.level = newLevel;
        user.rank = newRank;
        await user.save();

        // Update leaderboard
        await updateLeaderboard(user);

        res.json({ message: 'User promoted successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const demoteUser = async (req, res) => {
    try {
        const { userId } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update level and rank based on XP
        const newLevel = Math.max(user.level - 1, 1);
        const newRank = calculateRank(newLevel);
        
        user.level = newLevel;
        user.rank = newRank;
        await user.save();

        // Update leaderboard
        await updateLeaderboard(user);

        res.json({ message: 'User demoted successfully', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// User Search and Discovery
const searchUsers = async (req, res) => {
    try {
        const { query } = req.query;
        const users = await User.find(
            { $text: { $search: query } },
            { score: { $meta: 'textScore' } }
        )
            .select('-password')
            .sort({ score: { $meta: 'textScore' } });
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getLeaderboard = async (req, res) => {
    try {
        const { type = 'global', courseId } = req.query;
        const leaderboard = await Leaderboard.findOne({
            type,
            courseId,
            status: 'active'
        }).sort('-createdAt');
        res.json(leaderboard);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getAchievements = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .populate('enrolledCourses.courseId', 'title thumbnail');
        
        const achievements = calculateAchievements(user);
        res.json(achievements);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Helper Functions
function calculateRank(level) {
    if (level >= 90) return 'master';
    if (level >= 70) return 'expert';
    if (level >= 50) return 'advanced';
    if (level >= 30) return 'intermediate';
    if (level >= 10) return 'apprentice';
    return 'novice';
}

async function updateLeaderboard(user) {
    const leaderboard = await Leaderboard.findOne({
        type: 'global',
        status: 'active'
    });

    if (leaderboard) {
        const entryIndex = leaderboard.entries.findIndex(
            entry => entry.userId.toString() === user._id.toString()
        );

        const updatedEntry = {
            userId: user._id,
            username: user.username,
            profileImage: user.profile,
            score: user.xp,
            level: user.level,
            rank: user.rank,
            xp: user.xp,
            completedCourses: user.enrolledCourses.filter(course => course.progress === 100).length,
            quizAccuracy: calculateQuizAccuracy(user),
            streak: calculateStreak(user),
            lastActive: new Date()
        };

        if (entryIndex !== -1) {
            leaderboard.entries[entryIndex] = updatedEntry;
        } else {
            leaderboard.entries.push(updatedEntry);
        }

        await leaderboard.save();
    }
}

function calculateQuizAccuracy(user) {
    let totalQuizzes = 0;
    let totalScore = 0;

    user.enrolledCourses.forEach(course => {
        course.quizScores.forEach(quiz => {
            totalQuizzes++;
            totalScore += quiz.score;
        });
    });

    return totalQuizzes > 0 ? totalScore / totalQuizzes : 0;
}

function calculateStreak(user) {
    // Implement streak calculation logic based on user's activity
    return 0; // Placeholder
}

function calculateAchievements(user) {
    const achievements = [];

    // Course completion achievements
    const completedCourses = user.enrolledCourses.filter(course => course.progress === 100).length;
    if (completedCourses >= 1) achievements.push({ type: 'course_completion', level: 'bronze', count: completedCourses });
    if (completedCourses >= 5) achievements.push({ type: 'course_completion', level: 'silver', count: completedCourses });
    if (completedCourses >= 10) achievements.push({ type: 'course_completion', level: 'gold', count: completedCourses });

    // Level achievements
    if (user.level >= 10) achievements.push({ type: 'level', level: 'bronze', value: user.level });
    if (user.level >= 25) achievements.push({ type: 'level', level: 'silver', value: user.level });
    if (user.level >= 50) achievements.push({ type: 'level', level: 'gold', value: user.level });

    // Quiz accuracy achievements
    const quizAccuracy = calculateQuizAccuracy(user);
    if (quizAccuracy >= 70) achievements.push({ type: 'quiz_accuracy', level: 'bronze', value: quizAccuracy });
    if (quizAccuracy >= 85) achievements.push({ type: 'quiz_accuracy', level: 'silver', value: quizAccuracy });
    if (quizAccuracy >= 95) achievements.push({ type: 'quiz_accuracy', level: 'gold', value: quizAccuracy });

    return achievements;
}

// Update user XP and handle course completion
const updateUserXP = async (req, res) => {
    try {
        const { xp, courseId } = req.body;
        const user = await User.findById(req.user.id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if course is already completed
        const courseProgress = user.enrolledCourses.find(
            course => course.courseId.toString() === courseId
        );

        if (!courseProgress) {
            return res.status(404).json({ message: 'Course progress not found' });
        }

        if (courseProgress.completedAt) {
            return res.status(400).json({ message: 'Course already completed' });
        }

        // Update XP and mark course as completed
        user.xp += xp;
        courseProgress.completedAt = new Date();
        courseProgress.progress = 100;

        // Check for level up
        const oldLevel = user.level;
        const newLevel = Math.floor(user.xp / 1000) + 1; // Example: 1000 XP per level
        if (newLevel > oldLevel) {
            user.level = Math.min(newLevel, 100);
            user.rank = calculateRank(user.level);
        }

        await user.save();

        // Update leaderboard
        await updateLeaderboard(user);

        res.json({
            message: 'XP updated successfully',
            user: {
                xp: user.xp,
                level: user.level,
                rank: user.rank,
                courseProgress
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    handleFindUser,
    handleCheckUserAuth,
    updateProfile,
    updateNewPassword,
    changeTheme,
    getProfile,
    updateProfileHandler,
    updatePassword,
    updateTheme,
    getProgress,
    getCourseProgress,
    repeatCourse,
    promoteUser,
    demoteUser,
    searchUsers,
    getLeaderboard,
    getAchievements,
    updateUserXP
};