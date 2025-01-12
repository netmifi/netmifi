const { randomInt } = require('crypto');

const generateOtp = (state) => {
    const now = new Date();

    // Define the number of minutes you want to add
    const minutesToAdd = 25; // Example: add 30 minutes

    // Add minutes to the current time
    const newTime = new Date(now.getTime() + minutesToAdd * 60000);

    return {
        state,
        code: randomInt(10000, 99999),
        expiresIn: newTime,
    };
}

const parseSafeUserData = (user, withGeneratedCode = false) => {
    const details = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        isEmailVerified: user.isEmailVerified,
        theme: user.theme,
        roles: user.roles,
        adSources: user.adSources,
        interests: user.interests,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }

    const result = withGeneratedCode ? { ...details, generatedCode: { state: user.generatedCode.state, expiresIn: user.generatedCode.expiresIn } } : details
    return result
}

module.exports = {
    generateOtp,
    parseSafeUserData
}