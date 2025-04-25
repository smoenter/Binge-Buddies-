import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import './index.css';
import logoutIcon from '../../assets/logout.svg';
import { Nav } from '../Nav'

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };

  const isLoggedIn = Auth.loggedIn();

  return (
    <header className="custom-header text-light mb-4 py-3">
  <div className="container flex-row justify-space-between-lg justify-center align-center">
    {isLoggedIn ? (
      <div className="header-content flex-row align-center gap">
        <Nav />
        <div className="auth-buttons">
          <button className="btn btn-lg btn-light" onClick={logout}>
            <img src={logoutIcon} alt="Logout" style={{ width: '24px', height: '24px' }} />
          </button>
        </div>
      </div>
    ) : (
      <div className="auth-buttons">
        <Link className="auth-link" to="/login">Login</Link>
        <Link className="auth-link" to="/signup">Signup</Link>
      </div>
    )}
  </div>
</header>
  );
};

export default Header;
