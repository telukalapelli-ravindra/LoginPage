import bannerImg from '../assets/banner.png';
import './LoginBanner.css'

function LoginBanner() {
  return (
    <>
    <div className='login-banner'>
        <h2 className='banner-title'>Make Your Management Simple</h2>
    <img className="banner-image" src={bannerImg} alt="banner image" />
    </div>
    </>
  )
}

export default LoginBanner