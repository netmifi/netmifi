/* eslint-disable @typescript-eslint/no-explicit-any */

import { toast } from "sonner";

const mutationErrorHandler = (mutationFn: any, error?: any) => {
    // console.log('error message', error.response.data.errors.details, error)

    if (error?.response?.data?.errors && error.response.data.errors.details.length > 0) {
        error.response.data?.errors?.details.map((detail) => {
            toast.error(detail.message)
        });
    } else {
        toast.error(error.response.data.message || error.message || 'Something went wrong');
    }


    // return mutationFn.isError
    // ?
    // error.response.data.message ? error.response.data.message : error.response.data.message
    // : error.message || 'Something went wrong';
}

export default mutationErrorHandler

