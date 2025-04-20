// components/Nav.tsx
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

export const Nav = () => {
  const location = useLocation();

  return (
    <motion.nav
      className="navbar navbar-expand-lg navbar-dark bg-dark px-4 py-2"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70, damping: 15 }}
    >
      <Link className="navbar-brand" to="/">🎥 WatchWithMe</Link>
      <div className="navbar-nav d-flex flex-row gap-4">
        {["/", "/watchlist", "/reactions"].map((path, index) => {
          const labels = ["Home", "Watchlist", "Reaction Dashboard"];
          const isActive = location.pathname === path;
          return (
            <motion.div
              key={path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                className={`nav-link ${isActive ? "text-warning fw-bold" : "text-light"}`}
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