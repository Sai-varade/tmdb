import React, { useState } from 'react'
import { IoMdHome } from "react-icons/io";
import { GrFormSearch } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
const Header = () => {
    const [movies,setMovies] = useState(["Dharmaveer 2"])
    const image = "../pictures/Dharmaveer_2.jpeg"
    const navigate = useNavigate()
  return (
    <div style={{
        minHeight:'100vh',
        backgroundColor:'#404040',
        position:'absolute',
        // bottom:'0',
        left:'0',
        top:'0',
        right:'0'
            }}>
    <div style={{
        height : '10vh',
        width : '100%',
        backgroundColor : 'black',
        display :'flex',
        justifyContent:'space-evenly'
    }}>
      <h2 style={{
        color:'Yellow',
        fontSize:'30px',
        marginTop:'2.4vh'
              }}>TMdB</h2>

      <div onClick={()=>{navigate('/')}} style={{
        color:'white',
        fontSize:'25px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontWeight: '600'
      }}><IoMdHome style={{fontSize:'35px',marginBottom:'5px'}} />Home</div>

      <div style={{width:'55%',display:'flex',justifyContent:'left',alignItems:'center'}}>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <input placeholder='Search TMdB' style={{fontSize:'20px',fontWeight:'600',borderTopLeftRadius:'8px',borderBottomLeftRadius:'8px',outline:'none',backgroundColor:'white',height:'2.5rem',width:'30rem'}}></input>
            <GrFormSearch style={{marginRight:'40px',borderBottomRightRadius:'8px',borderTopRightRadius:'8px',width:'40px',fontSize:'2px',color:'black',backgroundColor:'white',height:'2.5rem'}}/>

        </div>
        
      </div>  
      <h2 style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'white',
        border:'1px solid white',
        padding:'15px',
        margin:'10px'
      }}><FaUser style={{marginBottom:'5px',marginRight:'3px'}}/>
      Login</h2>
    </div>
    <div style={{
        display:'grid',
        gridTemplateColumns:'repeat(4,1fr',
        gap:'50px',
        padding:'50px'
    }} >
        {movies.length > 0 ? 
        (movies.map((movie)=>(
            <div style={{
                backgroundColor:'yellow',
                height:'60vh',
                width:'40vh'
            }}>
                <div style={{height:'50vh',backgroundColor:'white'}}><img style={{height:'100%',width:'100%'}} src={image}></img></div>
                <div style={{
                    height:'10vh',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    color:'black'
                }}><h1 style={{color:'black'}}>Dharmaveer 2</h1></div>
            </div>
        )))
        :
        (<h1>Sai</h1>)
        }
    </div>
    </div>
  )
}

export default Header
