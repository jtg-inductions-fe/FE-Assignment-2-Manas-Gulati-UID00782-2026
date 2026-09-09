import { useEffect, useState } from 'react';

/**
 * TODO: Set time limit after which value is returned
 * @param value - {string}
 * @param delay - {number}
 * @returns string
 */
export const useDebouncedValue = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeoutId = window.setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => window.clearTimeout(timeoutId);
    }, [delay, value]);

    return debouncedValue;
};
