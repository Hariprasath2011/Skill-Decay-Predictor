import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    if (['/login', '/register'].includes(location.pathname)) {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Skill Decay Predictor</Link>
            </div>
            <div className="navbar-links">
                {user ? (
                    <>
                        {user.roles && user.roles.includes('ROLE_ADMIN') ? (
                            <Link to="/admin">Dashboard</Link>
                        ) : (
                            <Link to="/dashboard">Dashboard</Link>
                        )}
                        <Link to="/leaderboard" className="hover:text-blue-200">Leaderboard</Link>
                        <Link to="/history" className="hover:text-blue-200">History</Link>
                        <Link to="/profile" className="hover:text-blue-200">Profile</Link>
                        {!user.roles?.includes('ROLE_ADMIN') && (
                            <>
                                <Link to="/add-skill" className="hover:text-blue-200">Add Skill</Link>
                                <Link to="/notifications" className="hover:text-blue-200">Notifications</Link>
                            </>
                        )}
                        <button onClick={logout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
