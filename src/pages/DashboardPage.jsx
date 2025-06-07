// frontend/src/pages/DashboardPage.jsx
import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
import { useNavigate } from 'react-router-dom';
import styles from './DashboardPage.module.css'; // Assuming this CSS module exists
import { useAuth } from '../contexts/AuthContext.jsx'; // Assuming .jsx

// Import Dashboard Components
import StatCard from '../components/Dashboard/StatCard.jsx'; // Assuming .jsx
import AISuggestionCard from '../components/Dashboard/AISuggestionCard.jsx'; // Assuming .jsx
import QuickActionCard from '../components/Dashboard/QuickActionCard.jsx'; // Assuming .jsx
import RecentItem from '../components/Dashboard/RecentItem.jsx'; // Assuming .jsx

// API Functions - ENSURE THESE FILES AND FUNCTIONS EXIST
import { getItems as fetchRecentItemsApi } from '../api/itemApi.js'; // Renamed for clarity, assuming it can take a limit
import { getDashboardSummary as fetchDashboardSummaryApi } from '../api/dashboardApi.js'; // Renamed for clarity

// Icons
import {
    FaListUl,
    FaCheckCircle,
    FaPlus,
    FaThList,
    FaHistory,
    FaExchangeAlt,
} from 'react-icons/fa';

const DashboardPage = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // Combined state for dashboard summary data
    const [summaryData, setSummaryData] = useState({
        listedItemsCount: 0,
        completedSwapsCount: 0,
    });
     const [isLoadingSummary, setIsLoadingSummary] = useState(true);
    const [summaryError, setSummaryError] = useState(null);

    const [recentItems, setRecentItems] = useState([]);
    const [loading, setLoading] = useState(true); // Single loading state for initial data
    const [error, setError] = useState(null);

        useEffect(() => {
        const fetchSummary = async () => {
            if (!user) return; // Don't fetch if no user
            setIsLoadingSummary(true);
            setSummaryError(null);
            try {
                // const data = await getDashboardSummary(); // Your actual API call
                // For now, let's simulate the API call structure
                const response = await axios.get('/api/dashboard/summary'); // Using axios directly for example
                setSummaryData(response.data);
            } catch (err) {
                console.error("Failed to fetch dashboard summary:", err.response ? err.response.data : err.message);
                setSummaryError(err.response?.data?.message || 'Failed to load summary.');
                setSummaryData({ listedItemsCount: 'N/A', completedSwapsCount: 'N/A' }); // Reset on error
            } finally {
                setIsLoadingSummary(false);
            }
        };

        fetchSummary();
    }, [user]); // Re-fetch if user changes

    const fetchDashboardData = useCallback(async () => {
        if (!user?._id) { // Ensure user and user._id exist
            setLoading(false); // Stop loading if no user
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Fetch summary data and recent items in parallel
            // The API functions need to be implemented to fetch data for the *current user*
            // by passing user._id or relying on the backend to use the authenticated user from the token.
            const [summary, items] = await Promise.all([
                fetchDashboardSummaryApi(), // Assumes backend uses token to identify user
                fetchRecentItemsApi({ limit: 3, sort: 'createdAt_desc' }) // Pass params if API supports it
                                      // Or, if it just gets all items and you filter client-side (less ideal):
                                      // fetchAllItemsApi().then(allItems => allItems.slice(0, 3))
            ]);

            if (summary) {
                setSummaryData({
                    listedItemsCount: summary.userItemsCount || 0, // Adjust to match your API response
                    completedSwapsCount: summary.userSwapsCount || 0, // Adjust to match your API response
                });
            }

            // Ensure items is an array
            setRecentItems(Array.isArray(items) ? items : (items?.items || []));


        } catch (err) {
            console.error("Failed to fetch dashboard data:", err);
            let displayMessage = "Could not load dashboard data. Please try again later.";
            if (err.response && err.response.data && err.response.data.message) {
                displayMessage = err.response.data.message;
            } else if (err.message) {
                displayMessage = err.message;
            }
            // Handle specific errors like 401 if needed (e.g., trigger logout from AuthContext)
            // if (err.response?.status === 401) { /* handle session expiry */ }
            setError(displayMessage);
        } finally {
            setLoading(false);
        }
    }, [user]); // Re-fetch if user changes

    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]); // fetchDashboardData is memoized with useCallback


    // ---- Placeholder for actual Recent Items Rendering ----
    // The "Recently Listed Items" section below should use the `recentItems` state.
    // If `recentItems` is empty after loading, it should show "No recent items".

    return (
        <div className={styles.dashboardContainer || "p-4 md:p-6"}> {/* Fallback class if module not loaded */}
            <h2 className={styles.welcomeMessage || "text-2xl font-semibold mb-6"}>
                Welcome, {user?.username || 'User'}!
            </h2>
            {error && <div className="alert alert-danger mb-4">{error}</div>}

            <div className={styles.topRow || "grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6"}>
                <StatCard
                    title="Your Listed Items"
                    // Display '...' during load, or error state, then actual count
                    count={loading ? "..." : (error ? "N/A" : summaryData.listedItemsCount.toString())}
                    description="items currently listed for swap"
                    buttonText="View My Items"
                    onButtonClick={() => navigate('/profile', { state: { defaultTab: 'my-items' } })} // Pass state for tab
                    icon={<FaListUl size={24} />}
                    buttonClass="btn-primary-green" // Ensure this class is defined in your global CSS or Tailwind
                />
                <StatCard
                    title="Completed Swaps"
                    count={loading ? "..." : (error ? "N/A" : summaryData.completedSwapsCount.toString())}
                    description="successful exchanges made"
                    buttonText="View History (Soon)"
                    onButtonClick={() => navigate('/my-swaps', { state: { defaultTab: 'completed' } })} // Example
                    icon={<FaCheckCircle size={24} />}
                    buttonClass="btn-secondary-outline"
                />
                <AISuggestionCard
                    onGetSuggestions={() => navigate('/ai-suggestions')} // Assuming this page exists
                />
            </div>

            <div className={styles.bottomRow || "grid gap-6 lg:grid-cols-3"}> {/* Adjusted grid for common pattern */}
                <div className={`${styles.quickActionsSection} lg:col-span-2`}> {/* Quick actions take more space */}
                    <h3 className={styles.sectionTitle || "text-xl font-semibold mb-4"}>Quick Actions</h3>
                    <div className={styles.quickActionsGrid || "grid gap-4 sm:grid-cols-2"}>
                        <QuickActionCard
                            title="List a New Item"
                            description="Share something to swap."
                            icon={<FaPlus size={22} />}
                            onClick={() => navigate('/list-item')}
                        />
                        <QuickActionCard
                            title="Browse All Items"
                            description="Find your next treasure."
                            icon={<FaThList size={22} />}
                            onClick={() => navigate('/browse')}
                        />
                        <QuickActionCard
                            title="Manage Swaps"
                            description="Check your proposals."
                            icon={<FaExchangeAlt size={22} />}
                            onClick={() => navigate('/my-swaps')}
                        />
                        <QuickActionCard
                            title="View My Activity"
                            description="Track your swapping journey."
                            icon={<FaHistory size={22} />}
                            onClick={() => navigate('/activity')} // Assuming this page exists
                        />
                    </div>
                </div>

                <div className={styles.recentItemsSection}>
                    <h3 className={styles.sectionTitle || "text-xl font-semibold mb-4"}>Recently Listed Items</h3>
                    <p className={styles.sectionSubtitle || "text-sm text-muted-foreground mb-4"}>
                        Check out what's new on EcoSwapHub.
                    </p>
                    <div className={styles.recentItemsList || "space-y-3"}>
                        {loading ? (
                            <p>Loading recent items...</p>
                        ) : error && !recentItems.length ? ( // Show error only if no items and error occurred
                            <p className="text-red-500">Could not load recent items.</p>
                        ): recentItems.length > 0 ? (
                            recentItems.map(item => (
                                <RecentItem
                                    key={item._id}
                                    title={item.title}
                                    category={item.category}
                                    imageUrl={item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/50x50.png?text=No+Image'}
                                />
                            ))
                        ) : (
                            <p className="text-muted-foreground">No recent items to display.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;