import { useState } from 'react';
import './App.css';
import { useTranslation } from './hooks/useTranslation';
import { InfiniteGrid } from './components/ui/the-infinite-grid';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import InputPanel from './components/InputPanel';
import OutputPanel from './components/OutputPanel';

function App() {
  const [view, setView] = useState('landing'); // 'landing' | 'app'

  const {
    input, setInput,
    output,
    mode, setMode,
    isStreaming,
    error,
    translate, clear,
    isOverLimit,
    maxChars,
  } = useTranslation();

  return (
    <InfiniteGrid>
      <Header onLogoClick={() => setView('landing')} showBackToApp={view === 'landing'} onTryApp={() => setView('app')} />

      {view === 'landing' ? (
        <>
          <main style={{ flex: 1 }}>
            <LandingPage onGetStarted={() => setView('app')} />
          </main>
          <Footer />
        </>
      ) : (
        <>
          <main style={{
            flex: 1,
            padding: 'clamp(16px, 3vw, 32px)',
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
          }}>
            <div className="animate-fade-in" style={{ textAlign: 'center', marginBottom: 4 }}>
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 3.5vw, 1.8rem)',
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                marginBottom: 6,
                letterSpacing: '-0.02em',
              }}>
                Think messy. Send clean.
              </h2>
              <p style={{
                color: 'var(--color-text-muted)',
                fontSize: 'clamp(0.825rem, 1.8vw, 0.925rem)',
                maxWidth: 460,
                margin: '0 auto',
                lineHeight: 1.5,
              }}>
                Dump your thoughts and your buddy will polish them for you.
              </p>
            </div>

            <div className="translator-grid">
              <InputPanel
                input={input}
                setInput={setInput}
                mode={mode}
                setMode={setMode}
                isStreaming={isStreaming}
                isOverLimit={isOverLimit}
                maxChars={maxChars}
                onTranslate={translate}
                onClear={clear}
              />
              <OutputPanel
                output={output}
                isStreaming={isStreaming}
                error={error}
                mode={mode}
              />
            </div>
          </main>
          <Footer />
        </>
      )}
    </InfiniteGrid>
  );
}

export default App;
