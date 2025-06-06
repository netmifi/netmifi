import { useState, useEffect } from 'react';
// import { Instructor, InstructorListResponse, InstructorProgress } from '../types/instructor';
import { instructorService } from '@/services/instructorService';

export const useInstructor = (instructorId?: string) => {
    const [instructor, setInstructor] = useState<Instructor | null>(null);
    const [instructors, setInstructors] = useState<Instructor[]>([]);
    const [progress, setProgress] = useState<InstructorProgress | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [pagination, setPagination] = useState({
        page: 1,
        total: 0,
        totalPages: 0
    });

    // Fetch a single instructor
    const fetchInstructor = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await instructorService.getInstructor(id);
            setInstructor(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch instructor');
        } finally {
            setLoading(false);
        }
    };

    // Fetch all instructors
    const fetchInstructors = async (params?: {
        category?: string;
        instructor?: string;
        search?: string;
        page?: number;
        limit?: number;
    }) => {
        try {
            setLoading(true);
            setError(null);
            const data: InstructorListResponse = await instructorService.getInstructors(params);
            setInstructors(data.instructors);
            setPagination({
                page: data.page,
                total: data.total,
                totalPages: data.totalPages
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch instructors');
        } finally {
            setLoading(false);
        }
    };

    // Fetch instructor progress
    const fetchProgress = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const data = await instructorService.getProgress(id);
            setProgress(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch progress');
        } finally {
            setLoading(false);
        }
    };

    // Enroll in a instructor
    const enrollInstructor = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await instructorService.enrollInstructor(id);
            if (instructorId) {
                await fetchInstructor(instructorId);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to enroll in instructor');
        } finally {
            setLoading(false);
        }
    };

    // Effect to fetch instructor data when instructorId changes
    useEffect(() => {
        if (instructorId) {
            fetchInstructor(instructorId);
            fetchProgress(instructorId);
        }
    }, [instructorId]);

    return {
        instructor,
        instructors,
        progress,
        loading,
        error,
        pagination,
        fetchInstructor,
        fetchInstructors,
        fetchProgress,
        enrollInstructor
    };
}; 