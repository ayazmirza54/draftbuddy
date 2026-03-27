import { useState, useCallback, useRef } from 'react';

export function useClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  const copy = useCallback(async (text) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);

      setCopied(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setCopied(false), resetDelay);
    }
  }, [resetDelay]);

  return { copied, copy };
}
