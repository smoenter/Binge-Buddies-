import { useLocation, useNavigate } from 'react-router-dom';

import "./index.css"

const Footer: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const showBackButton = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <footer className="custom-footer w-100 mt-auto p-3">
      <div className="container text-center">
        {showBackButton && (
          <button className="btn btn-outline-light mb-2" onClick={handleGoBack}>
            &larr; Go Back
          </button>
        )}

        <h5 className="footer-text">
          Made with{' '}
          <span role="img" aria-label="heart" aria-hidden="false">
            ❤️
          </span>{' '}
          by the Binge Buddies team.
        </h5>

        <div className="footer-social">
          
          <a href="https://github.com/smoenter/Binge-Buddies-" aria-label="GitHub">
          <img width="40" height="40" src="https://img.icons8.com/ios-filled/50/github.png" alt="github"/>
          </a>
        </div>

        <h6>All rights reserved 2025®</h6>

        {/* <button className="scroll-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button> */}
      </div>
    </footer>
  );
};

export default Footer;