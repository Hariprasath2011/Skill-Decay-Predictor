import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        try {
            await api.post('/api/auth/reset-password', { token, newPassword: password });
            setMessage('Password reset successful! Redirecting to login...');
            setTimeout(() => navigate('/'), 3000);
        } catch (err) {
            setError('Reset failed. Token may be invalid or expired.');
        }
    };

    if (!token) return <div className="p-8 text-center">Invalid Request</div>;

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '80vh', maxWidth: '400px', margin: '0 auto'
        }}>
            <h2 className="text-3xl font-bold mb-6 text-indigo-400">Reset Password</h2>

            {message && <div style={{ background: 'rgba(0,255,0,0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
            {error && <div style={{ background: 'rgba(255,0,0,0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: '#1e293b', color: 'white' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: '#1e293b', color: 'white' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        width: '100%', padding: '12px', background: '#6366f1',
                        color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer'
                    }}
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};

export default ResetPassword;
