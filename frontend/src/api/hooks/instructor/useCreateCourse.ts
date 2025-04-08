import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCourse } from "../../instructor";
import { useApp } from "@/app/app-provider";

export const useCreateCourse = () => {
    //  this hook handles course upload 
    const { setCourseUploadProgress } = useApp();
    const queryClient = useQueryClient();


    const onUploadProgress = ({ progress, elapsedTime, rate }: { progress: number, elapsedTime: number, rate: number }) => {
        //    progress loader function  ** REFerence app context and  ./../instructor** for usage details
        setCourseUploadProgress({
            progress,
            elapsedTime,
            rate,
        });
    }

    return useMutation({
        mutationFn: (credentials) => createCourse(credentials, onUploadProgress),
        onSuccess: (data) => {
            setCourseUploadProgress({
                progress: 0,
                elapsedTime: 0,
                rate: 0
            })
            queryClient.setQueryData(["newCourse"], data);
        },

        onError: (error) => {
            setCourseUploadProgress({
                progress: 0,
                elapsedTime: 0,
                rate: 0
            })
            console.error("Upload Course Error:", error);
        },
    });
};