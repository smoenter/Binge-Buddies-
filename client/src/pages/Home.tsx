import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import VideoBackground from '../components/HomeVideoBG/index';
import "./css/Home.css"

const Home = () => {
  return (
    <>
    <div className="video-section">
      <VideoBackground />

      {/* --- BELOW THE VIDEO SECTION --- */}
    <section className="get-started-section">

      {/* LETS GET STARTED CONTAINER */}
      <div className=" text-center">
        
        {!Auth.loggedIn() ? (
          <div className="glass-card text-center">
            <h2>Let's get started!</h2>
            <p className="card-text">
              Please <Link to="/login" className="auth-link">log in</Link> or{' '}
              <Link to="/signup" className="auth-link">sign up</Link> to start sharing your reactions!
            </p>
          </div>
          
        ) : (
          <div className="glass-card text-center">
            <h2 className="wlcm-bck-txt">Welcome back, {Auth.getProfile().data.username}!</h2>
            <p>You're logged in and ready to binge!
            </p>
          </div>
        )}
      </div>
    </section>

    </div>


  {/* HOW IT WORKS CONTAINER */}

  <div className="how-it-works-container info-section">
    <section className="info-section">
      

      <div className="info-card text-center">
        <h2>How It Works:</h2>

        {/* Step 1- Search */}
        <div className="info-card-content">
        <img width="48" height="48" src="https://img.icons8.com/fluency/48/search.png" alt="search"/>
        <h3>Search</h3>
        <p>
          Find a movie or show and save it to your watchlist!
        </p>
        </div>

        {/* Step 2- Share */}
        <div className="info-card-content">
        <img width="48" height="48" src="https://img.icons8.com/color/48/send.png" alt="send"/>
        <h3>Share</h3>
        <p>
          Share any show or movie with your friends and family so you each can react together on your own time!
        </p>
        </div>
        
        {/* Step 3- React */}
        <div className="info-card-content">
        <img width="48" height="48" src="https://img.icons8.com/external-vitaliy-gorbachev-lineal-color-vitaly-gorbachev/60/external-angry-social-media-vitaliy-gorbachev-lineal-color-vitaly-gorbachev.png" alt="external-angry-social-media-vitaliy-gorbachev-lineal-color-vitaly-gorbachev"/>
        <h3>React</h3>
        <p>
          React to any of your saved movies or tv shows, and see your friends' reactions too!
        </p>
        </div>
      </div>
      
    </section>
    </div>
  </>
);
};

export default Home;