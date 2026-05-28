import { useEffect, useRef, RefObject } from 'react';

export function useOutsideClick<T extends HTMLElement>(
    callback: () => void,
    attached: boolean = true
): RefObject<T | null> {
    const elementRef = useRef<T>(null);

    useEffect(() => {
        if (!attached) return;

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                elementRef.current &&
                !elementRef.current.contains(event.target as Node)
            ) {
                callback();
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [callback, attached]);

    return elementRef;
}