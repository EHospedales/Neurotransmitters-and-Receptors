import type { UserProgress } from '../types';
import { BADGE_LABELS } from '../utils/storage';
import { drugs, receptors } from '../data/database';

interface Props {
  progress: UserProgress;
}

const ALL_BADGE_IDS = Object.keys(BADGE_LABELS);

export default function Progress({ progress }: Props) {
  const accuracy =
    progress.questionsAnswered > 0
      ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
      : 0;

  const drugPct = Math.round((progress.reviewedDrugs.length / drugs.length) * 100);
  const receptorPct = Math.round((progress.reviewedReceptors.length / receptors.length) * 100);

  return (
    <div className="progress-page">
      <h2>Your Progress</h2>

      <div className="stats-grid">
        <StatCard emoji="❓" label="Questions Answered" value={progress.questionsAnswered} />
        <StatCard emoji="✅" label="Correct Answers" value={progress.correctAnswers} />
        <StatCard emoji="🎯" label="Accuracy" value={`${accuracy}%`} />
        <StatCard emoji="🔥" label="Day Streak" value={progress.streakDays} />
      </div>

      <div className="progress-section">
        <h3>📚 Coverage</h3>
        <ProgressBar
          label={`Drugs Explored (${progress.reviewedDrugs.length}/${drugs.length})`}
          pct={drugPct}
          color="#6ee7b7"
        />
        <ProgressBar
          label={`Receptors Explored (${progress.reviewedReceptors.length}/${receptors.length})`}
          pct={receptorPct}
          color="#93c5fd"
        />
      </div>

      <div className="progress-section">
        <h3>🏆 Badges</h3>
        <div className="badge-grid">
          {ALL_BADGE_IDS.map((id) => {
            const earned = progress.badges.includes(id);
            return (
              <div key={id} className={`badge-item ${earned ? 'badge-earned' : 'badge-locked'}`}>
                <span className="badge-emoji">{earned ? BADGE_LABELS[id].split(' ')[0] : '🔒'}</span>
                <span className="badge-label">{BADGE_LABELS[id].replace(/^[^ ]+ /, '')}</span>
              </div>
            );
          })}
        </div>
      </div>

      {progress.quizHistory.length > 0 && (
        <div className="progress-section">
          <h3>📈 Recent Quiz History</h3>
          <div className="history-list">
            {progress.quizHistory
              .slice(-20)
              .reverse()
              .map((item, i) => (
                <div key={i} className={`history-item ${item.correct ? 'hist-correct' : 'hist-wrong'}`}>
                  <span>{item.correct ? '✅' : '❌'}</span>
                  <span className="hist-id">{item.questionId.replace(/_/g, ' ')}</span>
                  <span className="hist-date">{new Date(item.date).toLocaleDateString()}</span>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  emoji,
  label,
  value,
}: {
  emoji: string;
  label: string;
  value: number | string;
}) {
  return (
    <div className="stat-card">
      <div className="stat-emoji">{emoji}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function ProgressBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  return (
    <div className="progress-bar-row">
      <div className="progress-bar-label">{label}</div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
      <div className="progress-bar-pct">{pct}%</div>
    </div>
  );
}
