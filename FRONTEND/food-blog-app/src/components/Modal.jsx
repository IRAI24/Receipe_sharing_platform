// src/components/Modal.jsx (Corrected)
import React from 'react';
import './Modal.css'; // Import the stylesheet

export default function Modal({ isOpen, setIsOpen, children }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Use classNames instead of inline styles */}
      <div className="backdrop" onClick={() => setIsOpen(false)}></div>
      <div className="modal">
        <button className="close-btn" onClick={() => setIsOpen(false)}>
          &times;
        </button>
        <div className="modal-content">{children}</div>
      </div>
    </>
  );
}