import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

const Topbar = ({ toggleTheme, isDarkMode, toggleSidebar }) => {
    const { logout } = useAuth();

    return (
        <header className="topbar">
            <div className="topbar-left" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    onClick={toggleSidebar}
                    className="icon-btn hamburger-btn"
                    title="Menu"
                    style={{ fontSize: '1.5rem', background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px' }}
                >
                    ☰
                </button>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', textDecoration: 'none', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Skill Decay Predictor
                </Link>
            </div>

            <div className="topbar-right">
                <Link to="/notifications" className="icon-btn" title="Notifications">
                    🔔
                </Link>

                <button onClick={toggleTheme} className="icon-btn" title="Toggle Theme">
                    {isDarkMode ? '🌞' : '🌙'}
                </button>

                <button onClick={logout} className="logout-btn">
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Topbar;
