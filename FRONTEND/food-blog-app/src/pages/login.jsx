import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';
import InputForms from '../components/inputForms'; // Corrected filename case

export default function Login() {
  // This component's only job is to manage the modal's visibility.
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  // This effect handles what happens when the modal is closed.
  useEffect(() => {
    // If the user closes the modal (e.g., by clicking the 'x' or backdrop),
    // we navigate them back to the homepage.
    if (!isModalOpen) {
      navigate('/'); 
    }
  }, [isModalOpen, navigate]);

  return (
    // The Modal component controls its own open/close state.
    // The InputForms component inside handles the entire login/signup API call
    // and uses the AuthContext to update the application state.
    <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
      <InputForms setIsOpen={setIsModalOpen} />
    </Modal>
  );
}