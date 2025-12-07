import React, { useState, useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { useAuth } from './BetterAuth';
import {
  LoginForm,
  SignupForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  EmailVerificationForm
} from './Forms';
import styles from './Auth.module.css';

const AuthPage = ({ action: propAction }) => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [currentView, setCurrentView] = useState(propAction || 'login');
  const [globalMessage, setGlobalMessage] = useState('');

  // Extract action from URL path if not passed as prop
  const extractActionFromPath = () => {
    const pathSegments = location.pathname.split('/');
    const validActions = ['login', 'signup', 'forgot-password', 'reset-password', 'verify-email'];
    return validActions.find(action => pathSegments.includes(action)) || 'login';
  };

  // Redirect if already authenticated
  useEffect(() => {
    const action = propAction || extractActionFromPath();
    if (isAuthenticated && (action === 'login' || action === 'signup')) {
      window.location.href = '/dashboard';
    }
  }, [isAuthenticated, propAction, location.pathname]);

  // Handle auth state changes and success messages
  const handleAuthSuccess = (type = 'login') => {
    if (type === 'signup-success') {
      setGlobalMessage('Account created successfully! Please check your email to verify your account.');
      setTimeout(() => {
        setCurrentView('login');
        setGlobalMessage('');
      }, 3000);
    } else {
      // Redirect to dashboard after login
      window.location.href = '/dashboard';
    }
  };

  // Switch between auth views
  const switchToLogin = () => setCurrentView('login');
  const switchToSignup = () => setCurrentView('signup');
  const switchToForgotPassword = () => setCurrentView('forgot-password');

  // Extract token from URL search parameters
  const extractTokenFromUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('token');
  };

  // Handle initial action based on URL
  useEffect(() => {
    const action = propAction || extractActionFromPath();
    setCurrentView(action);
  }, [propAction, location.pathname]);

  // Render the appropriate form based on current view
  const renderAuthForm = () => {
    const token = extractTokenFromUrl();
    switch (currentView) {
      case 'signup':
        return (
          <SignupForm
            onSwitchToLogin={switchToLogin}
            onSuccess={handleAuthSuccess}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={switchToLogin}
          />
        );
      case 'reset-password':
        return <ResetPasswordForm token={token} />;
      case 'verify-email':
        return <EmailVerificationForm token={token} />;
      case 'login':
      default:
        return (
          <LoginForm
            onSwitchToLogin={switchToSignup}
            onSwitchToForgotPassword={switchToForgotPassword}
            onSuccess={handleAuthSuccess}
          />
        );
    }
  };

  return (
    <div className={styles.authPage}>
      {globalMessage && (
        <div className={styles.globalMessage}>
          {globalMessage}
        </div>
      )}
      {renderAuthForm()}
    </div>
  );
};

export default AuthPage;