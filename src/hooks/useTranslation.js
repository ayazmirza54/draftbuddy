import { useState, useCallback, useRef } from 'react';
import { translateText } from '../services/gemini';

const MAX_CHARS = 2000;

export function useTranslation() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('email');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);
  const abortRef = useRef(null);

  const isOverLimit = input.length > MAX_CHARS;

  const translate = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming || isOverLimit) return;

    setError(null);
    setOutput('');
    setIsStreaming(true);

    const abortController = new AbortController();
    abortRef.current = abortController;

    try {
      await translateText(
        trimmed,
        mode,
        (chunk) => setOutput((prev) => prev + chunk),
        abortController.signal
      );
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong. Try again.');
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
    }
  }, [input, mode, isStreaming, isOverLimit]);

  const cancel = useCallback(() => {
    if (abortRef.current) abortRef.current.abort();
  }, []);

  const clear = useCallback(() => {
    setInput('');
    setOutput('');
    setError(null);
  }, []);

  return {
    input, setInput,
    output,
    mode, setMode,
    isStreaming,
    error,
    translate, cancel, clear,
    isOverLimit,
    maxChars: MAX_CHARS,
  };
}
