import React from 'react';
import { motion } from 'framer-motion';

interface FallbackProps {
    message?: string;
    icon?: React.ReactNode;
    action?: {
        label: string;
        onClick: () => void;
    };
}

export const Fallback: React.FC<FallbackProps> = ({
    message = 'No data available',
    icon,
    action
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 text-center"
        >
            {icon && <div className="mb-4 text-4xl">{icon}</div>}
            <h3 className="mb-2 text-xl font-semibold text-gray-700">{message}</h3>
            {action && (
                <button
                    onClick={action.onClick}
                    className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                    {action.label}
                </button>
            )}
        </motion.div>
    );
};

export const LoadingFallback: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center p-8"
        >
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-500 border-t-transparent"></div>
        </motion.div>
    );
};

export const ErrorFallback: React.FC<{ error: string; onRetry?: () => void }> = ({
    error,
    onRetry
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center p-8 text-center"
        >
            <div className="mb-4 text-4xl">⚠️</div>
            <h3 className="mb-2 text-xl font-semibold text-gray-700">Something went wrong</h3>
            <p className="mb-4 text-gray-500">{error}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="rounded-lg bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
                >
                    Try Again
                </button>
            )}
        </motion.div>
    );
}; 