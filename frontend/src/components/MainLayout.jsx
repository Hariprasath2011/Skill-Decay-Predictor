import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../context/AuthContext';

const MainLayout = ({ children }) => {
    const location = useLocation();
    const { user } = useAuth();

    // Theme State
    const [isDarkMode, setIsDarkMode] = useState(true);
    // Sidebar State (Hidden by default for "pop up" behavior)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        // Init theme from body class or local storage could be added here
        if (isDarkMode) {
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
        }
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    // Hide layout on login/register pages
    if (['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname)) {
        return <div className="auth-wrapper">{children}</div>;
    }

    // Require auth for layout usually, but we handle that with PrivateRoute.
    // However, if we are on a public page that is NOT auth (like maybe a landing page?),
    // we might want to hide sidebar?
    // For now assuming all non-auth pages are covered by the list above.

    if (!user) {
        // Fallback if user somehow gets here without auth (should happen via router redirect mostly)
        return <div className="auth-wrapper">{children}</div>;
    }

    return (
        <div className="app-container">
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
            <div className="main-content-wrapper">
                <Topbar
                    toggleTheme={toggleTheme}
                    isDarkMode={isDarkMode}
                    toggleSidebar={toggleSidebar}
                />
                <main className="page-content">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
