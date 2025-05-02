// Instructor registration route
router.post('/instructor/register', auth, async (req, res) => {
    try {
        const { error, value } = instructorApplicationSchema.validate(req.body, { abortEarly: false });
        
        if (error) {
            return res.status(400).json({
                state: 'error',
                message: 'Validation error',
                errors: error.details
            });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                state: 'error',
                message: 'User not found'
            });
        }

        // Check if user is already an instructor
        const existingInstructor = await Instructor.findOne({ userId: user._id });
        if (existingInstructor) {
            return res.status(409).json({
                state: 'error',
                message: 'User is already an instructor'
            });
        }

        // Create instructor profile
        const instructor = await Instructor.create({
            userId: user._id,
            niche: value.niche,
            whyInterest: value.whyInterest,
            taughtBefore: value.taughtBefore,
            mentoredPreviously: value.mentoredPreviously,
            status: 'pending'
        });

        // Update user profile
        user.handles = {
            facebook: value.facebook || '',
            instagram: value.instagram || '',
            tiktok: value.tiktok || '',
            youtube: value.youtube || '',
            website: value.website || ''
        };
        user.residentialAddress = value.residentialAddress || '';
        user.country = value.country;
        user.phone = value.phone;
        user.about = value.about || '';
        user.roles = { ...user.roles, Instructor: ACCESS_LEVELS.Instructor };
        
        await user.save();

        // Send welcome email
        await sendEmail({
            to: user.email,
            subject: 'Instructor Application Received',
            html: instructorAcceptedTemplate()
        });

        res.status(200).json({
            state: 'success',
            message: 'Instructor application submitted successfully',
            data: {
                user: parseSafeUserData(user),
                instructor
            }
        });
    } catch (error) {
        console.error('Instructor registration error:', error);
        res.status(500).json({
            state: 'error',
            message: 'Failed to process instructor application'
        });
    }
}); 