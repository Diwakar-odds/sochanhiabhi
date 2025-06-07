// frontend/src/api/proposalApi.js
import axios from 'axios';

const API_URL = '/api/proposals';

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


export const createProposal = async (proposalData) => {
  try {
    const response = await apiClient.post(API_URL, proposalData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getMyProposals = async () => {
  try {
    const response = await apiClient.get(`${API_URL}/my`);
    return response.data; // Expected: { incoming: [], outgoing: [] }
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProposalById = async (proposalId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${proposalId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const updateProposalStatus = async (proposalId, statusUpdate) => { // statusUpdate = { status: 'accepted' | 'declined' ... }
  try {
    const response = await apiClient.put(`${API_URL}/${proposalId}/status`, statusUpdate);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const getProposalMessages = async (proposalId) => {
  try {
    const response = await apiClient.get(`${API_URL}/${proposalId}/messages`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const addProposalMessage = async (proposalId, messageData) => { // messageData = { text: '...' }
  try {
    const response = await apiClient.post(`${API_URL}/${proposalId}/messages`, messageData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};