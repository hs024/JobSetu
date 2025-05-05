import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDetail from './components/Userdetail.jsx';
import Detail_job from "./components/Detail_job.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-detail" element={<UserDetail />} />
        <Route path="/job-detail/:id" element={<Detail_job />} />
      </Routes>
    </Router>
  </StrictMode>
);
