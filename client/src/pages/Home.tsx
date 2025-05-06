import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import VideoBackground from '../components/HomeVideoBG/index';
import "./css/Home.css"
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <>
      <div className="video-section">
        <VideoBackground />
        <div className="main-content">
          {/* --- BELOW THE VIDEO SECTION --- */}
          <section className="get-started-section">
            {/* LET'S GET STARTED CONTAINER */}
            <div className="text-center">
              {!Auth.loggedIn() ? (
                <motion.div
                  className="glass-card text-center"
                  initial={{ opacity: 0, y: 50 }} // Start from the bottom (y = 50)
                  animate={{ opacity: 1, y: 0 }} // End at normal position (y = 0)
                  transition={{
                    duration: 1.5, // Duration of the animation
                    ease: [0.68, -0.55, 0.27, 1.55], // Custom ease for a bounce effect
                  }} // Smooth transition
                >
                  <h2>Let's get started!</h2>
                  <p className="card-text">
                    Please <Link to="/login" className="auth-link2">log in</Link> or{' '}
                    <Link to="/signup" className="auth-link2">sign up</Link> to begin!
                  </p>
                </motion.div>
              ) : (
                // WELCOME BACK CONTAINER
                <motion.div
                  className="glass-card text-center"
                  initial={{ opacity: 0, y: 50 }} // Start from the bottom (y = 50)
                  animate={{ opacity: 1, y: 0 }} // End at normal position (y = 0)
                  transition={{
                    duration: 1.5, // Duration of the animation
                    ease: [0.68, -0.55, 0.27, 1.55], // Custom ease for a bounce effect
                  }} // Smooth transition
                >
                  <h2 className="wlcm-bck-txt">Welcome back, {Auth.getProfile().data.username}!</h2>
                  <p>You're logged in and ready to binge!</p>
                </motion.div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* HOW IT WORKS CONTAINER */}
<section className="how-it-works-section">
  <motion.div
    className="how-it-works-container"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h2 className="section-title">How It Works</h2>
    
    <div className="steps-container">
      <div className="step-card">
        <div className="step-icon">
          <img src="https://img.icons8.com/fluency/48/search.png" alt="search" />
        </div>
        <h3 className="step-title">Browse</h3>
        <p className="step-description">Find a movie or show and save it to your watchlist!</p>
      </div>

      <div className="step-card">
        <div className="step-icon">
          <img src="https://img.icons8.com/fluency/48/star--v1.png" alt="star"/>
        </div>
        <h3 className="step-title">Save</h3>
        <p className="step-description">Save movies/shows to your watch list using the star!</p>
      </div>

      <div className="step-card">
        <div className="step-icon">
        <img width="15" height="15" src="https://img.icons8.com/color/48/messaging-.png" alt="messaging-"/>
        </div>
        <h3 className="step-title">React</h3>
        <p className="step-description">React to saved media and see friends' reactions!</p>
      </div>
    </div>
  </motion.div>
</section>
    </>
  );
};

export default Home;


