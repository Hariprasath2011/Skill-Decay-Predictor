import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import Notification from '../components/Notification';
import ConfirmationModal from '../components/ConfirmationModal';

const Profile = () => {
    const { userId } = useParams(); // Get userId from URL if present
    const isViewMode = !!userId;

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        education: '',
        linkedinUrl: '',
        leetcodeUrl: '',
        githubUrl: '',
        youtubeUrl: '',
        otherUrl: ''
    });

    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDangerous: false
    });

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    const closeModal = () => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const endpoint = isViewMode ? `/api/user/${userId}/profile` : '/api/user/profile';
                const res = await api.get(endpoint);
                if (res.data) {
                    setProfile(prev => ({ ...prev, ...res.data }));
                }
            } catch (error) {
                console.error('Error fetching profile', error);
                showNotification('Failed to load profile data', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [userId, isViewMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/user/profile', profile);
            showNotification('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile', error);
            showNotification('Failed to update profile', 'error');
        }
    };

    const confirmDeleteAccount = () => {
        setModalConfig({
            isOpen: true,
            title: 'Delete Account',
            message: 'Are you ABSOLUTELY SURE you want to delete your account? This action cannot be undone. All your data including skills and history will be permanently lost.',
            isDangerous: true,
            confirmText: 'Yes, Delete My Account',
            onConfirm: handleDeleteAccount
        });
    };

    const handleDeleteAccount = async () => {
        closeModal();
        try {
            await api.delete('/api/user/account');
            // Force logout by clearing token and redirecting
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        } catch (error) {
            console.error("Error deleting account", error);
            showNotification("Failed to delete account", "error");
        }
    };

    if (loading) return <div>Loading...</div>;

    // View Mode Component (unchanged logic, just ensuring it renders correctly)
    if (isViewMode) {
        return (
            <div className="container" style={{ maxWidth: '600px', margin: '40px auto' }}>
                <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
                    {profile.firstName} {profile.lastName}
                </h2>

                <div className="auth-container" style={{ width: '100%', maxWidth: '100%' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ color: '#94a3b8', fontSize: '0.9rem', uppercase: 'true' }}>Education</h4>
                        <p style={{ fontSize: '1.1rem' }}>{profile.education || 'Not specified'}</p>
                    </div>

                    <h3 style={{ marginTop: '25px', marginBottom: '15px', fontSize: '1.1rem', color: '#94a3b8' }}>Connect</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {profile.linkedinUrl && (
                            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
                                <span>LinkedIn</span> 🔗
                            </a>
                        )}
                        {/* ... other social links skipped for brevity in replacement but assumed to be there if full file replacement ... */}
                        {profile.leetcodeUrl && (
                            <a href={profile.leetcodeUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
                                <span>LeetCode</span> 🔗
                            </a>
                        )}
                        {profile.githubUrl && (
                            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
                                <span>GitHub</span> 🔗
                            </a>
                        )}
                        {profile.youtubeUrl && (
                            <a href={profile.youtubeUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
                                <span>YouTube</span> 🔗
                            </a>
                        )}
                        {profile.otherUrl && (
                            <a href={profile.otherUrl} target="_blank" rel="noopener noreferrer" className="profile-link">
                                <span>Website / Other</span> 🔗
                            </a>
                        )}
                        {!profile.linkedinUrl && !profile.leetcodeUrl && !profile.githubUrl && !profile.youtubeUrl && !profile.otherUrl && (
                            <p style={{ color: '#666' }}>No public links provided.</p>
                        )}
                    </div>
                </div>
                <style>{`
                    .profile-link {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 12px;
                        background: #334155;
                        color: white;
                        text-decoration: none;
                        border-radius: 6px;
                        transition: background 0.2s;
                    }
                    .profile-link:hover {
                        background: #475569;
                    }
                `}</style>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: '600px', margin: '40px auto' }}>
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={closeNotification}
            />

            <ConfirmationModal
                isOpen={modalConfig.isOpen}
                title={modalConfig.title}
                message={modalConfig.message}
                onConfirm={modalConfig.onConfirm}
                onCancel={closeModal}
                isDangerous={modalConfig.isDangerous}
                confirmText={modalConfig.confirmText}
            />

            <h2 style={{ marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>User Profile</h2>

            <form onSubmit={handleSubmit} className="auth-container" style={{ width: '100%', maxWidth: '100%' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div>
                        <label>First Name *</label>
                        <input
                            type="text"
                            name="firstName"
                            value={profile.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Last Name *</label>
                        <input
                            type="text"
                            name="lastName"
                            value={profile.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div style={{ marginTop: '15px' }}>
                    <label>Education *</label>
                    <input
                        type="text"
                        name="education"
                        value={profile.education}
                        onChange={handleChange}
                        placeholder="University / College / School"
                        required
                    />
                </div>

                <h3 style={{ marginTop: '25px', marginBottom: '15px', fontSize: '1.1rem', color: '#94a3b8' }}>Social Links</h3>

                <div style={{ display: 'grid', gap: '15px' }}>
                    <div>
                        <label>LinkedIn URL</label>
                        <input
                            type="url"
                            name="linkedinUrl"
                            value={profile.linkedinUrl}
                            onChange={handleChange}
                            placeholder="https://linkedin.com/in/..."
                        />
                    </div>
                    <div>
                        <label>LeetCode URL</label>
                        <input
                            type="url"
                            name="leetcodeUrl"
                            value={profile.leetcodeUrl}
                            onChange={handleChange}
                            placeholder="https://leetcode.com/..."
                        />
                    </div>
                    <div>
                        <label>GitHub URL</label>
                        <input
                            type="url"
                            name="githubUrl"
                            value={profile.githubUrl}
                            onChange={handleChange}
                            placeholder="https://github.com/..."
                        />
                    </div>
                    <div>
                        <label>YouTube URL</label>
                        <input
                            type="url"
                            name="youtubeUrl"
                            value={profile.youtubeUrl}
                            onChange={handleChange}
                            placeholder="https://youtube.com/..."
                        />
                    </div>
                    <div>
                        <label>Other URL</label>
                        <input
                            type="url"
                            name="otherUrl"
                            value={profile.otherUrl}
                            onChange={handleChange}
                            placeholder="Portfolio, Blog, etc."
                        />
                    </div>
                </div>

                <button type="submit" style={{ marginTop: '20px', width: '100%' }}>Save Profile</button>
            </form>

            <div style={{ marginTop: '40px', borderTop: '1px solid #334155', paddingTop: '20px' }}>
                <h3 style={{ color: '#ef4444', fontSize: '1.1rem', marginBottom: '10px' }}>Danger Zone</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '15px' }}>
                    Deleting your account is permanent. All your data, including skills and history, will be wiped out.
                </p>
                <button
                    onClick={confirmDeleteAccount}
                    style={{
                        backgroundColor: '#ef4444',
                        color: 'white',
                        border: 'none',
                        padding: '10px 20px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default Profile;
