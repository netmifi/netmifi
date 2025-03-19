import { useMutation } from "@tanstack/react-query";
import { newsletterSignup } from "../../services";

export const useNewsletterSignup = () => {
    // handles newsletter signup 
    return useMutation({
        mutationFn: newsletterSignup,
        onError: (error) => {
            console.error("Registration Error:", error);
        },
    });
};
