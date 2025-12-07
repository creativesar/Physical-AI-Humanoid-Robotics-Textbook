import React from 'react';
import { UserProvider } from '../../components/Auth/UserContext';
import AuthPage from '../../components/Auth/AuthPage';

function SignupPage() {
  return (
    <UserProvider>
      <AuthPage action="signup" />
    </UserProvider>
  );
}

export default SignupPage;