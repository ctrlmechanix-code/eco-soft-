
import React, { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

interface AnimatedCounterProps {
    from?: number;
    to: number;
    duration?: number;
    className?: string;
}

// FIX: Removed React.FC and typed props directly.
const AnimatedCounter = ({ from = 0, to, duration = 1.5, className }: AnimatedCounterProps) => {
    const nodeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const node = nodeRef.current;
        if (!node) return;

        const controls = animate(from, to, {
            duration,
            onUpdate(value) {
                node.textContent = Math.round(value).toLocaleString();
            },
        });

        return () => controls.stop();
    }, [from, to, duration]);

    return <span ref={nodeRef} className={className} />;
};

export default AnimatedCounter;
