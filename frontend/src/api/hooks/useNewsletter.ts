import { useMutation } from "@tanstack/react-query";
import { newsletterSignup } from "../newsletter";

export const useNewsletterSignup = () => {
    return useMutation({
        mutationFn: newsletterSignup,
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });
};
