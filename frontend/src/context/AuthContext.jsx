import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Decode token or fetch user profile could be here. 
            // For now we just assume if token exists, we are logged in.
            // Ideally we should call an endpoint /api/user/me to validate
            try {
                const roles = JSON.parse(localStorage.getItem('roles') || '[]');
                setUser({ roles });
            } catch (e) {
                console.error("Failed to parse roles from local storage", e);
                localStorage.removeItem('roles'); // Clear invalid data
                setUser(null);
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const response = await api.post('/api/auth/login', { email, password });
        const { token, roles } = response.data;
        localStorage.setItem('token', token);
        // We need roles from backend in login response to effectively manage permission
        // If backend only returns token, we'll need to decode it.
        // For now assuming backend returns roles in response body for simplicity or we decode.
        // Let's assume response: { accessToken, email, roles: ["ROLE_USER"] }
        localStorage.setItem('roles', JSON.stringify(roles));
        setUser({ email, roles });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('roles');
        setUser(null);
    };

    const register = async (userData) => {
        await api.post('/api/auth/register', userData);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
