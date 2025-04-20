import { Routes, Route } from "react-router-dom";

import Footer  from "./components/Footer";

import ErrorPage from './pages/Error';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import Watchlist from "./pages/YourWatchList";
import Reactions from "./pages/Reactions";

const App = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-white">
      {/* <main className="container-fluid"> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/reactions" element={<Reactions />} />
        </Routes>
      {/* </main> */}
      <Footer />
    </div>
  );
};

export default App;