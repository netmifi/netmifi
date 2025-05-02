import instance from "./instance";

export const createCourse = async (formData: FormData) => {
    const response = await instance.post('/courses', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const getCourses = async () => {
    const response = await instance.get('/courses');
    return response.data;
};

export const getCourse = async (id: string) => {
    const response = await instance.get(`/courses/${id}`);
    return response.data;
};

export const getInstructorCourses = async () => {
    const response = await instance.get('/courses/instructor/my-courses');
    return response.data;
};

export const updateCourse = async (id: string, formData: FormData) => {
    const response = await instance.put(`/courses/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteCourse = async (id: string) => {
    const response = await instance.delete(`/courses/${id}`);
    return response.data;
};

export const addReview = async (id: string, data: { rating: number; comment: string }) => {
    const response = await instance.post(`/courses/${id}/reviews`, data);
    return response.data;
}; 