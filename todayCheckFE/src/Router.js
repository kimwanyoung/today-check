import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login';
import Navigation from './components/Navigation';

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/login/*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
