const { queryState } = require('../constants/queryState');
const Newsletter = require('../models/Newsletter');
// const User = require('../models/Newsletter');
const { sendEmail } = require('../services/emailService');

const newsletter = async (req, res) => {
    const { email } = req.body;
    try {
        const user = req.user;
        const foundUserSub = await Newsletter.findOne({ email });

        if (foundUserSub) {
            res.status(409).json({
                message: 'Looks like your email already has a subscription',
                state: queryState.error,
                data: undefined,
            });
            return;
        }

        const result = await Newsletter.create({
            userId: user.id || user._id,
            email
        });

        res.status(202).json({
            message: 'subscription activated',
            state: queryState.success,
            data: result,
        });
        await sendEmail(email, 'newsletter_activated');
    } catch (error) {
        res.status(405).json({
            message: error.message,
            state: queryState.error,
            data: undefined,
        });
        return
    }
}

module.exports = { newsletter }