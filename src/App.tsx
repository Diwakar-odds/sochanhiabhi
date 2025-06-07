// frontend/src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext'; // Your authentication context
import { Toaster } from "@/components/ui/sonner"; // Or correct relative path
// Layouts
import MainLayout from './components/Layout/MainLayout';

// Pages
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ListItemPage from './pages/ListItemPage'; // Page to list a new item
import NotFoundPage from './pages/NotFoundPage';
import MySwapsPage from './pages/MySwapsPage'; // <<< IMPORT NEW PAGE
import BrowsePage from './pages/BrowsePage';

// Placeholder pages for other links (you'll create these later)
const BrowsePagePlaceholder = () => <div className="container"><h2>Browse Items Page (Coming Soon)</h2></div>;
const MySwapsPagePlaceholder = () => <div className="container"><h2>My Swaps Page (Coming Soon)</h2></div>;
const MessagesPagePlaceholder = () => <div className="container"><h2>Messages Page (Coming Soon)</h2></div>;
const AISuggestionsPagePlaceholder = () => <div className="container"><h2>AI Suggestions Page (Coming Soon)</h2></div>;
const ProfilePagePlaceholder = () => <div className="container"><h2>Profile Page (Coming Soon)</h2></div>;
const ActivityPagePlaceholder = () => <div className="container"><h2>My Activity Page (Coming Soon)</h2></div>;


// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        // You can replace this with a more sophisticated loading spinner component
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5em' }}>Loading authentication...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

// Helper component for default route logic
const NavigateToDashboardOrLogin = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5em' }}>Loading...</div>;
    }

    return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <Router>
            <Routes>
                {/* Public routes (without MainLayout) */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected routes (WITH MainLayout) */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <MainLayout><DashboardPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/list-item"
                    element={
                        <ProtectedRoute>
                            <MainLayout><ListItemPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/browse"
                    element={
                        <ProtectedRoute>
                            <MainLayout><BrowsePagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/browse"
                    element={
                        <ProtectedRoute>
                            <MainLayout><BrowsePage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-swaps"
                    element={
                        <ProtectedRoute>
                            <MainLayout><MySwapsPagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route /* <<< ADD THIS ROUTE */
                    path="/my-swaps"
                    element={
                        <ProtectedRoute>
                            <MainLayout><MySwapsPage /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                 <Route
                    path="/messages"
                    element={
                        <ProtectedRoute>
                            <MainLayout><MessagesPagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/ai-suggestions"
                    element={
                        <ProtectedRoute>
                            <MainLayout><AISuggestionsPagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <MainLayout><ProfilePagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />
                <Route /* Added for Quick Action "View My Activity" */
                    path="/activity"
                    element={
                        <ProtectedRoute>
                            <MainLayout><ActivityPagePlaceholder /></MainLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Default route handler */}
                <Route
                    path="/"
                    element={<NavigateToDashboardOrLogin />}
                />

                {/* Catch-all 404 Not Found route */}
                <Route
                    path="*"
                    element={
                        // Render NotFoundPage within MainLayout if user might be authenticated
                        // Or a simpler NotFoundPage if you prefer no layout for 404
                        <MainLayout><NotFoundPage /></MainLayout>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;