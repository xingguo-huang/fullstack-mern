import { useState } from 'react';
// import { useUser } from '../useUser';
import useUser from '../useUser';


export default function LessonPlanGenerator() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        grade_level: '',
        topic: '',
        duration: '',
        style: '',
        learning_objectives: '',
        requirements: '',
        reference_context: ''
    });
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/lesson-plan/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': await user.getIdToken()
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            setGeneratedPlan(data);
        } catch (error) {
            console.error('Error generating lesson plan:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Lesson Plan Generator</h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Add form fields here */}
                <div>
                    <label className="block mb-2">Grade Level</label>
                    <input
                        type="text"
                        value={formData.grade_level}
                        onChange={(e) => setFormData({...formData, grade_level: e.target.value})}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                {/* Add more form fields */}
                
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    {loading ? 'Generating...' : 'Generate Lesson Plan'}
                </button>
            </form>

            {generatedPlan && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Generated Lesson Plan</h2>
                    <pre className="bg-gray-100 p-4 rounded">
                        {JSON.stringify(generatedPlan, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
} 