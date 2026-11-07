import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import './SocialLogin.css'

export const SocialLogin = () => {

    const handleGoogleLogin = () =>{
        window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
    }

    const handleAppleLogin =() =>{
        window.location.href= `${import.meta.env.VITE_API_BASES_URL}/auth/apple`;
    }
  return (
    <div className="social-container">
        <button onClick={handleGoogleLogin}> <FcGoogle size={24}/> <span>Google</span></button>
        <button onClick={handleAppleLogin}><FaApple size={24}/><span>Apple</span></button>
    </div>
  )
}
