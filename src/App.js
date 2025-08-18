import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Login from '../src/components/Login/login';

const App = () => {
  return (
    <Routes>
      {/* Route không có layout */}
      <Route path="/login" element={<Login />} />

      {/* Route có layout chung */}
      <Route path="/*" element={<Layout />} />
    </Routes>
  );
};

export default App;
