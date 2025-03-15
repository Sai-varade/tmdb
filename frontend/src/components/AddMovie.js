import React, { useState } from 'react';
import axios from 'axios';
import { FaFilm, FaImage, FaVideo, FaInfoCircle, FaUserTie, FaPenNib, FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import "./AddMovieForm.css"

const AddMovieForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        moviename: '',
        movievideo: '',
        info: '',
        director: '',
        writer: '',
        star: ''
    });
    
    const [movieposter, setmovieposter] = useState(null);
    const handleChange = (e) => {
        if(e.target.name === "movieposter"){

            setmovieposter(e.target.files[0]);
        }
        else{
        setFormData({ ...formData, [e.target.name]: e.target.value });}
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("moviename", formData.moviename);
        data.append("info", formData.info);
        data.append("director", formData.director);
        data.append("writer", formData.writer);
        data.append("star", formData.star);
        data.append("movieposter", movieposter);
        data.append("movievideo", formData.movievideo);
        try {
            const response = await axios.post("http://localhost:5000/add_movie", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert(response.data.Message);
            navigate("/Admin");
        } catch (error) {
            alert('Error: ' + (error.response?.data?.Message || 'Failed to add movie'));
        }
    };

    const inputFields = [
        { name: 'moviename',type:'text', icon: <FaFilm color='#ff4757' /> },
        { name: 'movieposter',type:'file', icon: <FaImage color='#ffa502' /> },
        { name: 'movievideo',type:'text', icon: <FaVideo color='#3742fa' /> },
        { name: 'info',type:'text', icon: <FaInfoCircle color='#2ed573' /> },
        { name: 'director',type:'text', icon: <FaUserTie color='#ff6348' /> },
        { name: 'writer',type:'text', icon: <FaPenNib color='#1e90ff' /> },
        { name: 'star',type:'text', icon: <FaStar color='#fbc531' /> }
    ];

    return (
        <div style={{
            display: 'flex',
            height: '105vh',
            width: '201.1vh',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'linear-gradient(135deg, #1a2980, #26d0ce)',
            padding: '20px',
            boxSizing: 'border-box',
          
        }}>
           
            <div style={{
                  marginTop:'3rem',
                background: '#ffffff',
                padding: '30px',
                borderRadius: '20px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
                border: '3px solid #ff4757',
                maxWidth: '900px',
                width: '100%',
                height: 'auto'
            }}>
                 <div className='top'>
                <motion.button
    className="back-buttonss"
    onClick={() => navigate('/Admin')}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
>
    ◀
</motion.button>


                <h2 style={{
                    textAlign: 'center',
                    color: '#ff4757',
                    fontSize: '46px',
                    marginBottom: '30px',
                    marginLeft: '70px',
                    marginTop: '1px',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px'
                }}>🎬 Add a New Movie</h2>
                </div>
                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {inputFields.map(({ name, icon, type }) => (
                        <div key={name} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            background: '#f0f2f5',
                            padding: '8px',
                            borderRadius: '8px',
                            boxShadow: '0 3px 12px rgba(0, 0, 0, 0.3)'
                        }}>
                            <div style={{ fontSize: '20px' }}>{icon}</div>
                            <input
                                name={name}
                                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                                value={formData[name]}
                                onChange={handleChange}
                                type={type}
                                required
                                style={{
                                    padding: '8px',
                                    border: 'none',
                                    borderRadius: '6px',
                                    outline: 'none',
                                    background: 'transparent',
                                    width: '100%',
                                    color: '#333',
                                    fontSize: '18px',
                                    fontFamily: 'Poppins, sans-serif',
                                    transition: 'all 0.3s ease-in-out'
                                }}
                            />
                        </div>
                    ))}
                    <div style={{ gridColumn: 'span 2', textAlign: 'center', marginTop: '15px' }}>
                        <button 
                            type="submit"
                            style={{
                                background: 'linear-gradient(to right, #ff4757, #ff6b81)',
                                color: '#fff',
                                padding: '14px',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                fontSize: '20px',
                                transition: '0.3s',
                                width: '100%',
                                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.3)'
                            }}
                            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.target.style.transform = 'scale(1)' }>
                            🚀 Add Movie
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddMovieForm;