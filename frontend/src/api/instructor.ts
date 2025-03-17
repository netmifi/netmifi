import instance from "./instance";

const timeout = 30 * 60 * 1000; //30 minutes in milliseconds
export const createCourse = async (credentials: unknown, onUploadProgress: ({ progress, elapsedTime, rate }: { progress: number, elapsedTime: number, rate: number }) => void) => {
    const startTime = Date.now();

    const response = await instance.post("/instructor/create", credentials, {
        timeout,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (event) => {
            const uploadedBytes = event.loaded;
            const totalBytes = event.total || 0;
            const calculatedProgress = Math.round((uploadedBytes * 100) / totalBytes);

            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000; // Convert to seconds
            let rate = 0;
            if (elapsedTime > 0) {
                rate = Math.round(
                    (event.loaded / 1024) / elapsedTime
                );
            }
            onUploadProgress({ progress: calculatedProgress, elapsedTime, rate }); // Call the provided callback
        },
    });
    return response.data;
};
