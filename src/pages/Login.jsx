import { useState } from "react";
import InputFields from "../components/InputFields";
import "./Login.css"
import { Link, useNavigate } from "react-router-dom";
import { SocialLogin } from "../components/SocialLogin";
import LoginBanner from "../components/LoginBanner";


export default function Login() {
 

  const[form,setForm] = useState({ email:"",password:"" })
  const[errors,setError] =useState({ email:"", password:""});
  const navigate = useNavigate();

  // validation function to check if the form fields are filled
    const validate=()=>{
     const newErrors={email:"",password:""};
      if(!form.email) newErrors.email="Please fill email";
     if(!form.password) newErrors.password="Please fill password"
      setError(newErrors);
       return !newErrors.email && !newErrors.password;
    }


  // handleSubmit function to handle the form submission and call the loginUser function from authservice.js
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;

    const my={myEmail:"Ravindra@gmail.com",myPassword:"12345"}

     // Call the loginUser function from authservice.js and navigate to the dashboard if successful
    try{
      // const response = await loginUser(form);
      if(my.myEmail===form.email && my.myPassword===form.password){
      navigate("/dashboard");
      }
    else{
      setError({email:"",password:"Invalid email or password"});
       }
    }
    catch(error){
      setError({email:"",password:error.response?.data?.message || "Lost connection to server"}); 
    }

  }

  return (
    <>
    <div className="container">

      <div className="left-section">
      <LoginBanner className="banner"/>
    </div>
   
    
    <div className="right-section">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
        <p>Login to your account</p>
        </div>
        <form  onSubmit={handleSubmit} className="login-form">
      <div className="email-container" id="input-container">
        <InputFields className="email-input" id="input-fields"
        type="email" label="Email" colors="#fcb735"
      onChange={e => setForm({...form, email:e.target.value})}
      name="email" placeholder="✉️ Enter email Id" 
      error={errors.email}
      />
      </div>

     <div className="password-container" id="input-container">
        <InputFields className="password-input" id="input-fields"
      name="password" label="Password" 
      type="password" colors="#fcb735"
      onChange={e => setForm({...form, password:e.target.value})} 
      placeholder="🔒 Enter password"
      error ={errors.password} 
     />
     </div>

      <div className="login-button-container" id="input-container">
        <button type="submit" className="login-btn">Login</button>
        </div>
      </form>
    
    <div className="signup-link">
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
        
        <div>
          <SocialLogin/>
        </div>
    </div>
    </div>

    </div>
    </>
  )
}

