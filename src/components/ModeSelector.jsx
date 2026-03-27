import emailIcon from '@/assets/email.svg';
import linkedinIcon from '@/assets/linkedin.svg';
import slackIcon from '@/assets/slack.svg';
import teamsIcon from '@/assets/teams.svg';

export const MODES = [
  { id: 'email', label: 'Email', icon: emailIcon },
  { id: 'linkedin', label: 'LinkedIn', icon: linkedinIcon },
  { id: 'slack', label: 'Slack', icon: slackIcon },
  { id: 'teams', label: 'Teams', icon: teamsIcon },
];

export default function ModeSelector({ mode, setMode }) {
  const activeIndex = MODES.findIndex((m) => m.id === mode);
  const count = MODES.length;

  return (
    <div className="mode-toggle" role="radiogroup" aria-label="Output format">
      <div
        className="mode-toggle-indicator"
        style={{
          left: `calc(${(activeIndex / count) * 100}% + 3px)`,
          width: `calc(${100 / count}% - 6px)`,
        }}
      />
      {MODES.map((m) => (
        <button
          key={m.id}
          className={`mode-toggle-btn ${mode === m.id ? 'active' : ''}`}
          onClick={() => setMode(m.id)}
          role="radio"
          aria-checked={mode === m.id}
          id={`mode-${m.id}`}
        >
          <img src={m.icon} alt="" width={16} height={16} style={{ flexShrink: 0 }} />
          {m.label}
        </button>
      ))}
    </div>
  );
}
