import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Assessment = () => {
    const { userSkillId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [skillName, setSkillName] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAssessment = async () => {
            try {
                const response = await api.get(`/api/user/ai-assessment/${userSkillId}?t=${new Date().getTime()}`);
                setQuestions(response.data.questions);
                setSkillName(response.data.skillName);
            } catch (err) {
                console.error("Error fetching assessment", err);
                setError("Could not load assessment. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchAssessment();
    }, [userSkillId]);

    const handleOptionSelect = (qIndex, option) => {
        setAnswers(prev => ({
            ...prev,
            [qIndex]: option
        }));
    };

    const handleSubmit = async () => {
        // Simple client-side scoring for demonstration
        let correctCount = 0;
        const answerDetails = [];

        questions.forEach((q, index) => {
            const selectedOption = answers[index];
            const correctOption = q.options[q.correctIndex];
            const isCorrect = selectedOption === correctOption;

            if (isCorrect) {
                correctCount++;
            }

            answerDetails.push({
                questionText: q.question,
                selectedOption: selectedOption,
                correctOption: correctOption,
                correct: isCorrect
            });
        });

        const score = Math.round((correctCount / questions.length) * 100);

        try {
            await api.post('/api/user/assessment', {
                userSkillId: Number(userSkillId),
                score: score,
                answers: answerDetails
            });
            // alert(`Assessment Complete! Score: ${score}%\nYour skill stats have been updated.`);
            navigate('/dashboard', {
                state: {
                    notification: {
                        message: `Assessment Complete! Score: ${score}% - Skill stats updated.`,
                        type: 'success'
                    }
                }
            });
        } catch (err) {
            console.error("Submission failed", err);
            setError("Failed to submit results.");
        }
    };

    if (loading) return <div className="p-8 text-center">Loading Assessment...</div>;
    if (error) return <div className="p-8 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h2 className="text-2xl font-bold mb-6">Assessment: {skillName}</h2>

            <div className="space-y-8">
                {questions.map((q, index) => (
                    <div key={index} className="card p-6 rounded-lg bg-gray-800 border border-gray-700">
                        <p className="text-lg font-medium mb-4">{index + 1}. {q.question}</p>
                        <div className="space-y-2">
                            {q.options.map((option, optIndex) => (
                                <label key={optIndex} className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-gray-700">
                                    <input
                                        type="radio"
                                        name={`question-${index}`}
                                        value={option}
                                        checked={answers[index] === option}
                                        onChange={() => handleOptionSelect(index, option)}
                                        className="form-radio text-blue-600"
                                    />
                                    <span>{option}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                className={`mt-8 px-6 py-3 rounded-lg font-bold w-full transition-colors ${Object.keys(answers).length !== questions.length
                    ? 'bg-gray-600 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
            >
                Submit Assessment
            </button>
        </div>
    );
};

export default Assessment;
