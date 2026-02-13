import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Notification from '../components/Notification';

const AddSkill = () => {
    const [skillName, setSkillName] = useState('');
    const [proficiencyLevel, setProficiencyLevel] = useState(1);
    const [skillOptions, setSkillOptions] = useState([]);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/api/user/skills/options');
                setSkillOptions(res.data);
            } catch (error) {
                console.error("Failed to fetch skill options", error);
            }
        };
        fetchSkills();
    }, []);

    const showNotification = (message, type = 'success') => {
        setNotification({ message, type });
    };

    const closeNotification = () => {
        setNotification({ message: '', type: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/api/user/skills', { skillName, proficiencyLevel: parseInt(proficiencyLevel) });
            navigate('/dashboard');
        } catch (error) {
            showNotification('Failed to add skill. It might already exist in your list.', 'error');
        }
    };

    return (
        <div className="auth-wrapper">
            <div className="auth-container">
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={closeNotification}
                />
                <h2>Add New Skill</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Skill Name</label>
                        <input
                            type="text"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            list="skill-suggestions"
                            placeholder="e.g. Java, Python, React"
                            required
                        />
                        <datalist id="skill-suggestions">
                            {skillOptions.map(skill => (
                                <option key={skill.id} value={skill.name} />
                            ))}
                        </datalist>
                    </div>
                    <div>
                        <label>Proficiency Level</label>
                        <select
                            value={proficiencyLevel}
                            onChange={(e) => setProficiencyLevel(e.target.value)}
                        >
                            <option value="1">Beginner (1) - Basics understood</option>
                            <option value="2">Intermediate (2) - Can build projects</option>
                            <option value="3">Expert (3) - Deep understanding</option>
                        </select>
                    </div>
                    <button type="submit">Add to My Skills</button>
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        style={{ background: 'transparent', border: '1px solid #334155', marginTop: '10px' }}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddSkill;
