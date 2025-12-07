// API utility functions for the Physical AI & Humanoid Robotics Textbook

const API_BASE_URL = 'http://localhost:8000';

// Function to get token from localStorage
const getToken = () => {
  return localStorage.getItem('access_token');
};

// Function to set token in localStorage
const setToken = (accessToken, refreshToken) => {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
};

// Function to clear tokens
const clearTokens = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

// Function to refresh token
const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refresh_token');
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (response.ok) {
      const data = await response.json();
      setToken(data.access_token, data.refresh_token);
      return data.access_token;
    } else {
      clearTokens();
      throw new Error('Token refresh failed');
    }
  } catch (error) {
    clearTokens();
    throw error;
  }
};

// API request function with token handling
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getToken();
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  let response = await fetch(url, config);

  // If unauthorized, try to refresh token and retry request
  if (response.status === 401) {
    try {
      const newToken = await refreshToken();
      config.headers['Authorization'] = `Bearer ${newToken}`;
      response = await fetch(url, config);
    } catch (refreshError) {
      // If refresh fails, redirect to login
      clearTokens();
      window.dispatchEvent(new CustomEvent('auth:logout'));
    }
  }

  return response;
};

// Authentication functions
export const signIn = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: email, // FastAPI expects 'username' for email
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
    setToken(data.access_token, data.refresh_token);
    return { success: true, user: data };
  } else {
    const errorData = await response.json();
    return { success: false, error: errorData.detail || 'Sign in failed' };
  }
};

export const signUp = async (name, email, password) => {
  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password
    }),
  });

  if (response.ok) {
    const data = await response.json();
    // Automatically sign in after signing up
    return signIn(email, password);
  } else {
    const errorData = await response.json();
    return { success: false, error: errorData.detail || 'Sign up failed' };
  }
};

export const signOut = async (refreshToken) => {
  try {
    if (refreshToken) {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        }),
      });
    }
  } catch (error) {
    console.error('Error during logout:', error);
  } finally {
    clearTokens();
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiRequest('/auth/me');
    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching user info:', error);
    return null;
  }
};

// Chat functions
export const sendMessage = async (message, conversationId = null) => {
  return await apiRequest('/chat', {
    method: 'POST',
    body: JSON.stringify({
      message: message,
      conversation_id: conversationId,
      include_rag: true
    }),
  });
};