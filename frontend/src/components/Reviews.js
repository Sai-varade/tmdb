import React, { useEffect, useState } from 'react'
import Header from './Header'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
const Reviews = () => {
  const apikey = process.env.REACT_APP_GEMINI_API_KEY;
    const navigate =useNavigate()
    const [reviews , setReviews] = useState([])
    const [aiReview , SetAiReview] = useState("")
    const {moviename} = useParams()
    useEffect(()=>{
        const reviewdata = async () =>{
            try{
                const response = await axios(`http://localhost:5000/Reviews/${moviename}`);
                setReviews(response.data)
            }catch{
                setReviews([])
            }
        }
        reviewdata();
    },[moviename])
     

      


    async function data() {
      const reviewsArray = reviews.map((e, i) => `Review ${i + 1}: ${e.review}`);

      const datas = reviewsArray.join(",");

      const datass = `
         info = i have provide the list of reviews of movie and summarize according to reviewa IN 100 words and also give rating in stars in separate variable LIKE  rating, the should only in rating variable and give rating out of 10, AND ALSO GIVE RATING NOT SAME AS PREVIOUS ONE and rating should not in decimal.And also dont write review in apostrophe
     , data = ${datas}`;
      try{const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apikey}`,
        method: "post",
        data: {
          contents: [
            {
              parts: [{ text: datass }],
            },
          ],
        },
      });
      SetAiReview(response["data"]["candidates"][0]["content"]["parts"][0]["text"]);
      
    }catch{SetAiReview("ERROR 404.. Review Not Generated")}
    }
    const [aire,aistar] = aiReview.split("rating =");


    useEffect(() => {
      if(reviews.length > 0){ data();}
    }, [reviews]);
  return (
    <div style={{
        minHeight: "100vh",
        position: "absolute",
        left: "0",
        top: "0",
        right: "0",
      }}>
        <Header/>
      <div style={{
        height:'100%',
        width:'100%',
        padding:'3rem',
        backgroundColor:'white'
      }}>
        <div style={{
            minHeight:'5vh',
            backgroundColor:'#b3ffff',
            borderRadius:'2rem',padding:'1rem'
        }}>
            <div style={{height:'20vh',display:'flex',alignItems:'center'}}>
                <FaArrowLeft onClick={()=>{navigate(-1)}} style={{marginLeft:'2.5rem',fontSize:'50px',border:'2px solid black',borderRadius:'2rem',padding:'5px'}}/>
               
                <h1 style={{marginLeft:'1.5rem',fontSize:'50px'}}>Reviews</h1>
            </div>
            <div style={{minHeight:'10vh',width:'100%',padding:'2rem',paddingTop:'0rem',paddingBottom:'0rem',backgroundColor:'none'}}>
                <div style={{minHeight:'10vh',backgroundColor:'#c0c0c0',marginBottom:'2rem',borderRadius:'1.5rem'}}>
                    <div style={{display:'flex',padding:'1rem',paddingBottom:'0rem',justifyContent:'space-between'}}>
                    <h1>#AI Generated Review</h1>
                    <h2 style={{marginTop:'0rem',marginRight:'2rem'}}><FaStar style={{paddingTop:'5px',color:'yellow'}}/>  {aistar} / 10 </h2>
                    
                </div>
                <div>
                    {/*  */}
                      {aire.length > 1 ? <h2 style={{ padding:'1rem',paddingTop:'0rem'}} >{aire}</h2>: <h2 style={{ padding:'1rem',paddingTop:'0rem'}} >Loading.....</h2>}
                   
                    </div>
                </div>
                {reviews.map((review)=>(
                    <div style={{minHeight:'15vh',maxHeight:'100%',backgroundColor:'#c0c0c0',marginBottom:'2rem',borderRadius:'1.5rem',paddingBottom:'0.1rem'}}>
                    <div style={{display:'flex',padding:'1rem',justifyContent:'space-between',minHeight:'1px'}}>
                    <h1>{`#${review.username}`}</h1>
                    <h2 style={{marginTop:'0rem',marginRight:'2rem'}}><FaStar style={{paddingTop:'5px',color:'yellow'}}/>  {review.star} / 10 </h2>
                </div>
                <p style={{margin:'1rem',marginTop:'0rem',fontSize:'20px',fontWeight:'500'}}>{review.review} </p>
                </div>
                ))}
           
            </div>
        </div>
      </div>
    </div>
  )
}

export default Reviews
