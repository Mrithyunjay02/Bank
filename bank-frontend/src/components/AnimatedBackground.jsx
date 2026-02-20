import { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
    const glowRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (glowRef.current) {
                glowRef.current.style.setProperty('--mx', `${e.clientX}px`);
                glowRef.current.style.setProperty('--my', `${e.clientY}px`);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="auth-bg" ref={glowRef} aria-hidden="true">
            <div className="auth-bg-blob auth-bg-blob--1" />
            <div className="auth-bg-blob auth-bg-blob--2" />
            <div className="auth-bg-blob auth-bg-blob--3" />
            <div className="auth-bg-cursor-glow" />
            <div className="auth-bg-grid" />
        </div>
    );
};

export default AnimatedBackground;
