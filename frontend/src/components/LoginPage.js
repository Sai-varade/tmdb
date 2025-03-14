import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './loginPage.css';


const Login = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setUsername('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      console.log(email)
      try{
        const response = await axios.post('http://localhost:5000/login',
        {
          email: email,
          password: password
        });
        if(response.data.message == "Login Successfully"){
          
          navigate('/home')
        }
        else if(response.data.message == "Admin"){
          
          navigate('/Admin')
        }
        else{
          alert("Wrong Credential")
        }
        
      }catch{
        alert("Unable to Process")
      }
  };
  const handleSubmitSignUp = async (e) => {
    e.preventDefault();
      console.log(email)
      try{
        const response = await axios.post('http://localhost:5000/register',
        {
          name : username,
          email: email,
          password: password
        });
        if(response.data.message == "Register Successfully"){
          alert("Register Successfully")
          window.location.reload()
        }
        
      }catch{
        alert("Unable to Process")
      }
  };

  return (
    <div className='bg-transparent'>
      <div className={`containerss ${isSignUpActive ? "right-panel-active" : ""}`}>
        <div className="form-containerss sign-up-containerss">
          <form onSubmit={handleSubmitSignUp} className="form">
            <h1>Create Account</h1>
            <div className="social-containerss">
            <a href="#" className="social">T</a>
            <a href="#" className="social">M</a>
            <a href="#" className="social">D</a>
            <a href="#" className="social">B</a>
            </div>
            {/* <span>or use your email for registration</span> */}
            <input type="text" placeholder="Name" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button id='signup'>Sign Up</button>
          </form>
        </div>
        <div className="form-containerss sign-in-containerss">
          <form onSubmit={handleSubmit} className="form">
            <h1>Sign in</h1>
            <div className="social-containerss">
            <a href="#" className="social">T</a>
            <a href="#" className="social">M</a>
            <a href="#" className="social">D</a>
            <a href="#" className="social">B</a>
            </div>
            {/* <span>or use your account</span> */}
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-containerss">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => {setIsSignUpActive(false); handleToggle()}}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className="ghost" onClick={() => {setIsSignUpActive(true); handleToggle()}}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Login;
