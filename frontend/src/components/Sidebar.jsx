import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, closeSidebar }) => {
    const { user } = useAuth();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <>
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header" style={{ justifyContent: 'space-between' }}>
                    <Link to="/" className="brand-logo" onClick={closeSidebar}>Skill Decay</Link>
                    <button onClick={closeSidebar} className="icon-btn" style={{ fontSize: '1.2rem' }}>✕</button>
                </div>

                <nav className="sidebar-nav">
                    {user && user.roles && user.roles.includes('ROLE_ADMIN') ? (
                        <Link to="/admin" className={`nav-item ${isActive('/admin')}`} onClick={closeSidebar}>
                            <span className="icon">⚡</span> Dashboard
                        </Link>
                    ) : (
                        <Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`} onClick={closeSidebar}>
                            <span className="icon">📊</span> Dashboard
                        </Link>
                    )}

                    <Link to="/leaderboard" className={`nav-item ${isActive('/leaderboard')}`} onClick={closeSidebar}>
                        <span className="icon">🏆</span> Leaderboard
                    </Link>

                    <Link to="/history" className={`nav-item ${isActive('/history')}`} onClick={closeSidebar}>
                        <span className="icon">📜</span> History
                    </Link>

                    <Link to="/profile" className={`nav-item ${isActive('/profile')}`} onClick={closeSidebar}>
                        <span className="icon">👤</span> Profile
                    </Link>

                    {!user?.roles?.includes('ROLE_ADMIN') && (
                        <Link to="/add-skill" className={`nav-item ${isActive('/add-skill')}`} onClick={closeSidebar}>
                            <span className="icon">➕</span> Add Skill
                        </Link>
                    )}
                </nav>

                <div className="sidebar-footer">
                    <span className="user-email">{user?.email}</span>
                </div>
            </aside>

            {isOpen && (
                <div
                    className="sidebar-overlay"
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 90,
                        backdropFilter: 'blur(3px)'
                    }}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
