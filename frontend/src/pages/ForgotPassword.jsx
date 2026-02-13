import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setLoading(true);

        try {
            await api.post('/api/auth/forgot-password', { email });
            setMessage('If an account exists with that email, a reset link has been sent (check backend console).');
        } catch (err) {
            setError('Request failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            height: '80vh', maxWidth: '400px', margin: '0 auto'
        }}>
            <h2 className="text-3xl font-bold mb-6 text-indigo-400">Forgot Password</h2>

            {message && <div style={{ background: 'rgba(0,255,0,0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{message}</div>}
            {error && <div style={{ background: 'rgba(255,0,0,0.2)', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: '#1e293b', color: 'white' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%', padding: '12px', background: loading ? '#6c757d' : '#6366f1',
                        color: 'white', border: 'none', borderRadius: '5px', cursor: loading ? 'not-allowed' : 'pointer'
                    }}
                >
                    {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
            </form>

            <div style={{ marginTop: '20px' }}>
                <Link to="/" style={{ color: '#94a3b8' }}>Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
