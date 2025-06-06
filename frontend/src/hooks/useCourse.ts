import { useState, useEffect } from 'react';
import { courseService } from '../services/courseService';
import { Course, CourseListResponse, CourseProgress } from '../types/course';

export const useCourse = (courseId?: string) => {
    const [course, setCourse] = useState<Course | null>(null);
    const [courses, setCourses] = useState<Course[]>([]);
    const [progress, setProgress] = useState<CourseProgress | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 0
    });

    // Fetch a single course
    const fetchCourse = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await courseService.getCourse(id);
            setCourse(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch course');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all courses
    const fetchCourses = async (params?: {
        category?: string;
        instructor?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const data: CourseListResponse = await courseService.getCourses(params);
            setCourses(data.courses);
            setPagination({
                page: data.page,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    // Fetch course progress
    const fetchProgress = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await courseService.getProgress(id);
            setProgress(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch progress');
        } finally {
            setLoading(false);
        }
    };

    // Enroll in a course
    const enrollCourse = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await courseService.enrollCourse(id);
            if (courseId) {
                await fetchCourse(courseId);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to enroll in course');
        } finally {
            setLoading(false);
        }
    };

    // Complete a section
    const completeSection = async (sectionId: string) => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            await courseService.completeSection(courseId, sectionId);
            await fetchProgress(courseId);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to complete section');
        } finally {
            setLoading(false);
        }
    };

    // Submit a quiz
    const submitQuiz = async (sectionId: string, answers: number[]) => {
        if (!courseId) return;
        try {
            setLoading(true);
            setError(null);
            const result = await courseService.submitQuiz(courseId, sectionId, answers);
            await fetchProgress(courseId);
            return result;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to submit quiz');
            return null;
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch course data when courseId changes
    useEffect(() => {
        if (courseId) {
            fetchCourse(courseId);
            fetchProgress(courseId);
        }
    }, [courseId]);

    return {
        course,
        courses,
        progress,
        loading,
        error,
        pagination,
        fetchCourse,
        fetchCourses,
        fetchProgress,
        enrollCourse,
        completeSection,
        submitQuiz
    };
}; 