import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import SkillHistoryChart from '../components/SkillHistoryChart';

const SkillDetails = () => {
    const { userSkillId } = useParams();
    const [history, setHistory] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Fetch history
                const res = await api.get(`/api/user/skills/${userSkillId}/history`);
                setHistory(res.data);

                // We might need to fetch the skill details separately or try to infer name from history if available.
                // However, the history endpoint returns UserSkillHistory objects which contain nested UserSkill.
                if (res.data && res.data.length > 0) {
                    setSkillName(res.data[0].userSkill.skill.name);
                } else {
                    // Fallback or fetch specific skill endpoint if history is empty (not implemented yet, but let's handle graceful empty state)
                    setSkillName('Skill Details');
                }

            } catch (error) {
                console.error('Error fetching skill history', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHistory();
    }, [userSkillId]);

    if (loading) return <div className="container">Loading...</div>;

    return (
        <div className="container">
            <Link to="/dashboard" className="button" style={{ background: '#777', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Dashboard
            </Link>

            <h2>{skillName} Analysis</h2>

            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
                {history.length > 0 ? (
                    <SkillHistoryChart history={history} skillName={skillName} />
                ) : (
                    <p style={{ color: 'black' }}>No history data available yet for this skill. Practice or simulate decay to generate data.</p>
                )}
            </div>
        </div>
    );
};

export default SkillDetails;
