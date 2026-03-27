import { PROMPT_MAP } from './prompts';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const MODEL = 'gemini-flash-latest';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:streamGenerateContent?alt=sse&key=`;

/**
 * Stream-translate raw input text using Gemini.
 * @param {string} inputText - Raw user input
 * @param {'email' | 'linkedin' | 'slack' | 'teams'} mode - Output mode
 * @param {(chunk: string) => void} onChunk - Called with each text chunk as it streams
 * @param {AbortSignal} [signal] - Optional abort signal
 * @returns {Promise<string>} - Full concatenated output
 */
export async function translateText(inputText, mode, onChunk, signal) {
  if (!API_KEY) {
    throw new Error('Gemini API key not configured. Add VITE_GEMINI_API_KEY to your .env file.');
  }

  const systemPrompt = PROMPT_MAP[mode] || PROMPT_MAP.email;

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }]
    },
    contents: [
      {
        role: 'user',
        parts: [{ text: inputText }]
      }
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 2048,
    }
  };

  const response = await fetch(`${API_URL}${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `API error: ${response.status}`;
    throw new Error(message);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = '';
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (line.startsWith('data: ')) {
        const jsonStr = line.slice(6).trim();
        if (!jsonStr || jsonStr === '[DONE]') continue;

        try {
          const parsed = JSON.parse(jsonStr);
          const text = parsed?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            fullText += text;
            onChunk(text);
          }
        } catch {
          // Skip malformed JSON chunks
        }
      }
    }
  }

  return fullText;
}
