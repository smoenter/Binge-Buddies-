import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import VideoBackground from '../components/HomeVideoBG/index';
import "./css/Home.css"

const Home = () => {
  return (
    <>
    <div className="video-section">
      <VideoBackground />

      <main className="floating-card-container">
        {!Auth.loggedIn() ? (
          <div className="glass-card text-center">
            <h1 className="card-title">Get Started</h1>
            <p className="card-text">
              Please <Link to="/login" className="auth-link">log in</Link> or{' '}
              <Link to="/signup" className="auth-link">sign up</Link> to start sharing your reactions!
            </p>
          </div>
        ) : (
          <div className="glass-card text-center">
            <h2>Welcome back, {Auth.getProfile().data.username}!</h2>
            <p>You're logged in and ready to react!</p>
          </div>
        )}
      </main>
    </div>

    {/* --- BELOW THE VIDEO --- */}
    <section className="info-section">
      {/* <div className="info-card text-center">
        <p>Join us in making connecting with friends and family simplistic again!</p>
      </div> */}

      <div className="info-card text-center">
        <h2>How It Works</h2>
        <p></p>
      </div>
    </section>
  </>
);
};

export default Home;