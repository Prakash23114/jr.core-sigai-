import React, { useState, useEffect, useRef } from 'react';
import TeamCard from './components/TeamCard';
import FluidCursor from './components/FluidCursor';

// --- IMPORTANT ---
// Add your images to the src/assets/ folder
// If your paths are different, update them here.
import balaImg from './assets/bala.jpg';
import pranavImg from './assets/pranav.jpg';
import paragImg from './assets/parag.jpg';
import riyaImg from './assets/riya.jpg';
import tiyaImg from './assets/tiya.jpg';
import vipulImg from './assets/Vipul.jpg';

const teamMembers = [
    { id: 1, name: 'Bala Sudalaimuthu', role: 'Joint Technical', imageUrl: balaImg, linkedin: 'https://www.linkedin.com/in/bala-sudalaimuthu-a34b53355/' },
    { id: 2, name: 'Pranav Vishwakarma', role: 'Inhouse Head', imageUrl: pranavImg, linkedin: 'https://www.linkedin.com/' },
    { id: 3, name: 'ParagValam', role: 'Jt CreativeHead', imageUrl: paragImg, linkedin: 'https://www.linkedin.com/' },
    { id: 4, name: 'Riya Yadav', role: 'Jt Event Manager', imageUrl: riyaImg, linkedin: 'https://www.linkedin.com/' },
    { id: 5, name: 'Tiya Rai', role: 'Jt secretary', imageUrl: tiyaImg, linkedin: 'https://www.linkedin.com/' },
    { id: 6, name: 'Vipul Choudhary', role: 'PR Head', imageUrl: vipulImg, linkedin: 'https://www.linkedin.com/' }
];

function App() {
    const [activeCard, setActiveCard] = useState(null);
    const containerRef = useRef(null);

    // Handle clicking outside a card to deselect
    useEffect(() => {
        function handleClickOutside(event) {
            if (containerRef.current && !containerRef.current.contains(event.target.closest('.team-card'))) {
                setActiveCard(null);
            }
        }
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleCardClick = (id) => {
        setActiveCard(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="text-white min-h-screen flex items-center justify-center antialiased">
            <FluidCursor />
            <div className="container mx-auto px-4 py-16">
                <header className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black tracking-wider uppercase">
                        JUNIOR <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">CORE TEAM</span>
                    </h1>
                </header>

                <div ref={containerRef} id="team-container" className="flex flex-wrap justify-center items-center gap-6">
                    {teamMembers.map((member, index) => (
                        <TeamCard
                            key={member.id}
                            member={member}
                            index={index}
                            isActive={activeCard === member.id}
                            isInactive={activeCard !== null && activeCard !== member.id}
                            onClick={() => handleCardClick(member.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;