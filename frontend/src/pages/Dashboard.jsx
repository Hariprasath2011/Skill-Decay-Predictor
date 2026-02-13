import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Notification from '../components/Notification';

const Dashboard = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const [notification, setNotification] = useState({ message: '', type: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/api/user/dashboard');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        // Check for notification in navigation state
        if (location.state?.notification) {
            setNotification(location.state.notification);
            // Clear the state to prevent showing it again on refresh
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    const handleSkillClick = (skillId) => {
        navigate(`/skill/${skillId}`);
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>Error loading dashboard</div>;

    return (
        <div className="container">
            <Notification
                message={notification.message}
                type={notification.type}
                onClose={closeNotification}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ margin: 0 }}>Dashboard</h2>
                <Link to="/add-skill" className="button">Add Component</Link>
            </div>

            <div className="stats">
                <div className="card">
                    <h3>Total Skills</h3>
                    <p>{data.totalSkills}</p>
                </div>
                <div className="card">
                    <h3>Needs Revision</h3>
                    <p>{data.needsRevision}</p>
                </div>
            </div>

            <h3 style={{ marginBottom: '1.5rem' }}>Your Skills</h3>

            <div className="skills-list" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {data.skills.map(skill => (
                    <div
                        key={skill.id}
                        className={`card skill-card ${skill.needsRevision ? 'warning' : ''}`}
                        onClick={() => handleSkillClick(skill.id)}
                        style={{ cursor: 'pointer', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' }}
                    >
                        {skill.needsRevision && (
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                background: 'var(--warning)',
                                color: 'white',
                                padding: '4px 12px',
                                borderBottomLeftRadius: '12px',
                                fontSize: '0.8rem',
                                fontWeight: 'bold'
                            }}>
                                !
                            </div>
                        )}

                        <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary-color)' }}>{skill.skillName}</h4>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                            <span>Proficiency</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{skill.proficiencyLevel}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            <span>Decay Score</span>
                            <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{skill.decayScore.toFixed(2)}</span>
                        </div>

                        {skill.needsRevision && (
                            <div className="mt-4" onClick={(e) => e.stopPropagation()}>
                                <Link
                                    to={`/assessment/${skill.id}`}
                                    className="button"
                                    style={{
                                        display: 'block',
                                        textAlign: 'center',
                                        background: 'var(--warning)',
                                        width: '100%',
                                        boxSizing: 'border-box'
                                    }}
                                >
                                    Take Assessment
                                </Link>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {data.skills.length === 0 && (
                <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                    <p>No skills added yet.</p>
                    <Link to="/add-skill" style={{ color: 'var(--primary-color)' }}>Add your first skill</Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
