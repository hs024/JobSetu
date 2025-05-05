import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import TestScreen from './components/TestScreen';
import ResultScreen from './components/ResultScreen';

const App = () => {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home  />} />
        <Route path="/test/:jobId" element={<TestScreen />} />
        <Route
          path="/result"
          element={<ResultScreen />}
        />
      </Routes>
    </Router>
  );
};

export default App;
