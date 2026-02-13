import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AssessmentHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/api/user/assessment/history');
                setHistory(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load history.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (loading) return <div className="text-center p-8">Loading history...</div>;

    return (
        <div className="auth-wrapper history-page">
            <div className="auth-container" style={{ maxWidth: '800px', width: '90%' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '30px',
                    borderBottom: '1px solid var(--card-border)',
                    paddingBottom: '15px'
                }}>
                    <h2 style={{ margin: 0 }}>Assessment History</h2>
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        &larr; Back to Dashboard
                    </button>
                </div>

                {error && <div className="error-message">{error}</div>}

                {history.length === 0 ? (
                    <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
                        <p>No assessments taken yet.</p>
                        <button onClick={() => navigate('/dashboard')} style={{ marginTop: '10px' }}>Take an Assessment</button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'var(--text-main)' }}>
                            <thead>
                                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--card-border)' }}>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Skill</th>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Score</th>
                                    <th style={{ padding: '12px', color: 'var(--text-secondary)' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((record, index) => (
                                    <tr
                                        key={index}
                                        style={{ borderBottom: '1px solid var(--card-border)', cursor: 'pointer' }}
                                        onClick={() => navigate(`/assessment/result/${record.id}`)}
                                        className="table-row-hover"
                                    >
                                        <td style={{ padding: '12px' }}>{record.skill?.name || 'Unknown Skill'}</td>
                                        <td style={{ padding: '12px' }}>
                                            <span style={{
                                                fontWeight: 'bold',
                                                color: record.score >= 80 ? '#10b981' :
                                                    record.score >= 40 ? '#f59e0b' : '#ef4444'
                                            }}>
                                                {record.score}%
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px' }}>{new Date(record.takenAt).toLocaleDateString()} {new Date(record.takenAt).toLocaleTimeString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <style>{`
                .table-row-hover:hover {
                    background-color: rgba(255,255,255,0.05);
                }
                body.light-mode .table-row-hover:hover {
                    background-color: rgba(0,0,0,0.05);
                }
            `}</style>
        </div>
    );
};

export default AssessmentHistory;
