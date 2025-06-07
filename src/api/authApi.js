// frontend/src/api/authApi.js
import axios from 'axios';

const API_URL = '/api/auth'; // Uses Vite proxy

// Axios instance (can be shared or created per service)
// If AuthContext configures axios.defaults, this will inherit it.
const apiClient = axios.create({
  baseURL: '/api', // Redundant if axios.defaults.baseURL is set globally
});

// Interceptor to add token (if not handled globally by AuthContext's axios instance)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post(`${API_URL}/login`, credentials);
    // Save token and user data in AuthContext from here or return to component
    return response.data; // Should contain token and user info
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Add logout if your backend has a logout endpoint to invalidate tokens server-side
// export const logoutUser = async () => { ... };