import React, { useState, useEffect, useRef } from 'react';

const TeamCard = ({ member, index, isActive, isInactive, onClick }) => {
    const [isHidden, setIsHidden] = useState(true);
    const cardRef = useRef(null);
    const cardInnerRef = useRef(null);
    const cardImageRef = useRef(null);
    const cardContentRef = useRef(null);

    // Entrance Animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsHidden(false);
        }, 150 * index);
        return () => clearTimeout(timer);
    }, [index]);

    // 3D Tilt Effect
    useEffect(() => {
        const card = cardRef.current;
        const cardInner = cardInnerRef.current;
        const cardImage = cardImageRef.current;
        const cardContent = cardContentRef.current;

        if (!card || !cardInner || !cardImage || !cardContent) return;

        const handleMouseMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            cardInner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            cardImage.style.transform = `translateZ(20px)`;
            cardContent.style.transform = `translateZ(50px)`;
        };

        const handleMouseLeave = () => {
            cardInner.style.transform = 'rotateX(0deg) rotateY(0deg)';
            cardImage.style.transform = 'translateZ(0px)';
            cardContent.style.transform = 'translateZ(0px)';
        };

        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            card.removeEventListener('mousemove', handleMouseMove);
            card.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    const cardClasses = [
        'team-card w-[180px] h-[350px] transition-all duration-500 ease-in-out cursor-pointer',
        isHidden ? 'card-hidden' : '',
        isActive ? 'card-active' : '',
        isInactive ? 'card-inactive' : ''
    ].join(' ');

    return (
        <div ref={cardRef} className={cardClasses} data-id={member.id} onClick={onClick}>
            <div ref={cardInnerRef} className="card-inner relative group bg-gradient-to-b from-[#1E2A5A] to-[#121529] rounded-2xl overflow-hidden shadow-lg">
                <img 
                    ref={cardImageRef}
                    src={member.imageUrl} 
                    alt={member.name} 
                    className="card-image absolute top-0 left-0 w-full h-full object-cover object-top opacity-30 grayscale group-hover:opacity-100 group-hover:grayscale-0"
                />
                <div ref={cardContentRef} className="card-content absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="font-black text-6xl text-white/40 opacity-100 group-hover:opacity-0 group-hover:-translate-y-4 transition-all duration-500 ease-in-out">
                        {String(member.id).padStart(2, '0')}
                    </div>
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 translate-y-8 group-hover:translate-y-0 transition-all duration-500 ease-in-out">
                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-blue-300 font-medium">{member.role}</p>
                    </div>
                </div>
                <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="absolute top-4 right-4 w-8 h-8 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm" 
                    onClick={(e) => e.stopPropagation()} // Prevents card click when clicking link
                >
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path></svg>
                </a>
            </div>
        </div>
    );
};

export default TeamCard;