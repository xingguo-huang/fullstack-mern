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
   ...

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
... (rest of template)
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
