import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import './Leaderboard.css';
import HexagonPillar from '../components/HexagonPillar';

const Leaderboard = () => {
    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const res = await api.get('/api/leaderboard');
                setLeaders(res.data);
            } catch (error) {
                console.error("Error fetching leaderboard", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLeaderboard();
    }, []);

    // Helper to get initials or fallback name
    const getName = (u) => {
        if (u.firstName || u.lastName) return `${u.firstName || ''} ${u.lastName || ''}`.trim();
        return u.email?.split('@')[0] || 'User';
    };

    const getInitials = (u) => {
        if (u.firstName && u.lastName) return `${u.firstName[0]}${u.lastName[0]}`.toUpperCase();
        if (u.firstName) return u.firstName.substring(0, 2).toUpperCase();
        return u.email?.substring(0, 2).toUpperCase() || 'U';
    };

    if (loading) return <div className="p-8 text-center text-gray-600">Loading Leaderboard...</div>;

    return (
        <div className="leaderboard-container">
            <h2 className="leaderboard-title">Leaderboard</h2>
            <p className="leaderboard-subtitle">Ranking is based on the Total Proficiency Level across all skills.</p>

            {/* Podium Card - Dark Container */}
            <div className="podium-card" style={{ overflow: 'visible', paddingBottom: '50px' }}>
                {/* Background Layer */}
                <div className="podium-bg-layer">
                    <div className="podium-grid-bg"></div>
                </div>

                {leaders.length > 0 && (
                    <div className="podium-wrapper">
                        {/* Rank 2 - Silver - Sinks down */}
                        {leaders[1] && (
                            <div style={{ marginBottom: '-50px', zIndex: 20 }}>
                                <HexagonPillar
                                    user={leaders[1]}
                                    rank={2}
                                    name={getName(leaders[1])}
                                    score={leaders[1].totalProficiency}
                                    initials={getInitials(leaders[1])}
                                    color3="#1151c1"
                                    color="#A7A9AC"
                                    height="280px"
                                />
                            </div>
                        )}

                        {/* Rank 1 - Gold - Sits on top (no margin sink) */}
                        {leaders[0] && (
                            <div style={{ marginBottom: '-50px', zIndex: 30 }}>
                                <HexagonPillar
                                    user={leaders[0]}
                                    rank={1}
                                    name={getName(leaders[0])}
                                    score={leaders[0].totalProficiency}
                                    initials={getInitials(leaders[0])}
                                    color3="#a62a21"
                                    color="#D4AF37"
                                    height="340px"
                                />
                            </div>
                        )}

                        {/* Rank 3 - Bronze - Sinks down */}
                        {leaders[2] && (
                            <div style={{ marginBottom: '-50px', zIndex: 10 }}>
                                <HexagonPillar
                                    user={leaders[2]}
                                    rank={3}
                                    name={getName(leaders[2])}
                                    score={leaders[2].totalProficiency}
                                    initials={getInitials(leaders[2])}
                                    color3="#7e3794"
                                    color="#cd7f32"
                                    height="220px"
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Table Section */}
            <div className="leaderboard-table-container">
                <table className="leaderboard-table">
                    <thead>
                        <tr style={{ borderBottom: '2px solid var(--card-border)' }}>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--text-secondary)' }}>Rank</th>
                            <th style={{ padding: '16px', textAlign: 'left', color: 'var(--text-secondary)' }}>Name</th>
                            <th style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)' }}>Total Skills</th>
                            <th style={{ padding: '16px', textAlign: 'right', color: 'var(--text-secondary)' }}>Total Proficiency</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leaders.map((user) => (
                            <tr key={user.userId} style={{ borderBottom: '1px solid var(--card-border)' }}>
                                <td style={{ fontFamily: 'monospace', color: 'var(--text-secondary)', fontWeight: 'bold' }}>
                                    {String(user.rank).padStart(2, '0')}
                                </td>
                                <td>
                                    <div className="user-cell">
                                        <div className="avatar-circle">
                                            {getInitials(user)}
                                        </div>
                                        {/* Name Link */}
                                        <Link to={`/profile/${user.userId}`} style={{ fontWeight: 600, color: 'var(--text-main)', textDecoration: 'none', cursor: 'pointer' }} className="hover:text-blue-600">
                                            {getName(user)}
                                        </Link>
                                    </div>
                                </td>
                                <td style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                                    {user.totalSkills}
                                </td>
                                <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--text-main)' }}>
                                    {user.totalProficiency}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {leaders.length === 0 && <div className="p-8 text-center text-gray-400" style={{ padding: '20px' }}>No data available.</div>}
            </div>
        </div>
    );
};

export default Leaderboard;
