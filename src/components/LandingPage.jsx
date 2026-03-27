import emailIcon from '@/assets/email.svg';
import linkedinIcon from '@/assets/linkedin.svg';
import slackIcon from '@/assets/slack.svg';
import teamsIcon from '@/assets/teams.svg';
import BuddyCharacter from './BuddyCharacter';

const EXAMPLES = [
  {
    raw: "Yaar ye client phir se same cheez maang raha hai, kuch bhi samajh nahi aata inhe. Maine 3 baar explain kiya hai.",
    polished: "Subject: Follow-up on Previously Discussed Requirements\n\nHi [Client Name],\n\nI hope this message finds you well. I wanted to revisit the requirements we've discussed in our previous conversations to ensure we're fully aligned.\n\nI've outlined the key points below for your reference. Please let me know if any aspect needs further clarification — I'm happy to walk through them again.\n\nBest regards,\n[Your Name]",
    mode: "Email",
    icon: emailIcon,
  },
  {
    raw: "My manager takes all the credit and gives none. Been doing this for 2 years now. Classic corporate.",
    polished: "Two years ago, I learned something that changed how I think about career growth:\n\nYour work will speak for itself — but only if you learn to speak for it first.\n\nEarly in my career, I waited for recognition to come to me. It didn't. So I started documenting my impact, sharing wins in stand-ups, and making my contributions visible.\n\nThe lesson? Visibility isn't vanity. It's career strategy.\n\n#CareerGrowth #Leadership #ProfessionalDevelopment",
    mode: "LinkedIn",
    icon: linkedinIcon,
  },
];

const FORMATS = [
  { id: 'email', name: 'Email', desc: 'Full email with subject line, greeting, and sign-off', icon: emailIcon },
  { id: 'linkedin', name: 'LinkedIn', desc: 'Thought-leadership post with hooks and hashtags', icon: linkedinIcon },
  { id: 'slack', name: 'Slack', desc: 'Casual-professional message for channels or DMs', icon: slackIcon },
  { id: 'teams', name: 'Teams', desc: 'Semi-formal message with structure and clarity', icon: teamsIcon },
];

const STEPS = [
  { num: '01', title: 'Dump your thoughts', desc: 'Type whatever you\'re thinking in English, Hindi, or Hinglish. Your buddy doesn\'t judge.' },
  { num: '02', title: 'Pick where it\'s going', desc: 'Choose Email, LinkedIn, Slack, or Teams. Each gets the right tone.' },
  { num: '03', title: 'Copy and send', desc: 'Your buddy hands you a clean, professional draft. Just copy and go.' },
];

export default function LandingPage({ onGetStarted }) {
  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: 'clamp(16px, 4vw, 48px) clamp(16px, 3vw, 32px)' }}>
      {/* Mascot */}
      <div style={{ margin: '8px auto 20px' }}>
        <BuddyCharacter size={260} />
      </div>
      {/* ─── Hero ─── */}
      <section style={{ textAlign: 'center', padding: '48px 0 56px' }}>
        <p style={{
          fontSize: '0.8rem',
          fontWeight: 500,
          color: 'var(--color-accent-primary)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          Your draft buddy
        </p>
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2rem, 5vw, 3.2rem)',
          fontWeight: 800,
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 16,
        }}>
          Truth in words.<br />
          Clarity in send.
          
        </h2>
        <p style={{
          color: 'var(--color-text-secondary)',
          fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          maxWidth: 520,
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}>
          Dump your thoughts in English, Hindi, or Hinglish. Your buddy polishes them for email, LinkedIn, Slack, or Teams.
        </p>

        

        {/* Platform icons row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 28,
        }}>
          {FORMATS.map((f) => (
            <div key={f.id} style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <img src={f.icon} alt={f.name} width={22} height={22} />
            </div>
          ))}
        </div>

        <button className="btn-cta" onClick={onGetStarted} style={{ padding: '14px 36px', fontSize: '0.95rem' }}>
          Try it now
        </button>
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 12 }}>
          Free. No sign-up required.
        </p>
      </section>

      {/* ─── Before / After ─── */}
      <section style={{ padding: '40px 0' }}>
        <SectionLabel>Before → After</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {EXAMPLES.map((ex, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 1,
              borderRadius: 12,
              overflow: 'hidden',
              border: '1px solid var(--color-border-subtle)',
            }} className="example-grid">
              <div style={{
                background: 'var(--color-surface-secondary)',
                padding: '20px 24px',
              }}>
                <span style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  fontWeight: 500,
                  color: 'var(--color-text-muted)',
                  display: 'block',
                  marginBottom: 10,
                }}>What you typed</span>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}>"{ex.raw}"</p>
              </div>
              <div style={{
                background: 'var(--color-surface-elevated)',
                padding: '20px 24px',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  marginBottom: 10,
                }}>
                  <img src={ex.icon} alt="" width={14} height={14} />
                  <span style={{
                    fontSize: '0.7rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    fontWeight: 500,
                    color: 'var(--color-accent-primary)',
                  }}>{ex.mode} output</span>
                </div>
                <p style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-text-primary)',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-line',
                }}>{ex.polished}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section style={{ padding: '40px 0' }}>
        <SectionLabel>How it works</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
        }} className="steps-grid">
          {STEPS.map((step) => (
            <div key={step.num} style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 12,
              padding: '24px 20px',
            }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'var(--color-accent-primary)',
                fontVariantNumeric: 'tabular-nums',
                display: 'block',
                marginBottom: 10,
              }}>{step.num}</span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: 6,
              }}>{step.title}</h3>
              <p style={{
                fontSize: '0.85rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.5,
              }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Formats ─── */}
      <section style={{ padding: '40px 0' }}>
        <SectionLabel>Output formats</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 12,
        }} className="formats-grid">
          {FORMATS.map((f) => (
            <div key={f.id} style={{
              background: 'var(--color-surface-secondary)',
              border: '1px solid var(--color-border-subtle)',
              borderRadius: 10,
              padding: '18px 20px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'var(--color-surface-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                <img src={f.icon} alt="" width={20} height={20} />
              </div>
              <div>
                <span style={{
                  fontSize: '0.925rem',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  display: 'block',
                  marginBottom: 2,
                }}>{f.name}</span>
                <span style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.4,
                }}>{f.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section style={{
        textAlign: 'center',
        padding: '48px 0 32px',
        borderTop: '1px solid var(--color-border-subtle)',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}>
          Your buddy's got your back.
        </h3>
        <p style={{
          color: 'var(--color-text-muted)',
          fontSize: '0.9rem',
          marginBottom: 24,
        }}>
          Think messy. Send clean. That's the DraftBuddy way.
        </p>
        <button className="btn-cta" onClick={onGetStarted} style={{ padding: '14px 36px', fontSize: '0.95rem' }}>
          Try it now
        </button>
      </section>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: '0.75rem',
      fontWeight: 500,
      color: 'var(--color-text-muted)',
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
      marginBottom: 20,
    }}>
      {children}
    </p>
  );
}
