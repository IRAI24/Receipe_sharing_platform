// src/components/Footer.jsx (Polished)
import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <div className='footer'>
        <p>@copyright Iraianbu {currentYear}</p>
    </div>
  )
}