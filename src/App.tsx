import { useState } from 'react';
import { loadProgress, saveProgress } from './utils/storage';
import type { UserProgress } from './types';
import Explorer from './components/Explorer';
import Quiz from './components/Quiz';
import Progress from './components/Progress';
import './App.css';

type Tab = 'explore' | 'quiz' | 'progress';

export default function App() {
  const [tab, setTab] = useState<Tab>('explore');
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  function updateProgress(p: UserProgress) {
    setProgress(p);
    saveProgress(p);
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title">
          <span className="app-logo">🧠</span>
          <div>
            <h1>NeuroRx</h1>
            <p className="app-subtitle">Psychiatric Drug Receptors &amp; Behavior</p>
          </div>
        </div>
        <nav className="app-nav">
          {(['explore', 'quiz', 'progress'] as Tab[]).map((t) => (
            <button
              key={t}
              className={`nav-btn${tab === t ? ' nav-active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t === 'explore' ? '🔬 Explore' : t === 'quiz' ? '🎯 Quiz' : '📊 Progress'}
            </button>
          ))}
        </nav>
      </header>

      <main className="app-main">
        {tab === 'explore' && (
          <Explorer progress={progress} setProgress={updateProgress} />
        )}
        {tab === 'quiz' && (
          <Quiz progress={progress} setProgress={updateProgress} />
        )}
        {tab === 'progress' && <Progress progress={progress} />}
      </main>

      <footer className="app-footer">
        <p>
          NeuroRx · Built for psychiatric residency education · All content based on peer-reviewed
          literature · Not for clinical use
        </p>
      </footer>
    </div>
  );
}
