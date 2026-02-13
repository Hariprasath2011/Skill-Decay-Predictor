import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth();
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
            await register({ email, password }); // Backend expects {email, password} structure in AuthRequestDTO
            showNotification('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            showNotification('Registration failed. Email might be in use.', 'error');
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
                <h2>Register</h2>
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

                    <button type="submit" className="register-btn" style={{ width: '100%', marginTop: '1rem', backgroundColor: 'var(--success)' }}>Register</button>

                    <div className="auth-switch" style={{ marginTop: '1.5rem' }}>
                        Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
