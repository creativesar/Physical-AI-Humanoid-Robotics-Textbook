import React from 'react';
import { UserProvider } from '../../components/Auth/UserContext';
import AuthPage from '../../components/Auth/AuthPage';

function LoginPage() {
  return (
    <UserProvider>
      <AuthPage action="login" />
    </UserProvider>
  );
}

export default LoginPage;