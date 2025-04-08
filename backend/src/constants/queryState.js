// !!! THIS FILE SHOULD NOT BE ALTERED !!!

// this are just reusable states used to identify the client's query response primarily used in our controller's business logic
module.exports.queryState = {
    success: { // if the request from server is successful use queryState.success
        isSuccess: true,
        isError: false,
        isBlocked: false,
    },
    error: { // if the request from server encountered an error use queryState.error
        isSuccess: false,
        isError: true,
        isBlocked: false,
    },
    blocked: { // if the request from server as been deemed unauthorized use queryState.blocked
        isSuccess: false,
        isError: false,
        isBlocked: true,
    },
};