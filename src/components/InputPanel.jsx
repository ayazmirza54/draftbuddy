import ModeSelector from './ModeSelector';

export default function InputPanel({
  input,
  setInput,
  mode,
  setMode,
  isStreaming,
  isOverLimit,
  maxChars,
  onTranslate,
  onClear,
}) {
  const charCount = input.length;
  const isEmpty = input.trim().length === 0;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      onTranslate();
    }
  };

  return (
    <div className="input-card animate-fade-in" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Mode Selector */}
      <div style={{ padding: '16px 20px 0' }}>
        <ModeSelector mode={mode} setMode={setMode} />
      </div>

      {/* Textarea */}
      <textarea
        className="input-textarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={{
          email: "What do you actually want to say?\n\ne.g. \"Yaar ye client phir se same cheez maang raha hai, kuch bhi samajh nahi aata inhe.\"",
          linkedin: "What's the hot take?\n\ne.g. \"My manager takes all the credit and gives none. Classic.\"",
          slack: "What do you want to tell them on Slack?\n\ne.g. \"Bhai ye deployment kaun kiya bina bataye? Sab kuch toot gaya.\"",
          teams: "What's the Teams message?\n\ne.g. \"This meeting could have been an email. But whatever, let's discuss.\"",
        }[mode] || "What do you actually want to say?"}
        aria-label="Enter your raw, unfiltered thoughts"
        id="input-textarea"
        disabled={isStreaming}
        style={{
          resize: 'none',
          flex: 1,
          opacity: isStreaming ? 0.5 : 1,
          transition: 'opacity 0.15s ease',
        }}
      />

      {/* Bottom Bar */}
      <div style={{
        padding: '10px 20px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className={`char-counter ${charCount > maxChars * 0.9 ? (isOverLimit ? 'error' : 'warning') : ''}`}>
            {charCount} / {maxChars}
          </span>
          {!isEmpty && !isStreaming && (
            <button className="btn-subtle" onClick={onClear} style={{ padding: '3px 8px', fontSize: '0.75rem' }}>
              Clear
            </button>
          )}
          {!isEmpty && !isStreaming && (
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
              Ctrl+Enter
            </span>
          )}
        </div>

        <button
          className="btn-cta"
          onClick={onTranslate}
          disabled={isEmpty || isStreaming || isOverLimit}
          id="translate-btn"
        >
          <span>
            {isStreaming ? (
              <>
                <div className="spinner" />
                Translating…
              </>
            ) : (
              'Translate'
            )}
          </span>
        </button>
      </div>
    </div>
  );
}
