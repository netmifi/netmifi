/* eslint-disable @typescript-eslint/no-explicit-any */

// this file handles all non-successful response from server parsed through our tanstack mutation
import { toast } from "sonner";

const mutationErrorHandler = (error?: any) => {
    // takes the error param and checks the error
    if (error.response.data.errors && error.response.data.errors.details.length > 0) {
        error.response.data?.errors?.details.map((detail: any) => {
            toast.error(detail.message) // sends an alert toast to user
        });
    } else {
        toast.error((error.response.data.message || error.message || error) ?? 'Something went wrong');
    }
}

export default mutationErrorHandler

