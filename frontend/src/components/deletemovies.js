import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import "./deletemovie.css"
import { FaArrowLeft } from "react-icons/fa";

const Skeleton = () => (
    <div className="skeleton-container w-full h-40 bg-gray-300 animate-pulse rounded-2xl shadow-md"></div>
);

const MoviesList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/all_movies')
            .then((response) => response.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setMovies(data);
                } else {
                    setMovies([]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.get(`http://localhost:5000/delete_movie/${id}`);
            setMovies(movies.filter(movie => movie.id !== id));
            alert('Movie deleted successfully!');
        } catch (error) {
            alert('Failed to delete movie');
        }
    };

    if (loading) {
        return <Skeleton />;
    }

return (
        <div>
            <div className='main'>
            <button className="back-button" onClick={() => navigate("/Admin")}>
                     <FaArrowLeft />
                   </button>
            <h1 className='heading'>Delete Movie</h1>
            </div>
      
        <div className="movie-list-container from-blue-500  ">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <motion.div
                        key={movie.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="movies-card rounded-2xl shadow-2xl p-6 bg-white border border-blue-500 text-black transform hover:scale-105 transition-all duration-300">
                            <div className='cardss'>
                            <h2 className="movie-title text-3xl font-extrabold text-blue-600 mb-3">{movie.moviename}</h2>
                            <p className="movie-info text-lg"><strong>⭐ Star:</strong> {movie.star}</p>
                            <p className="movie-info text-lg"><strong>✍️ Writer:</strong> {movie.writer}</p>
                            <p className="movie-info text-lg"><strong>🎬 Director:</strong> {movie.director}</p>
                            <p className="movie-details italic mt-3 text-sm text-gray-700">{movie.info}</p>
                            </div>
                            <div className='bckbttns' >
                            <button className='back' onClick={()=>{handleDelete(movie.id)}}>Delete</button>
                            </div>
                        </div>
                    </motion.div>
                ))
            ) : (
                <p className=" text-center text-white">No movies available</p>
            )}
        </div>
        </div>
    );
};


export default MoviesList;
