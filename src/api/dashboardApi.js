// src/api/dashboardApi.js
import axios from 'axios'; // Or your configured axios instance

const getApiInstance = () => { // Helper if not using a global instance
    const instance = axios.create({ baseURL: '/api' });
    const token = localStorage.getItem('authToken');
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return instance;
};

export const getDashboardSummary = async () => {
    const api = getApiInstance(); // Use your preferred way to get the axios instance
    try {
        const response = await api.get('/dashboard/summary'); // Replace with your actual endpoint
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard summary:', error.response ? error.response.data : error.message);
        throw error.response?.data || new Error('Failed to fetch dashboard summary');
    }
};