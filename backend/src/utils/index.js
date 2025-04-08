// this is for reusable quick functions
const { randomInt } = require('crypto');

const generateOtp = (state) => {
    const now = new Date();
    const minutesToAdd = 10; // 10 minutes

    // The current time + the 25 minutes
    const newTime = new Date(now.getTime() + minutesToAdd * 60000);

    return {
        state,
        code: randomInt(10000, 99999),
        expiresIn: newTime,
    };
}

const parseSafeUserData = (user) => {
    const details = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        profile: user.profile || '',
        cover: user.cover || '',
        phone: user.phone || '',
        country: user.country || null,
        about: user.about || "",
        residentialAddress: user.residentialAddress || null,
        isEmailVerified: user.isEmailVerified,
        theme: user.theme,
        handles: { ...user.handles },
        roles: user.roles,
        adSources: user.adSources,
        interests: user.interests,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }

    // const result = withGeneratedCode ? { ...details, generatedCode: { state: user.generatedCode.state, expiresIn: user.generatedCode.expiresIn } } : details
    return details
}

module.exports = {
    generateOtp,
    parseSafeUserData
}