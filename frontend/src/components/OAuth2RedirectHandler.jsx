import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { login } = useAuth(); // We might need to expose a method to manually set token

    useEffect(() => {
        const token = searchParams.get('token');
        if (token) {
            // Manually storing token since we don't have the password
            localStorage.setItem('token', token);
            // Defaulting role to USER since we don't know it yet from just the token here without decoding
            // But usually the backend encoded it.
            // For now, let's just go to dashboard.
            // Ideally useAuth would have a 'setToken' method.
            // We can hack it by reloading or just navigating if we trust the token.

            // Trigger a "login success" state if possible, or just navigate
            navigate('/dashboard');
            window.location.reload(); // Reload to refresh auth state from localStorage
        } else {
            navigate('/login');
        }
    }, [searchParams, navigate]);

    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexDirection: 'column'
        }}>
            <h3>Logging you in...</h3>
            <div className="spinner" style={{
                width: '40px',
                height: '40px',
                border: '4px solid rgba(255,255,255,0.3)',
                borderTop: '4px solid #6366f1',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginTop: '20px'
            }}></div>
            <style>{`
                @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default OAuth2RedirectHandler;
