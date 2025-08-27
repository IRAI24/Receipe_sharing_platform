import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer';

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* This Outlet will render the active child route (e.g., Home, Login) */}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;