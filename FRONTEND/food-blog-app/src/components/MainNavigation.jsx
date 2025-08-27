import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
// 1. Make sure Outlet is imported from react-router-dom
import { Outlet } from 'react-router-dom'

export default function MainNavigation() {
  return (
    <>
      <Navbar/>
      
      <main>
        {/* 2. THE FIX: The <Outlet /> component is essential. 
          It renders the specific page component (e.g., Home or AddFoodRecipe) 
          based on the current URL.
        */}
        <Outlet/>
      </main>
      
      <Footer/>
    </>
  )
}
