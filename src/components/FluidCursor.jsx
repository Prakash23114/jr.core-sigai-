import React, { useEffect, useRef } from 'react';

const FluidCursor = () => {
    const glowRef = useRef(null);
    
    // Using refs for mouse position and animated position
    // to avoid re-renders on every animation frame.
    const mouseX = useRef(0);
    const mouseY = useRef(0);
    const glowX = useRef(0);
    const glowY = useRef(0);
    const animationFrameId = useRef(null);
    
    const easing = 0.08;

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.current = e.clientX;
            mouseY.current = e.clientY;
        };
        
        window.addEventListener('mousemove', handleMouseMove);

        const animateCursor = () => {
            // Interpolate the glow's position towards the mouse position
            glowX.current += (mouseX.current - glowX.current) * easing;
            glowY.current += (mouseY.current - glowY.current) * easing;

            if (glowRef.current) {
                // Apply the transform. Subtract half the width/height (300) to center it.
                glowRef.current.style.transform = `translate(${glowX.current - 300}px, ${glowY.current - 300}px)`;
            }

            animationFrameId.current = requestAnimationFrame(animateCursor);
        };

        // Start the fluid animation loop
        animateCursor();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, []); // Empty dependency array ensures this runs only once on mount

    return <div id="cursor-glow" ref={glowRef}></div>;
};

export default FluidCursor;