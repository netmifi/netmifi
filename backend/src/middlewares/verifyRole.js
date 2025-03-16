const ACCESS_LEVELS = require("../constants/accessLevels");
const { queryState } = require("../constants/queryState");

const verifyRoles = (requiredRole) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.status(401).json({
                message: 'visitors not allowed',
                state: queryState.blocked,
                data: undefined
            });
        }

        // Ensure roles from request is an array or normalize it
        const userRoles = Array.isArray(req.roles) ? req.roles : [req.roles];

        // Get the access level of the required role
        const requiredLevel = ACCESS_LEVELS[requiredRole];

        if (!requiredLevel) {
            return res.status(400).json({
                message: 'Invalid role specified',
                state: queryState.error,
                data: undefined
            });
        }

        // Check if the user has a role with an access level equal to or higher than required
        const hasAccess = userRoles.some(role => {
            const userLevel = ACCESS_LEVELS[role];
            return userLevel && userLevel >= requiredLevel;
        });

        if (!hasAccess) {
            return res.status(403).json({
                message: 'unauthorized access',
                state: queryState.blocked,
                data: undefined
            });
        }
        next();
    };
};

module.exports = verifyRoles;
