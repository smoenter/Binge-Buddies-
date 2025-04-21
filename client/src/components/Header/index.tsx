import { Link } from 'react-router-dom';
import { type MouseEvent} from 'react';
import Auth from '../../utils/auth';
import './index.css';
import logoutIcon from '../../assets/logout.svg';

const Header = () => {
  const logout = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // Logs the user out by calling the logout method from Auth
    Auth.logout();
  };
  return (
    <header className="custom-header text-light mb-4 py-3 flex-row align-center">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <div className="auth-buttons">
          {Auth.loggedIn() ? (
  <>
    <button className="btn btn-lg btn-light m-2" onClick={logout}>
      <img src={logoutIcon} alt="Logout" style={{ width: '24px', height: '24px' }} />
    </button>
  </>
) : (
  <>
    <Link className="auth-link" to="/login">
      Login
    </Link>
    <Link className="auth-link" to="/signup">
      Signup
    </Link>
  </>
)}
        </div>
      </div>
    </header>
  );
};

export default Header;
