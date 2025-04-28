import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import VideoBackground from '../components/HomeVideoBG/index';
import "./css/Home.css"

const Home = () => {
  return (

    <>
      <VideoBackground />

    <main>
      
      <div className="flex-row justify-center">
        {!Auth.loggedIn() ? (
          // LOGGED OUT PAGE
          <div className="col-12 col-md-8 mb-3">

            <div className="card text-center">
              {/* GETTING STARTED CARD SECTION */}
              <h4 className="card-header bg-dark text-light">Getting Started</h4>
              <div className="card-body">
                {/* LOGIN/SIGNUP LINKS */}
                <p>
                  Please <Link to="/login" className="auth-link">log in</Link> or{' '}
                  <Link to="/signup" className="auth-link">sign up</Link> to get started.
                </p>
              </div>
            </div>
            {/* JOIN US TEXT */}
            <div className="card-footer text-muted">
                <p>Join us in making connecting with friends and family simplistic again!</p>
                </div>

                {/* HOW IT WORKS DIV SECTION */}
            <div className="card-footer text-muted">
                <h2>HOW IT WORKS</h2>
                </div>
          </div>
        ) : (
          // LOGGED IN PAGE
          <div className="col-12 text-center">
            <h2>Welcome back, {Auth.getProfile().data.username}!</h2>
            <p>You're logged in and ready to go.</p>
          </div>
        )}
      </div>
    </main>
    </>
  );
};

export default Home;