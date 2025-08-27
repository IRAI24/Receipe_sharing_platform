import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <h1>Oops! Something went wrong</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p style={{ fontStyle: 'italic', color: '#666' }}>
        {error?.statusText || error?.message || 'Unknown error'}
      </p>
      <Link 
        to="/" 
        style={{ 
          marginTop: '1rem', 
          padding: '0.5rem 1rem', 
          backgroundColor: '#007bff', 
          color: 'white', 
          textDecoration: 'none', 
          borderRadius: '4px' 
        }}
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
