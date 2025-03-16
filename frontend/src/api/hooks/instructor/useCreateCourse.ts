import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../instructor";
import { useApp } from "@/app/app-provider";

export const useCreateCourse = () => {
    const { setCourseUploadProgress } = useApp();
    const queryClient = useQueryClient();


    const onUploadProgress = (progress: number) => {
        setCourseUploadProgress(progress)
    }

    return useMutation({
        mutationFn: (credentials) => createCourse(credentials, onUploadProgress),
        // cacheTime: 1000 * 60 * 60, // Cache data for 1 hour
        onSuccess: (data) => {
            setCourseUploadProgress({ progress: 0, })
            queryClient.setQueryData(["newCourse"], data);
        },

        onError: (error) => {
            setCourseUploadProgress(0)
            console.error("Upload Course Error:", error);
        },
    });
};