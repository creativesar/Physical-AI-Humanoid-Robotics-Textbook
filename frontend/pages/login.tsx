import React, { useState } from 'react';
import { useAuth } from '../src/hooks/useAuth';
import { useHistory, Redirect } from '@docusaurus/router';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Added email field for registration
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // true for login, false for register
  const { login, register, token, loading } = useAuth();
  const [error, setError] = useState('');

  // If already logged in, redirect to home
  if (token) {
    return <Redirect to="/" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        // For registration, we need both username and email
        await register(username, email, password);
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setError(
        isLogin
          ? err?.message || 'Login failed. Please check your credentials.'
          : err?.message || 'Registration failed. Username or email may already exist.'
      );
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80vh',
        backgroundColor: 'black',
        color: 'white',
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '80vh',
      backgroundColor: 'black',
      color: 'white',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem',
        border: '1px solid #555',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontFamily: 'Sora, sans-serif' }}>
          {isLogin ? 'Login' : 'Register'}
        </h2>

        {error && (
          <div style={{
            color: 'red',
            marginBottom: '1rem',
            padding: '0.5rem',
            border: '1px solid red',
            borderRadius: '4px',
            backgroundColor: '#330000',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isLogin}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  borderRadius: '4px',
                  border: '1px solid #555',
                  backgroundColor: '#333',
                  color: 'white',
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>
              {isLogin ? 'Username or Email' : 'Username'}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: 'white',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid #555',
                backgroundColor: '#333',
                color: 'white',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '4px',
              border: 'none',
              backgroundColor: loading ? '#555' : '#25c19f',
              color: 'black',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError('');
              setEmail(''); // Clear email when switching modes
            }}
            style={{
              background: 'none',
              border: 'none',
              color: '#25c19f',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;