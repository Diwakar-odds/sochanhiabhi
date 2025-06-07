// frontend/src/api/itemApi.ts
import axios from 'axios';

const getApiInstance = () => {
    const instance = axios.create({
        baseURL: '/api', // Your Vite proxy target for backend API
    });

    const token = localStorage.getItem('authToken');
    if (token) {
        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return instance;
};

/**
 * Creates a new item.
 * @param {object} itemData - The data for the item to be created.
 * Should include: title, description, category, condition, images (array of strings), desiredSwaps.
 * @returns {Promise<object>} The created item object from the backend.
 */
export const createItem = async (itemData) => {
    const api = getApiInstance();
    try {
        const response = await api.post('/items', itemData); // Ensure backend route is /api/items
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error.response ? error.response.data : error.message);
        // Throw a more specific error or the error data from the backend
        const errorMessage = error.response?.data?.message || error.message || 'Failed to create item';
        throw new Error(errorMessage);
    }
};

/**
 * Fetches all items.
 * @returns {Promise<Array<object>>} An array of item objects.
 */
export const getItems = async (params = {}) => {
    const api = getApiInstance();
    try {
        const response = await api.get('/items', { params });
        // It's good practice to ensure the backend actually sends data.
        // You might want to add checks here if `response.data` could be undefined or null
        // when the status is 200 (though unusual for a GET list).
        return response.data;
    } catch (error) {
        let errorMessage = 'An unexpected error occurred while fetching items.';
        let errorDetails = null; // To store backend's specific error payload
        let statusCode = null;

        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx (e.g., 400, 401, 403, 404, 500)
            statusCode = error.response.status;
            errorDetails = error.response.data; // This is often an object like { message: "...", details: "..." }

            // Try to get a meaningful message from the backend response
            if (errorDetails && typeof errorDetails.message === 'string') {
                errorMessage = errorDetails.message;
            } else if (typeof errorDetails === 'string') { // Sometimes the error is just a string
                errorMessage = errorDetails;
            } else {
                // Fallback if no specific message field is found in error.response.data
                switch (statusCode) {
                    case 400:
                        errorMessage = 'Bad request. Please check your parameters.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized. You may need to log in again.';
                        // Optionally, trigger a logout or token refresh mechanism here if applicable globally
                        break;
                    case 403:
                        errorMessage = 'Forbidden. You do not have permission to access this resource.';
                        break;
                    case 404:
                        errorMessage = 'Items not found.';
                        break;
                    case 500:
                        errorMessage = 'Server error. Please try again later.';
                        break;
                    default:
                        errorMessage = `Request failed with status ${statusCode}.`;
                }
            }
            console.error(`API Error (Status ${statusCode}) fetching items:`, errorDetails || error.message);

        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.ts
            errorMessage = 'Unable to reach the server. Please check your network connection.';
            console.error('Network error fetching items:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            errorMessage = error.message || 'An error occurred while preparing the request.';
            console.error('Request setup error fetching items:', error.message);
        }

        // Construct a new error object to throw, ensuring it has useful properties
        // for the calling component to inspect.
        const enhancedError = new Error(errorMessage);
        enhancedError.status = statusCode;       // The HTTP status code from the response, if any
        enhancedError.details = errorDetails;    // The full error payload from the backend, if any
        enhancedError.isAxiosError = error.isAxiosError || false; // Keep track if it was an Axios error

        // You might also want to add a specific error code or type if you have a system for that
        // enhancedError.code = 'FETCH_ITEMS_FAILED';

        throw enhancedError; // Throw the enhanced error object
    }
};
// Add other item-related API functions here as needed:
// export const getItemById = async (itemId) => { ... };
// export const updateItem = async (itemId, itemData) => { ... };
// export const deleteItem = async (itemId) => { ... };
// Example: Get dashboard summary for the logged-in user
export const getDashboardSummary = async () => {
    const api = getApiInstance();
    try {
        // This endpoint needs to be created on your backend.
        // It should return data for the authenticated user based on their token.
        const response = await api.get('/users/me/dashboard-summary');
        // Expected response: { listedItemsCount: 5, completedSwapsCount: 2 }
        return response.data;
    } catch (error) {
        console.error('Error fetching dashboard summary:', error.response ? error.response.data : error.message);
        throw error.response?.data || new Error('Failed to fetch dashboard summary');
    }
};


// getRecentItems can reuse getItems with specific parameters
export const getRecentItems = async (limit = 3) => {
    try {
        // The getItems function will now throw the enhancedError
        return await getItems({ limit, sortBy: 'createdAt', sortOrder: 'desc' });
    } catch (error) {
        // You can choose to re-throw the error as is, or further wrap/handle it here
        // For instance, if getRecentItems failing has a more specific user impact
        console.error('Error in getRecentItems:', error.message, error.status ? `Status: ${error.status}` : '');
        // Re-throwing the already enhanced error is usually fine
        throw error;
    }
};