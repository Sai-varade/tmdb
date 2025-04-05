import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { GrFormSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

const Header = () => {
  const navigate = useNavigate();
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const Loadmovie = async () => {
      try {
        const response = await axios.get("http://localhost:5000/all_movies");
        setMovies(response.data);
      } catch (error) {
        setMovies([]);
        alert("Problem");
      }
    };
    Loadmovie();
  }, []);

  const handleSearch = (e) => {

    setSearch(e.target.value);

    const searchitem = e.target.value.toLowerCase().trim();

    const filterres = movies.filter((movie) =>
      movie.moviename.toLowerCase().includes(searchitem)
    );
    if (searchitem.length > 0) {
      setSearchList(filterres);
    } else {
      setSearchList([]);
    }
  };
 function on(id){
  setSearch("")
  setSearchList([]);
  navigate(`/Movie/${id}`)
 }
 
  return (
    <div>
      <div
        style={{
          height: "10vh",
          width: "100%",
          backgroundColor: "black",
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        <h2
          style={{
            color: "Yellow",
            fontSize: "30px",
            marginTop: "2.4vh",
          }}
        >
          TMdB
        </h2>

        <div
          onClick={() => {
            navigate("/home");
          }}
          style={{
            color: "white",
            fontSize: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          <IoMdHome style={{ fontSize: "35px", marginBottom: "5px" }} />
          Home
        </div>

        <div
          style={{
            width: "55%",
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                value={search}
                onChange={handleSearch}
                placeholder="Search TMdB"
                style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  borderTopLeftRadius: "8px",
                  borderBottomLeftRadius: "8px",
                  outline: "none",
                  backgroundColor: "white",
                  height: "2.5rem",
                  width: "30rem",
                }}
              ></input>
              <GrFormSearch
                style={{
                  marginRight: "40px",
                  borderBottomRightRadius: "8px",
                  borderTopRightRadius: "8px",
                  width: "40px",
                  fontSize: "2px",
                  color: "black",
                  backgroundColor: "white",
                  height: "2.5rem",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                zIndex: "1",

                width: "70vh",
              }}
            >
              {searchList.length > 0 ? (
                searchList.map((movie, index) => (
                  <h2
                  onClick={()=>{on(movie.id)}}

                    style={{ backgroundColor: 'black', margin: "0" , cursor:'pointer'
                      ,border:'0.5px solid grey',color:'white',fontWeight:'700',fontSize:'20px'
                    }}
                    key={index}
                  >
                    {movie.moviename}
                  </h2>
                ))
              ) : (
                <h6></h6>
              )}
            </div>
          </div>
        </div>
        <h2
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            border: "2px solid white",
            padding: "15px",
            margin: "10px",
            borderRadius: "1rem",
          }}
        >
          <FaUser style={{ marginBottom: "5px", marginRight: "3px" }} />
          Login
        </h2>
      </div>
    </div>
  );
};
export default Header;
