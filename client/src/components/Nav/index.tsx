// components/Nav.tsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import './index.css'; 
import Logo from "../../assets/BB-logo-4.png"

export const Nav = () => {
  const location = useLocation();

  return (
    // Animate the navbar on mount
    <motion.nav
      className="custom-nav navbar navbar-expand-lg px-4 py-2 mx-auto"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
    >

      {/* BINGE BUDDIE ICON */}
      <Link className="navbar-brand" to="/">
      <img src={Logo} alt="Logo" className="nav-logo" />
      </Link>

      <div className="custom-navbar-nav d-flex flex-row gap-4">
        {["/", "/browse", "/yourwatchlist", "/reactions"].map((path, index) => {
          const labels = ["Home", "Browse", "WatchList", "Reactions"];
          const isActive = location.pathname === path;
          return (
            <motion.div
              key={path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className={`custom-nav-link ${isActive ? "active-nav-link" : ""}`}
                to={path}
              >
                {labels[index]}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.nav>
  );
};