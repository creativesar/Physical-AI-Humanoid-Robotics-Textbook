import React from 'react';
import { UserProvider } from '../../components/Auth/UserContext';
import AuthPage from '../../components/Auth/AuthPage';

function ForgotPasswordPage() {
  return (
    <UserProvider>
      <AuthPage action="forgot-password" />
    </UserProvider>
  );
}

export default ForgotPasswordPage;