export const queryState = {
    success: {
        isSuccess: true,
        isError: false,
        isBlocked: false,
    },
    error: {
        isSuccess: false,
        isError: true,
        isBlocked: false,
    },
    blocked: {
        isSuccess: false,
        isError: false,
        isBlocked: true,
    },
};