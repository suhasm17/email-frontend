import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<div>Admin Page</div>} />
        <Route path="/user" element={<div>User Page</div>} />
        <Route path="/" element={<Homepage />} />
      </Routes>
    </Router>
  );
}

export default App;
