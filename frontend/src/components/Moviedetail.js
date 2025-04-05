import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaStar } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Reviews from './Reviews';
const Moviedetail = () => {
    const [movie,Setmovie] =useState("")
    const Star = [1,2,3,4,5,6,7,8,9,10]
    const [clickStar,setclickStar] = useState(0)
    const [login ,setlogin] = useState(true)
    const {id}  = useParams()
    const [textarea,settextarea] = useState("")
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/detail_movie/${id}`);
                console.log(response.data);
                Setmovie(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                Setmovie({});
            }
        };
        loadData();
    }, [id]); 
   const submitReview = async () =>{
    if( login && clickStar && textarea.length > 0){
        const ReviewData = {
            star : clickStar,
            review : textarea,
            username : sessionStorage.getItem('user'),
            moviename : movie.moviename
        }
        setclickStar(0);
            settextarea("")
        try{
            await axios.post(`http://localhost:5000/SubmitReview`,ReviewData);
            setclickStar(0);
            settextarea("")
        }catch(error){
            alert("Unable to Review")
        }

    }
   } 
   
  return (
    <div style={{
        minHeight: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
        right: "0",
      }}>
        <Header/>
      <div style={{backgroundColor:'white',padding:'3rem'}}>
       <div style={{
        height:'140vh',
        backgroundColor:'#b3ffff',
        borderRadius:'2rem',
        
       }}>
        <div style={{height:'20vh',padding:'2rem',paddingLeft:'4rem',fontSize:'5vh',display:'flex',justifyContent:'space-between'}}>
            <h1 style={{fontSize:'8vh'}}>{movie.moviename}</h1>
            <h4  onClick={()=>{navigate(`/Reviews/${movie.moviename}`)}} style={{cursor:'pointer',textDecoration:'underline',fontWeight:'520',paddingTop:'1.5rem',marginRight:'2rem',marginTop:'0.5rem'}}>Reviews</h4>
        </div>
        <div style={{height:'45%',padding:'3rem',paddingTop:'0rem',display:'flex',justifyContent:'space-between'}}>
            <img alt='Poster Not Available' style={{
                height:'100%',
                width:'30%',borderRadius:'2rem'
            }}  src={`http://localhost:5000/${movie.movieposter}`}></img>
            <iframe
            style={{
                height:'100%',
                width:'66%',
                borderRadius:'2rem',
                outline:'none',border:'none'
            }} 
            src={movie.movievideo}
            title='Trailer Not Available'
            >Trailer Not Available</iframe>
        </div>
       
       <div style={{height:'39%',width:'100%',paddingLeft:'3rem',paddingRight:'3rem',display:'flex'}}>
        <div style={{height:'95%',width:'70%',padding:'1rem',paddingTop:'1rem'}}> 
            <h3 style={{marginTop:'1.2rem',borderTop:'4px solid black',paddingTop:'1rem'}}>{`Info : ${movie.info}`}</h3>
            <h2 style={{marginTop:'1.2rem',borderTop:'4px solid black',paddingTop:'1rem'}}>{`Director : ${movie.star}`}</h2>
            <h2 style={{marginTop:'1.2rem',borderTop:'4px solid black',paddingTop:'1rem'}}>{`Writter : ${movie.writer}`}</h2>
            <h2 style={{marginTop:'1.2rem',borderTop:'4px solid black',paddingTop:'1rem',paddingBottom:'1rem',borderBottom:'4px solid black'}}>{`Stars : ${movie.star}`}</h2>
        </div>
        <div style={{height:'95%',width:'30%',backgroundColor:'white',border:'4px solid black',
        borderRadius:'2rem',display:'flex',justifyContent:'space-evenly',flexDirection:'column',alignItems:'center'}
    }>
        <h1 style={{color:'blue'}}>Review Here</h1>
        <div>
            {Star.map((S,index)=>(
                    
                    <FaStar onClick={()=>{setclickStar(index+1)}} key={index} id={S} style={{fontSize:'25px',margin:'1px',color: clickStar > index ? '#ffcc00' : 'black'
                    }}
                    />
                
            ))}
        </div>
        <textarea onChange={(e)=>{settextarea(e.target.value)}} value={textarea} placeholder="Write Your Review...."defaultValue={""}
        style={{height:'20vh',padding:'1rem',width:'80%',fontSize:'17px',color:'black',fontWeight:'900'}}></textarea>
        <button onClick={()=>{submitReview()}} style={{backgroundColor:'blue',border:'2px solid black'}}>Submit</button>
    
    </div>
       </div>
       </div>
      </div>
    </div>
  )
}

export default Moviedetail
