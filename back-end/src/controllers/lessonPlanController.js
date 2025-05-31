import { 
    create_broad_plan_draft_chain,
    create_revise_selected_plan_chain,
    create_precise_revision_chain,
    create_artifact_chain,
    get_llm
} from '../services/llmService.js';

export const generateLessonPlan = async (req, res) => {
    try {
        const {
            grade_level,
            topic,
            duration,
            style,
            learning_objectives,
            requirements,
            reference_context
        } = req.body;

        // Validate required fields
        if (!grade_level || !topic || !duration || !style || style.length === 0) {
            return res.status(400).json({ 
                error: 'Missing required fields',
                details: {
                    grade_level: !grade_level,
                    topic: !topic,
                    duration: !duration,
                    style: !style || style.length === 0
                }
            });
        }

        const llm = get_llm();
        const chain = create_broad_plan_draft_chain(llm);
        
        // Format the data for the chain
        const result = await chain.call({
            grade_level,
            topic,
            duration,
            style: Array.isArray(style) ? style.join(', ') : style,
            learning_objectives: learning_objectives || '',
            requirements: requirements || '',
            broad_plan_feedback: '',
            reference_context: reference_context || ''
        });

        // Send the response
        res.json(result);
    } catch (error) {
        console.error('Error generating lesson plan:', error);
        res.status(500).json({ 
            error: 'Failed to generate lesson plan',
            details: error.message 
        });
    }
};

export const reviseLessonPlan = async (req, res) => {
    try {
        const { original_plan, selected_critique_points } = req.body;
        
        const llm = get_llm();
        const chain = create_revise_selected_plan_chain(llm);
        
        const result = await chain.call({
            broad_plan_json: JSON.stringify(original_plan),
            selected_critique_points: JSON.stringify(selected_critique_points)
        });

        res.json(result);
    } catch (error) {
        console.error('Error revising lesson plan:', error);
        res.status(500).json({ error: 'Failed to revise lesson plan' });
    }
};

export const generateArtifact = async (req, res) => {
    try {
        const {
            phase_content,
            artifact_type,
            num_questions,
            difficulty,
            question_type,
            additional_requirements
        } = req.body;

        const llm = get_llm();
        const chain = create_artifact_chain(llm, artifact_type);
        
        const result = await chain.call({
            phase_content,
            num_questions,
            difficulty,
            question_type,
            additional_requirements
        });

        res.json(result);
    } catch (error) {
        console.error('Error generating artifact:', error);
        res.status(500).json({ error: 'Failed to generate artifact' });
    }
}; 