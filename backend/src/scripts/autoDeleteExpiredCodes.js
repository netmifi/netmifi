
const User = require('../models/User');

// this function is supposed to delete all generated code for each user's document if the expires in is more than the current time
async function deleteExpiredCodes() {
    try {
        const result = await User.updateMany(
            { 'generatedCode.expiresIn': { $lte: new Date() } },
            { $unset: { generatedCode: 1 } }
        );
        // console.log(`Removed expired generatedCode for ${result.modifiedCount} users`);
    } catch (error) {
        console.error('Error deleting expired codes:', error);
    }
}

async function setupPeriodicDeletion(intervalSeconds = 5) {
    await deleteExpiredCodes();

    // Then set up the interval
    setInterval(deleteExpiredCodes, intervalSeconds * 1000);
    console.log(`Periodic deletion set up successfully. Running every ${intervalSeconds} seconds.`);
}

module.exports = setupPeriodicDeletion;

