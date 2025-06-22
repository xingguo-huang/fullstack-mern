// import { PromptTemplate } from 'langchain/prompts';
import { PromptTemplate } from "@langchain/core/prompts";


export const BROAD_PLAN_DRAFT_TEMPLATE = new PromptTemplate({
  inputVariables: [
    'grade_level',
    'topic',
    'duration',
    'style',
    'learning_objectives',
    'requirements',
    'broad_plan_feedback',
    'reference_context'
  ],
  template: `You are an expert instructional designer specializing in {grade_level} education.

INPUTS:
1. Core Parameters:
   - Topic: {topic}
   - Duration: {duration} minutes total
   - Grade Level: {grade_level}

2. Teaching Approach:
   - Selected Teaching Style(s): {style}
   
   * Understanding Teaching Styles:
     - Expert: A teacher-centered approach where teachers hold knowledge and expertise, focusing on sharing knowledge and providing direct feedback. Strong in content delivery and demonstrations.
     - Formal Authority: A teacher-centered approach focused on lecturing in a structured environment, ideal for delivering large amounts of information efficiently. Strong in clarity of goals and expectations.
     - Personal Model: A teacher-centered approach using real-life examples with direct observation, where teacher acts as a coach/mentor. Strong in demonstrations and modeling behavior.
     - Facilitator: A student-centered approach focused on guiding critical thinking through activities, emphasizing teacher-student interactions. Strong in fostering independent learning and discovery.
     - Delegator: A student-centered approach where teacher serves as an observer while students work independently or in groups. Strong in promoting collaboration and peer learning.
   
   * Blended Style Approach:
     - When multiple styles are selected, they should be integrated to create a balanced approach
     - Teacher-centered styles (Expert, Formal Authority, Personal Model) should be balanced with student-centered approaches (Facilitator, Delegator)
     - The beginning phases often utilize more structured approaches (Expert/Formal Authority)
     - The middle phases should transition to more interactive approaches (Personal Model/Facilitator)
     - The final phases can incorporate more independent work (Facilitator/Delegator)
     - Each phase should clearly reflect elements of the selected teaching styles
     - Time allocation should be balanced appropriately between teacher-led and student-centered activities based on the combination of selected styles

3. Learning Goals:
   - Objectives: {learning_objectives}
     * These are the specific outcomes students should achieve by the end of the lesson
     * Each phase should contribute to one or more of these objectives
     * All objectives must be addressed in the lesson plan
     * if there are only one or two objectives, then add more objectives that are related to the topic

4. Structural Requirements:
   - Requirements: {requirements}
     * These are specific activities or elements that must be included
     * Each requirement should be naturally integrated into appropriate phases
     * The placement should make pedagogical sense within the lesson flow

5. Additional Inputs:
   - Reference Materials: {reference_context}
   - User Feedback and Phase Structure: {broad_plan_feedback}

TASK:
1) Process Reference Materials (if provided):
   - Extract key concepts and main ideas
   - Identify important examples and case studies
   - Note key terminology and definitions
   - Map content to learning objectives
   - Ensure at least 60% of lesson content is based on references
   - Seamlessly integrate reference-based content without explicit markers
   - If there is no reference material, generate content based on best practices

2) Process User Feedback and Phase Changes:
   - User feedback has the highest priority
   - If feedback suggests removing phases:
     * Remove specified phases
     * Redistribute time to maintain total duration
   - If feedback suggests adding phases:
     * Add new phases as specified
     * Adjust time allocation accordingly
   - If feedback suggests modifying phases:
     * Apply all specified modifications
     * Maintain the exact names and durations provided
   - For any other feedback:
     * Apply suggested improvements
     * Maintain overall structure unless explicitly told to change

3) Design or Adapt Lesson Structure:
   A. If modifying existing structure:
      - First apply any structural changes from feedback
      - Then apply any phase modifications
      - Maintain exact phase names and durations as specified
      - Enhance content within fixed structure
      
   B. If creating new structure:
      - Break {duration} minutes into logical phases
      - Ensure progression toward objectives
      - Incorporate all requirements
      - Follow pedagogical sequence
      - CRITICALLY IMPORTANT: Ensure each phase reflects the selected teaching style(s)
      - If multiple styles are selected, create a balanced progression:
        * Opening phases might be more structured/teacher-led
        * Middle phases should include more guided interaction
        * Later phases can involve more student independence and application
        * The overall balance should reflect the combination of selected styles

4) Teaching Style Integration in Phases:
   - For each phase, explicitly consider how the selected teaching style(s) influence:
     * The teacher's role in the phase
     * The level of student participation
     * The types of activities and interactions
     * The delivery methods for content
     * The assessment approaches
   - When blending styles, maintain coherence by:
     * Creating clear transitions between different teaching approaches
     * Ensuring the overall flow feels natural, not disjointed
     * Maintaining alignment with the learning objectives throughout

5) Quality Check:
   - Verify all feedback has been addressed
   - Ensure phase modifications are applied exactly
   - Check alignment with objectives
   - Validate reference material usage
   - Confirm total duration matches {duration}
   - Verify that teaching phases accurately reflect the selected teaching style(s)

OUTPUT FORMAT (JSON):
{{
  "broad_plan": {{
    "objectives": [
      "Refined learning goals (should consider the reference materials)"
    ],
    "outline": [
      {{
        "phase": "Phase name (must match if specified in feedback)",
        "duration": "Duration (must match if specified in feedback)",
        "purpose": "What students will achieve in this phase",
        "description": "Detailed explanation of how this phase will unfold and how it contributes to objectives"
      }}
    ]
  }}
}}



CONSTRAINTS:
1. Reference Materials:
   * When provided, at least 60% of content must be reference-based
   * Integrate reference material seamlessly without explicit markers
   * Maintain academic level and teaching style

2. User Feedback:
   * User feedback has absolute priority
   * Apply ALL requested changes exactly as specified
   * Maintain exact phase names and durations when provided
   * Only modify structure if explicitly requested

3. Teaching Style Integration:
   * Each phase must clearly reflect the selected teaching style(s)
   * If multiple styles are selected, create a thoughtful blend that leverages the strengths of each
   * Ensure the overall lesson structure creates a coherent learning experience
   * Maintain appropriate balance between teacher-led and student-centered activities

4. Technical Requirements:
   * Output only valid JSON
   * Include all required fields
   * Ensure total duration matches {duration} minutes
`
});


export const CRITIQUE_TEMPLATE = new PromptTemplate({
  inputVariables: ['broad_plan_json'],
  template: `You are an expert educational consultant reviewing a detailed lesson plan.

### **ANALYZE THE PLAN**
{broad_plan_json}

... (rest of template)
`
});

export const REVISE_SELECTED_TEMPLATE = new PromptTemplate({
  inputVariables: ['broad_plan_json', 'selected_critique_points'],
  template: `You are an expert instructional designer improving a lesson plan based on selected critique points.

### **1) REVIEW ORIGINAL PLAN**
{broad_plan_json}

... (rest of template)
`
});

export const PRECISE_REVISION_TEMPLATE = new PromptTemplate({
  inputVariables: ['original_plan_json', 'revised_phases', 'user_feedback'],
  template: `You are an expert instructional designer tasked with making precise, targeted revisions to a lesson plan.

### **ORIGINAL LESSON PLAN**
{original_plan_json}

... (rest of template)
`
});

export const QUIZ_GENERATION_TEMPLATE = new PromptTemplate({
  inputVariables: [
    'phase_content',
    'num_questions',
    'difficulty',
    'question_type',
    'additional_notes',
    'lesson_objectives'
  ],
  template: `You are creating a STUDENT-FOCUSED quiz for a lesson phase with the following content:
{phase_content}

... (rest of template)
`
});

export const CODE_PRACTICE_GENERATION_TEMPLATE = new PromptTemplate({
  inputVariables: [
    'phase_content',
    'programming_language',
    'difficulty',
    'question_type',
    'additional_requirements'
  ],
  template: `You are creating a coding practice exercise for a lesson phase with the following content:
{phase_content}

... (rest of template)
`
});

export const SLIDES_GENERATION_TEMPLATE = new PromptTemplate({
  inputVariables: [
    'phase_content',
    'slide_style',
    'num_slides',
    'additional_requirements'
  ],
  template: `You are a professional instructional slide designer tasked with creating slides for the following teaching phase content:
{phase_content}

... (rest of template)
`
});

