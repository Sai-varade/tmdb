import React, { useEffect, useState } from "react";
import Header from "./Header";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
const Moviecard = () => {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    const Loadmovie = async () =>{
      try{
        const response = await axios.get('http://localhost:5000/all_movies');
        setMovies(response.data)
      }catch(error){
        setMovies([])
        alert("Problem")
      }
    }
    Loadmovie();
  },[])
  return (
      <div style={{
        minHeight: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
        right: "0",
      }}>
        <Header/>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr",
          gap: "50px",
          padding: "50px"
        }}
        
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <div key={movie.id}
              style={{
                backgroundColor: "black",
                height: "60vh",
                width: "40vh",transform: hoveredIndex === movie.id ? "scale(1.1)" : "scale(1)",transition: "transform 0.3s ease",}}
                onMouseEnter={()=>{setHoveredIndex(movie.id)}}
                onMouseLeave={()=>{setHoveredIndex(null)}}
                onClick={()=>{navigate(`/Movie/${movie.id}`)}}
              
            >
              <div style={{ height: "50vh", backgroundColor: "white"}}
              >
                <img
                  style={{ height: "100%", width: "100%" }}
                  src={`http://localhost:5000/${movie.movieposter}`}
                  alt="No Poster Available"
                ></img>
              </div>
              <div
                style={{
                  height: "10vh",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <h1 style={{ color: "white",fontSize:'20px' }}>{movie.moviename}</h1>
              </div>
            </div>
          ))
        ) : (
          <h1 style={{color:'white'}}>No Movies Available</h1>
        )}
      </div>
      </div>

  );
};

export default Moviecard;
