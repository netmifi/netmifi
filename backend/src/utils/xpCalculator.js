const calculateXP = (baseXP, multiplier = 1) => {
    // Base XP calculation
    let xp = baseXP * multiplier;

    // Apply diminishing returns for very high XP values
    if (xp > 1000) {
        xp = 1000 + Math.log10(xp - 999) * 100;
    }

    // Round to nearest integer
    return Math.round(xp);
};

const calculateCourseXP = (course) => {
    // Base XP for completing a course
    let baseXP = 100;

    // Add XP based on course difficulty
    switch (course.difficulty) {
        case 'beginner':
            baseXP += 50;
            break;
        case 'intermediate':
            baseXP += 100;
            break;
        case 'advanced':
            baseXP += 200;
            break;
        default:
            baseXP += 50;
    }

    // Add XP based on course length (sections)
    baseXP += course.sections.length * 10;

    // Add XP for quizzes
    const quizCount = course.sections.filter(section => section.quiz).length;
    baseXP += quizCount * 20;

    return calculateXP(baseXP);
};

const calculateSectionXP = (section) => {
    // Base XP for completing a section
    let baseXP = 20;

    // Add XP for video content
    if (section.videoUrl) {
        baseXP += 10;
    }

    // Add XP for quiz
    if (section.quiz) {
        baseXP += 15;
    }

    return calculateXP(baseXP);
};

const calculateQuizXP = (score, totalQuestions) => {
    // Base XP for attempting a quiz
    let baseXP = 10;

    // Add XP based on performance
    const percentage = (score / totalQuestions) * 100;
    if (percentage >= 90) {
        baseXP += 20;
    } else if (percentage >= 70) {
        baseXP += 15;
    } else if (percentage >= 50) {
        baseXP += 10;
    }

    return calculateXP(baseXP);
};

module.exports = {
    calculateXP,
    calculateCourseXP,
    calculateSectionXP,
    calculateQuizXP
}; 