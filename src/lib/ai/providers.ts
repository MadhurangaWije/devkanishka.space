import { google } from '@ai-sdk/google';
import { createOpenAI } from '@ai-sdk/openai';
import type { LanguageModel, EmbeddingModel } from 'ai';

// Embedding dimensionality is fixed site-wide — it must match the
// `vector(768)` column in Supabase and stay identical between indexing and
// query time, regardless of which chat provider answers the question.
export const EMBEDDING_DIMENSIONS = 768;

/**
 * The chat/answering model. Swappable via LLM_PROVIDER without touching any
 * call site — defaults to Gemini Flash; set LLM_PROVIDER=openrouter (and
 * OPENROUTER_API_KEY) to switch. OpenRouter exposes an OpenAI-compatible
 * endpoint, so no dedicated OpenRouter SDK package is needed.
 */
export function getChatModel(): LanguageModel {
  // `|| undefined` rather than plain env access — an empty string in .env
  // (e.g. an unset "CHAT_MODEL=" placeholder) is not `undefined`, so `??`
  // alone wouldn't fall back to the default.
  const provider = process.env.LLM_PROVIDER || 'google';
  const modelOverride = process.env.CHAT_MODEL || undefined;

  if (provider === 'openrouter') {
    const openrouter = createOpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });
    return openrouter(modelOverride ?? 'google/gemini-2.0-flash-001');
  }

  return google(modelOverride ?? 'gemini-3.5-flash');
}

/**
 * The embedding model — pinned to Gemini independently of the chat provider
 * above. Embeddings only need to stay consistent with themselves (same
 * model + dimensionality between indexing and querying); they don't need to
 * track whatever answers the question.
 */
export function getEmbeddingModel(): EmbeddingModel {
  return google.textEmbeddingModel('gemini-embedding-001');
}

export const EMBEDDING_PROVIDER_OPTIONS = {
  google: { outputDimensionality: EMBEDDING_DIMENSIONS },
};
