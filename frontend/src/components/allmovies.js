import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './allmovies.css';
import {  useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from "react-icons/fa";

const Skeleton = () => (
    <div className="skeleton-container w-full h-40 bg-gray-300 animate-pulse rounded-2xl shadow-md"></div>
);

const MovieList = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

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

    if (loading) {
        return <Skeleton />;
    }

    return (
        <div>
            <div className='main'>
            <button className="back-button" onClick={() => navigate("/Admin")}>
                      <FaArrowLeft />
                    </button>
            <h1 className='heading'>All Movies</h1>
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
                        <div className="movie-card rounded-2xl shadow-2xl p-6 bg-white border border-blue-500 text-black transform hover:scale-105 transition-all duration-300">
                            <h2 className="movie-title text-3xl font-extrabold text-blue-600 mb-3">{movie.moviename}</h2>
                            <p className="movie-info text-lg"><strong>⭐ Star:</strong> {movie.star}</p>
                            <p className="movie-info text-lg"><strong>✍️ Writer:</strong> {movie.writer}</p>
                            <p className="movie-info text-lg"><strong>🎬 Director:</strong> {movie.director}</p>
                            <p className="movie-details italic mt-3 text-sm text-gray-700">{movie.info}</p>
                        </div>
                    </motion.div>
                ))
            ) : (
                <h2 className=" text-center text-white">No movies available</h2>
            )}
        </div>
        </div>
    );
};

export default MovieList;