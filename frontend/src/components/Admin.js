import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFilm, FaTrash, FaEdit, FaVideo, FaUsers, FaComment } from 'react-icons/fa';
// import Admins from './Admins';

const Admins = () => {
    const navigate = useNavigate();

    const cardStyle = {
        background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
        padding: '30px',
        borderRadius: '20px',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.5)',
        cursor: 'pointer',
        textAlign: 'center',
        width: '380px',
        height: '200px',
        transition: 'transform 0.4s ease-in-out, background 0.4s',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        animation: 'pulse 2s infinite alternate'
    };

    const handleMouseOver = (e) => e.target.style.transform = 'scale(1.1)';
    const handleMouseOut = (e) => e.target.style.transform = 'scale(1)';

    const textStyle = {
        color: '#ffffff',
        fontSize: '26px',
        fontWeight: 'bold',
        margin: '10px 0 0 0',
        textShadow: '3px 3px 8px rgba(0, 0, 0, 0.6)'
    };

    const icons = [
        <FaFilm size={50} color="#ffd700" />, 
        <FaTrash size={50} color="#ff4500" />, 
        <FaEdit size={50} color="#32cd32" />, 
        <FaVideo size={50} color="#00ced1" />, 
        <FaUsers size={50} color="#ff69b4" />, 
        <FaComment size={50} color="#ffa500" />
    ];

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '50px',
            minHeight: '105vh',
            width: '201vh',
            background: 'linear-gradient(135deg, #1e3c72, #2a5298)',
            padding: '50px',
            boxSizing: 'border-box',
            alignItems: 'center',
            justifyItems: 'center'
        }}>
            {[{ path: '/Add', label: 'Add Movie' },
              { path: '/Delete', label: 'Delete Movie' },
              { path: '/Edit', label: 'Edit Movie' },
              { path: '/AllMovies', label: 'All Movies' },
              { path: '/AllUsers', label: 'All Users' }].map(({ path, label }, index) => (
                <div
                    key={index}
                    style={cardStyle}
                    onClick={() => navigate(path)}
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                >
                    {icons[index]}
                    <h2 style={textStyle}>{label}</h2>
                </div>
            ))}
            
        </div>
       
    );
};

export default Admins;
