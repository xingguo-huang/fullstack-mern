// back-end/src/services/llmService.js
// import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain } from 'langchain/chains';
import { ChatOpenAI } from "@langchain/openai";


import {
  BROAD_PLAN_DRAFT_TEMPLATE,
  REVISE_SELECTED_TEMPLATE,
  PRECISE_REVISION_TEMPLATE,
  QUIZ_GENERATION_TEMPLATE,
  CODE_PRACTICE_GENERATION_TEMPLATE,
  SLIDES_GENERATION_TEMPLATE
} from './prompts.js';

export function get_llm(modelName = 'gpt-4', temperature = 0.5) {
  return new ChatOpenAI({
    modelName,
    temperature,
    openAIApiKey: process.env.OPENAI_API_KEY
  });
}

export function create_broad_plan_draft_chain(llm) {
  return new LLMChain({
    llm,
    prompt: BROAD_PLAN_DRAFT_TEMPLATE,
    outputKey: 'broad_plan_draft'
  });
}

export function create_revise_selected_plan_chain(llm) {
  return new LLMChain({
    llm,
    prompt: REVISE_SELECTED_TEMPLATE,
    outputKey: 'revised_plan'
  });
}

export function create_precise_revision_chain(llm) {
  return new LLMChain({
    llm,
    prompt: PRECISE_REVISION_TEMPLATE,
    outputKey: 'precisely_revised_plan'
  });
}

export function create_artifact_chain(llm, type) {
  const promptMap = {
    quiz: QUIZ_GENERATION_TEMPLATE,
    code_practice: CODE_PRACTICE_GENERATION_TEMPLATE,
    slides: SLIDES_GENERATION_TEMPLATE
  };

  const prompt = promptMap[type];
  if (!prompt) throw new Error(`Unsupported artifact type: ${type}`);

  return new LLMChain({
    llm,
    prompt,
    outputKey: type
  });
}
