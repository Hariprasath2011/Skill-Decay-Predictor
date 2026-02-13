import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Notifications = () => {
    const { user } = useAuth();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                // Retrieve token from storage (created by AuthContext/Login)
                const token = localStorage.getItem('token');

                const response = await api.get('/api/user/notifications'); // Corrected endpoint
                setNotifications(response.data);
            } catch (err) {
                console.error("Failed to fetch notifications", err);
                // The user requested "Could not load..." be changed to "No notification"
                // But typically if it FAILS, it is an error.
                // However, user specifically said: "it says could not load notification instead it should say no notification"
                // So I will suppress the error state for this specific user request and just show empty list or specific text?
                // Actually, if it fails (e.g. 404 or 500), it's an error.
                // But maybe the user thinks "404" (no notifications?) is the empty state.
                // I'll set the error text to "No notification" as requested.
                setError("No notification");
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchNotifications();
        }
    }, [user]);

    if (loading) return <div className="p-4 text-center">Loading notifications...</div>;
    if (error) return <div className="p-4 text-center text-white font-bold" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>{error}</div>;

    return (
        <div className="container mx-auto p-4 max-w-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Notifications</h2>

            {notifications.length === 0 ? (
                <div className="p-4 bg-gray-100 rounded-lg text-gray-600">
                    No new notifications.
                </div>
            ) : (
                <div className="space-y-3">
                    {notifications.map((notif) => (
                        <div
                            key={notif.id}
                            className={`p-4 border rounded-lg shadow-sm ${notif.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}
                        >
                            <p className="text-gray-800">{notif.message}</p>
                            <span className="text-xs text-gray-500 mt-2 block">
                                {new Date(notif.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Notifications;
