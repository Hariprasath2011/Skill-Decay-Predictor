import { useState, useEffect } from 'react';
import api from '../api/axios';
import Notification from '../components/Notification';
import ConfirmationModal from '../components/ConfirmationModal';

const Admin = () => {
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [skills, setSkills] = useState([]);
    const [newSkillName, setNewSkillName] = useState('');
    const [expandedUserId, setExpandedUserId] = useState(null);
    const [userSkills, setUserSkills] = useState({});

    // Modal State
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: () => { },
        isDangerous: false
    });

    // Notification State
    const [notification, setNotification] = useState({ message: '', type: '' });

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
        const fetchData = async () => {
            try {
                const statsRes = await api.get('/api/admin/stats');
                setStats(statsRes.data);

                const usersRes = await api.get('/api/admin/users');
                setUsers(usersRes.data);

                const skillsRes = await api.get('/api/admin/skills');
                setSkills(skillsRes.data);
            } catch (error) {
                console.error('Error fetching admin data', error);
                showNotification('Error fetching dashboard data', 'error');
            }
        };
        fetchData();
    }, []);

    const handleAddSkill = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/api/admin/skills', { name: newSkillName });
            setSkills([...skills, res.data]);
            setNewSkillName('');
            showNotification('Skill added successfully');
        } catch (error) {
            showNotification('Error adding skill', 'error');
        }
    };

    const confirmDeleteSkill = (id) => {
        setModalConfig({
            isOpen: true,
            title: 'Delete Skill',
            message: 'Are you sure you want to delete this skill? This will affect all users using it.',
            isDangerous: true,
            onConfirm: () => handleDeleteSkill(id)
        });
    };

    const handleDeleteSkill = async (id) => {
        closeModal();
        try {
            await api.delete(`/api/admin/skills/${id}`);
            setSkills(skills.filter(s => s.id !== id));
            showNotification('Skill deleted successfully');
        } catch (error) {
            showNotification('Error deleting skill', 'error');
        }
    };

    // ... rest of the component methods ...
    const toggleUser = async (userId) => {
        if (expandedUserId === userId) {
            setExpandedUserId(null);
        } else {
            setExpandedUserId(userId);
            if (!userSkills[userId]) {
                try {
                    const res = await api.get(`/api/admin/users/${userId}/skills`);
                    setUserSkills(prev => ({ ...prev, [userId]: res.data }));
                } catch (e) {
                    console.error("Error fetching user skills", e);
                    showNotification('Error fetching user skills', 'error');
                }
            }
        }
    };

    return (
        <div className="container">
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
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Admin Dashboard</h2>
                <button onClick={async () => {
                    try {
                        await api.post('/api/admin/trigger-decay');
                        showNotification('Decay calculation triggered successfully!', 'success');
                    } catch (e) {
                        console.error(e);
                        showNotification('Failed to trigger decay. Check console.', 'error');
                    }
                }} style={{ background: '#e67e22' }}>
                    Trigger Decay Calculation
                </button>
            </div>

            {stats && (
                <div className="stats">
                    <div className="card"><h3>Users</h3><p>{stats.totalUsers}</p></div>
                    <div className="card"><h3>Skills</h3><p>{stats.totalSkills}</p></div>
                    <div className="card"><h3>User Skills</h3><p>{stats.totalUserSkills}</p></div>
                </div>
            )}

            <div className="admin-section">
                <h3>Global Skills List</h3>
                <form onSubmit={handleAddSkill} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                    <input
                        type="text"
                        value={newSkillName}
                        onChange={(e) => setNewSkillName(e.target.value)}
                        placeholder="New Skill Name"
                        required
                        style={{ padding: '8px', borderRadius: '4px', border: 'none', width: '250px' }}
                    />
                    <button type="submit" style={{ background: '#10b981' }}>Add Skill</button>
                </form>
                <ul>
                    {skills.map(skill => (
                        <li key={skill.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#2d3748', padding: '10px', marginBottom: '8px', borderRadius: '4px' }}>
                            {skill.name}
                            <button
                                onClick={() => confirmDeleteSkill(skill.id)}
                                style={{ background: '#ef4444', padding: '4px 8px', fontSize: '0.8rem' }}
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="admin-section">
                <h3>Registered Users</h3>
                <ul>
                    {users.map(u => (
                        <li key={u.id}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>{u.email} (Enabled: {u.enabled ? 'Yes' : 'No'})</span>
                                <button onClick={() => toggleUser(u.id)} style={{ marginLeft: '10px' }}>
                                    {expandedUserId === u.id ? 'Hide' : 'View Skills'}
                                </button>
                            </div>
                            {expandedUserId === u.id && (
                                <div style={{ background: '#333', padding: '10px', marginTop: '5px', color: '#fff', borderRadius: '4px' }}>
                                    <strong>Skills:</strong>
                                    {userSkills[u.id] ? (
                                        userSkills[u.id].length > 0 ? (
                                            <table style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                                                <thead>
                                                    <tr style={{ borderBottom: '1px solid #555' }}>
                                                        <th style={{ textAlign: 'left', padding: '8px' }}>Skill</th>
                                                        <th style={{ textAlign: 'left', padding: '8px' }}>Proficiency</th>
                                                        <th style={{ textAlign: 'left', padding: '8px' }}>Decay Score</th>
                                                        <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {userSkills[u.id].map(us => (
                                                        <tr key={us.id} style={{ borderBottom: '1px solid #444' }}>
                                                            <td style={{ padding: '8px' }}>{us.skill.name}</td>
                                                            <td style={{ padding: '8px' }}>{us.proficiencyLevel}</td>
                                                            <td style={{ padding: '8px' }}>{us.decayScore}</td>
                                                            <td style={{ padding: '8px' }}>
                                                                <button onClick={async () => {
                                                                    const days = prompt("How many days to age this skill?", "15");
                                                                    if (days) {
                                                                        try {
                                                                            await api.post(`/api/admin/users/${u.id}/skills/${us.skill.id}/simulate-decay?days=${days}`);
                                                                            // Refresh skills for this user
                                                                            const res = await api.get(`/api/admin/users/${u.id}/skills`);
                                                                            setUserSkills(prev => ({ ...prev, [u.id]: res.data }));
                                                                            showNotification('Decay simulated successfully', 'success');
                                                                        } catch (e) {
                                                                            showNotification('Simulation failed', 'error');
                                                                        }
                                                                    }
                                                                }} style={{ fontSize: '0.8rem', padding: '4px 8px', background: '#e74c3c' }}>
                                                                    Simulate
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        ) : <p>No skills found.</p>
                                    ) : <p>Loading...</p>}
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Admin;
