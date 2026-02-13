import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    // Notification State
    const [notification, setNotification] = useState({ message: '', type: '' });

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            const roles = JSON.parse(localStorage.getItem('roles') || '[]');
            if (roles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            showNotification('Login failed. Please check your credentials.', 'error');
        }
    };

    return (
        <div className="auth-wrapper">
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={closeNotification}
            />

            <div className="auth-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <span
                        className="forgot-password-link"
                        onClick={() => navigate('/forgot-password')}
                    >
                        Forgot Password?
                    </span>

                    <button type="submit" style={{ width: '100%' }}>Login</button>

                    <div className="auth-separator">
                        <span>OR</span>
                    </div>

                    <button
                        type="button"
                        className="google-btn"
                        onClick={() => window.location.href = 'http://localhost:8081/oauth2/authorization/google'}
                    >
                        <img src="https://www.google.com/favicon.ico" alt="G" style={{ width: '18px' }} />
                        Sign in with Google
                    </button>

                    <div className="auth-switch">
                        Don't have an account? <span onClick={() => navigate('/register')}>Register</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
