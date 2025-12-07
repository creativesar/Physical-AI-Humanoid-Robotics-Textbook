import React, { useState } from 'react';
import { authClient } from './BetterAuth';
import clsx from 'clsx';
import styles from './Auth.module.css';

const LoginForm = ({ onSwitchToSignup, onSwitchToForgotPassword, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await authClient.signIn(email, password);

    if (result.success) {
      onSuccess && onSuccess();
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Welcome Back</h2>
        <p className={styles.authSubtitle}>Sign in to continue your learning journey</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
            <span className={styles.inputHelper}>We'll never share your email with anyone else.</span>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputLabelContainer}>
              <label htmlFor="password" className={styles.inputLabel}>Password</label>
              <button
                type="button"
                className={styles.forgotPasswordLink}
                onClick={onSwitchToForgotPassword}
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={clsx(styles.primaryButton, {[styles.loading]: isLoading})}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Don't have an account?{' '}
            <button
              type="button"
              className={styles.switchLink}
              onClick={onSwitchToSignup}
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const SignupForm = ({ onSwitchToLogin, onSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    const result = await authClient.signUp(name, email, password);

    if (result.success) {
      onSuccess && onSuccess('signup-success');
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Create Account</h2>
        <p className={styles.authSubtitle}>Join our community of AI & Robotics enthusiasts</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.inputLabel}>Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your full name"
              required
              disabled={isLoading}
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="signup-email" className={styles.inputLabel}>Email Address</label>
            <input
              id="signup-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
            <span className={styles.inputHelper}>We'll use this for account verification</span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="signup-password" className={styles.inputLabel}>Password</label>
            <input
              id="signup-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Create a strong password"
              required
              disabled={isLoading}
            />
            <span className={styles.inputHelper}>Must be at least 8 characters</span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="confirm-password" className={styles.inputLabel}>Confirm Password</label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Confirm your password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={clsx(styles.primaryButton, {[styles.loading]: isLoading})}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Already have an account?{' '}
            <button
              type="button"
              className={styles.switchLink}
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ForgotPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await authClient.forgotPassword(email);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2 className={styles.authTitle}>Check Your Email</h2>
          <p className={styles.authSubtitle}>We've sent a password reset link to {email}</p>
          <p className={styles.authHelper}>
            Didn't receive the email? Check your spam folder or try again.
          </p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={onSwitchToLogin}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Reset Password</h2>
        <p className={styles.authSubtitle}>Enter your email to receive a reset link</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="forgot-email" className={styles.inputLabel}>Email Address</label>
            <input
              id="forgot-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.inputField}
              placeholder="Enter your email"
              required
              disabled={isLoading}
            />
            <span className={styles.inputHelper}>We'll send a reset link to this email</span>
          </div>

          <button
            type="submit"
            className={clsx(styles.primaryButton, {[styles.loading]: isLoading})}
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>
            Remember your password?{' '}
            <button
              type="button"
              className={styles.switchLink}
              onClick={onSwitchToLogin}
              disabled={isLoading}
            >
              Back to login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

const ResetPasswordForm = ({ token }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    const result = await authClient.resetPassword(token, password);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error);
    }

    setIsLoading(false);
  };

  if (success) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2 className={styles.authTitle}>Password Reset Success</h2>
          <p className={styles.authSubtitle}>Your password has been successfully reset</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => window.location.href = '/auth/login'}
          >
            Continue to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Set New Password</h2>
        <p className={styles.authSubtitle}>Create a new password for your account</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="reset-password" className={styles.inputLabel}>New Password</label>
            <input
              id="reset-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Create a new password"
              required
              disabled={isLoading}
            />
            <span className={styles.inputHelper}>Must be at least 8 characters</span>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="reset-confirm-password" className={styles.inputLabel}>Confirm New Password</label>
            <input
              id="reset-confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={styles.inputField}
              placeholder="Confirm your new password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className={clsx(styles.primaryButton, {[styles.loading]: isLoading})}
            disabled={isLoading}
          >
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

const EmailVerificationForm = ({ token }) => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    setError('');

    // In a real implementation, you would call an API endpoint to verify the email
    // This is a placeholder implementation
    try {
      // Simulate API call to verify email
      const response = await fetch(`http://localhost:3001/api/auth/verify-email/${token}`, {
        method: 'GET',
      });

      if (response.ok) {
        setSuccess(true);
      } else {
        const data = await response.json();
        setError(data.message || 'Email verification failed');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    handleVerify();
  }, [token]);

  if (success) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authCard}>
          <h2 className={styles.authTitle}>Email Verified</h2>
          <p className={styles.authSubtitle}>Your email has been successfully verified</p>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={() => window.location.href = '/dashboard'}
          >
            Continue to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2 className={styles.authTitle}>Verifying Email</h2>
        <p className={styles.authSubtitle}>Please wait while we verify your email address...</p>

        {error && <div className={styles.errorMessage}>{error}</div>}

        {isLoading && (
          <div className={styles.loadingSpinner}>
            <div className={styles.spinner}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export {
  LoginForm,
  SignupForm,
  ForgotPasswordForm,
  ResetPasswordForm,
  EmailVerificationForm
};