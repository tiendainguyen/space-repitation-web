import React, { useState } from 'react';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import './AuthenticationPages.css';

const AuthenticationPages = () => {
  const [currentPage, setCurrentPage] = useState('login');

  const switchToRegister = () => setCurrentPage('register');
  const switchToLogin = () => setCurrentPage('login');

  return (
    <div className="auth-pages">
      {currentPage === 'login' ? (
        <LoginPage onSwitchToRegister={switchToRegister} />
      ) : (
        <RegisterPage onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default AuthenticationPages;
