const { queryState } = require('../constants/queryState');
const Waitlist = require('../models/waitlist');
const { sendEmail } = require('../services/emailService');

const waitlist = async (req, res) => {
    const { name, email } = req.body;

    try {
        // Check if the user is already in the waitlist
        const foundUser = await Waitlist.findOne({ email });

        if (foundUser) {
            return res.status(409).json({
                message: 'Looks like your email is already on the waitlist',
                state: queryState.blocked,
                data: undefined,
            });
        }

        // Save new user to the waitlist
        const newUser = await Waitlist.create({ name, email });

        res.status(201).json({
            message: 'Waitlist registration successful',
            state: queryState.success,
            data: newUser,
        });

        // Send confirmation email
        await sendEmail(email, 'waitlist_confirmation');
    } catch (error) {
        res.status(500).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
    }
};

module.exports = { waitlist };
