/* eslint-disable @typescript-eslint/no-explicit-any */

const mutationErrorHandler = (mutationFn: any, error?: any) => {
    console.log(error.response.data.message)
    return error.response.data.message || error.message || 'Something went wrong';

    // return mutationFn.isError
    // ?
    error.response.data.message ? error.response.data.message : error.response.data.message
    // : error.message || 'Something went wrong';
}

export default mutationErrorHandler

