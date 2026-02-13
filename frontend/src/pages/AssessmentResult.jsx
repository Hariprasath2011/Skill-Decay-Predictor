import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AssessmentResult = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await api.get(`/api/user/assessment/${id}`);
                setAssessment(response.data);
            } catch (err) {
                console.error(err);
                setError('Failed to load assessment details.');
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    if (loading) return <div className="text-center p-8 text-white">Loading details...</div>;
    if (error) return <div className="text-center p-8 text-red-400">{error}</div>;
    if (!assessment) return <div className="text-center p-8 text-white">Assessment not found.</div>;

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Assessment Details</h2>
                <button
                    onClick={() => navigate('/history')}
                    className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                    &larr; Back to History
                </button>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg mb-8 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                    <div>
                        <p className="text-gray-400 text-sm">Skill</p>
                        <p className="text-xl font-semibold">{assessment.skill?.name}</p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Score</p>
                        <p className={`text-xl font-bold ${assessment.score >= 80 ? 'text-green-400' :
                                assessment.score >= 40 ? 'text-yellow-400' : 'text-red-400'
                            }`}>
                            {assessment.score}%
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="text-lg">{new Date(assessment.takenAt).toLocaleString()}</p>
                    </div>
                </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-4">Question Review</h3>

            <div className="space-y-6">
                {assessment.userAnswers && assessment.userAnswers.length > 0 ? (
                    assessment.userAnswers.map((ans, index) => (
                        <div key={index} className={`p-6 rounded-lg border-l-4 ${ans.correct ? 'border-green-500 bg-gray-800' : 'border-red-500 bg-gray-800'}`}>
                            <p className="text-white font-medium text-lg mb-4">
                                {index + 1}. {ans.questionText || "Question text not available"}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={`p-3 rounded ${ans.correct ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Answer</p>
                                    <p className={`${ans.correct ? 'text-green-300' : 'text-red-300'} font-medium`}>
                                        {ans.selectedOption}
                                    </p>
                                </div>

                                {!ans.correct && (
                                    <div className="p-3 rounded bg-blue-900/30">
                                        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Correct Answer</p>
                                        <p className="text-blue-300 font-medium">
                                            {ans.correctOption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-gray-400 bg-gray-800 rounded-lg">
                        Detailed question history is not available for this assessment.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentResult;
