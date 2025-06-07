// frontend/src/api/userApi.js
import axios from 'axios';

const API_URL = '/api/users';

const apiClient = axios.create({ baseURL: '/api' });
apiClient.interceptors.request.use( /* ... token interceptor as in authApi.js ... */
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  }, (error) => Promise.reject(error)
);


export const getUserProfile = async () => { // Gets logged-in user's profile
  try {
    const response = await apiClient.get(`${API_URL}/profile`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateUserProfile = async (profileData) => {
  try {
    // If handling image uploads as FormData, adjust config
    const response = await apiClient.put(`${API_URL}/profile`, profileData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getDashboardSummary = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/dashboard/summary`);
    return response.data; // Expected { listedItemsCount, completedSwapsCount }
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get public profile of another user
export const getPublicUserProfileByIdOrUsername = async (identifier) => {
  try {
    const response = await apiClient.get(`${API_URL}/${identifier}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};