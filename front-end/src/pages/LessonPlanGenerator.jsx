import { useState } from 'react';
// import { useUser } from '../useUser';
import useUser from '../useUser';

// Constants
const GRADE_LEVELS = [
    "Primary(K-3)",
    "Intermediate(4-7)",
    "Middle School",
    "High School",
    "Undergraduate",
    "Graduate",
    "Adult Education"
];

const TEACHING_STYLES = [
    {
        name: "Expert",
        description: "A teacher-centered approach where teachers hold the knowledge and expertise that students need. Focuses on sharing knowledge, demonstrating knowledge, and providing feedback to promote learning."
    },
    {
        name: "Formal Authority",
        description: "A teacher-centered approach that focuses on lecturing and the traditional teaching style. Goals and expectations are clearly defined and communicated. Offers a well-structured learning environment."
    },
    {
        name: "Personal Model",
        description: "A teacher-centered approach that focuses on teaching with real-life and personal examples, with students observing and following directions. The teacher takes a coach or mentor role."
    },
    {
        name: "Facilitator",
        description: "A student-centered approach that focuses on facilitating critical thinking and guiding students to be independent learners through activities. Emphasizes teacher-student interactions."
    },
    {
        name: "Delegator",
        description: "A student-centered approach where teachers take on more of an observer role with students working independently or in groups. Promotes collaboration between students and peer learning."
    }
];

export default function LessonPlanGenerator() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        grade_level: '',
        topic: '',
        duration: 60,
        style: [],
        learning_objectives: '',
        requirements: '',
        reference_context: ''
    });
    const [generatedPlan, setGeneratedPlan] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showObjectives, setShowObjectives] = useState(false);
    const [showRequirements, setShowRequirements] = useState(false);
    const [showExample, setShowExample] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Validate required fields
            if (!formData.grade_level || !formData.topic || !formData.duration || formData.style.length === 0) {
                throw new Error('Please fill in all required fields');
            }

            const response = await fetch('http://localhost:8000/api/lesson-plan/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authtoken': await user.getIdToken()
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to generate lesson plan');
            }

            const data = await response.json();
            setGeneratedPlan(data);
        } catch (error) {
            console.error('Error generating lesson plan:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to format the generated plan for display
    const formatPlan = (plan) => {
        if (!plan) return null;

        try {
            // Handle different response formats
            let planData = plan;
            if (typeof plan === 'string') {
                planData = JSON.parse(plan);
            }

            // Extract the actual plan content
            const broadPlan = planData.broad_plan || planData.broad_plan_draft || planData;
            
            return (
                <div className="space-y-6">
                    {/* Learning Objectives */}
                    {broadPlan.objectives && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">🎯 Learning Objectives</h3>
                            <ul className="list-disc pl-5 space-y-2">
                                {broadPlan.objectives.map((obj, index) => (
                                    <li key={index}>{obj}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Teaching Phases */}
                    {broadPlan.outline && (
                        <div>
                            <h3 className="text-xl font-semibold mb-2">📊 Teaching Phases</h3>
                            <div className="space-y-4">
                                {broadPlan.outline.map((phase, index) => (
                                    <div key={index} className="border rounded-lg p-4">
                                        <h4 className="font-semibold text-lg">
                                            {phase.phase} ({phase.duration})
                                        </h4>
                                        {phase.purpose && (
                                            <p className="mt-2">
                                                <span className="font-medium">Purpose:</span> {phase.purpose}
                                            </p>
                                        )}
                                        {phase.description && (
                                            <p className="mt-2">
                                                <span className="font-medium">Description:</span> {phase.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            );
        } catch (error) {
            console.error('Error formatting plan:', error);
            return (
                <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
                    {JSON.stringify(plan, null, 2)}
                </pre>
            );
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">AI Lesson Plan Generator</h1>
            
            <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Topic */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">📝 Topic</label>
                        <input
                            type="text"
                            value={formData.topic}
                            onChange={(e) => setFormData({...formData, topic: e.target.value})}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            placeholder="Example: Introduction to Python Programming"
                            required
                        />
                    </div>

                    {/* Grade Level and Duration */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-lg font-semibold mb-2">🏫 Education Level</label>
                            <select
                                value={formData.grade_level}
                                onChange={(e) => setFormData({...formData, grade_level: e.target.value})}
                                className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                <option value="">Select Grade Level</option>
                                {GRADE_LEVELS.map((level) => (
                                    <option key={level} value={level}>{level}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2">⏱️ Duration (minutes)</label>
                            <input
                                type="range"
                                min="10"
                                max="180"
                                value={formData.duration}
                                onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                                className="w-full"
                            />
                            <div className="text-center mt-1">{formData.duration} minutes</div>
                        </div>
                    </div>

                    {/* Teaching Style */}
                    <div>
                        <label className="block text-lg font-semibold mb-2">📖 Teaching Style</label>
                        <div className="grid grid-cols-2 gap-4">
                            {TEACHING_STYLES.map((style) => (
                                <div key={style.name} className="border rounded-lg p-4">
                                    <label className="flex items-start space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={formData.style.includes(style.name)}
                                            onChange={(e) => {
                                                const newStyles = e.target.checked
                                                    ? [...formData.style, style.name]
                                                    : formData.style.filter(s => s !== style.name);
                                                setFormData({...formData, style: newStyles});
                                            }}
                                            className="mt-1"
                                        />
                                        <div>
                                            <span className="font-medium">{style.name}</span>
                                            <p className="text-sm text-gray-600 mt-1">{style.description}</p>
                                        </div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Learning Objectives */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowObjectives(!showObjectives)}
                            className="flex items-center text-lg font-semibold mb-2"
                        >
                            🎯 Learning Objectives (Optional)
                            <span className="ml-2">{showObjectives ? '▼' : '▶'}</span>
                        </button>
                        {showObjectives && (
                            <div className="mt-2">
                                <textarea
                                    value={formData.learning_objectives}
                                    onChange={(e) => setFormData({...formData, learning_objectives: e.target.value})}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Example:
1. Write a simple Python program to print a message
2. Understand the basic concepts of data types
3. Apply loops to solve problems"
                                />
                            </div>
                        )}
                    </div>

                    {/* Requirements */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowRequirements(!showRequirements)}
                            className="flex items-center text-lg font-semibold mb-2"
                        >
                            📋 Requirements (Optional)
                            <span className="ml-2">{showRequirements ? '▼' : '▶'}</span>
                        </button>
                        {showRequirements && (
                            <div className="mt-2">
                                <textarea
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="4"
                                    placeholder="Example:
- Group discussion required
- Include a quiz at the end
- Use a specific textbook"
                                />
                            </div>
                        )}
                    </div>

                    {/* Example Plan */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setShowExample(!showExample)}
                            className="flex items-center text-lg font-semibold mb-2"
                        >
                            📄 Example Lesson Plan (Optional)
                            <span className="ml-2">{showExample ? '▼' : '▶'}</span>
                        </button>
                        {showExample && (
                            <div className="mt-2">
                                <textarea
                                    value={formData.reference_context}
                                    onChange={(e) => setFormData({...formData, reference_context: e.target.value})}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                    rows="6"
                                    placeholder="You can provide a reference lesson plan example here. If left empty, default examples will be used."
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                        >
                            {loading ? '🚀 Generating...' : '🚀 Generate Plan'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {error}
                </div>
            )}

            {/* Generated Plan Display */}
            {generatedPlan && (
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-bold mb-4">📚 Generated Lesson Plan</h2>
                    {formatPlan(generatedPlan)}
                </div>
            )}

            {/* Loading State */}
            {loading && (
                <div className="mt-4 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
                    <p className="mt-2 text-gray-600">Generating your lesson plan...</p>
                </div>
            )}
        </div>
    );
} 