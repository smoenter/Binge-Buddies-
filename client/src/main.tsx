import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from "./App";
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Browse from './pages/Browse';
import YourWatchlist from './pages/YourWatchList';
import Reactions from './pages/Reactions';
import Transition from './pages/Transition';
import "bootstrap/dist/css/bootstrap.min.css";

// Define your routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'browse', element: <Browse /> },
      { path: 'yourwatchlist', element: <YourWatchlist /> },
      { path: 'reactions', element: <Reactions /> },
      { path: 'transition', element: <Transition /> },
      
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);