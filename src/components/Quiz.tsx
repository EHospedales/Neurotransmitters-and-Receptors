import { useState, useMemo } from 'react';
import type { QuizQuestion } from '../types';
import type { UserProgress } from '../types';
import { generateQuestions } from '../utils/quiz';
import { recordAnswer, saveProgress, recordStudy } from '../utils/storage';
import { getCitationLinks } from '../utils/citation';
import { drugs, receptors } from '../data/database';

interface Props {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
}

type Phase = 'start' | 'question' | 'answered' | 'complete' | 'sandbox';
type QuizMode = 'classic' | 'diagram';

const ACTION_LABELS: Record<string, string> = {
  agonist: 'activates',
  antagonist: 'blocks',
  partial_agonist: 'partially activates',
  inverse_agonist: 'inverse-activates',
  reuptake_inhibitor: 'inhibits reuptake at',
  allosteric_modulator: 'modulates',
};

const NT_ICONS: Record<string, string> = {
  Dopamine: '🟣',
  Serotonin: '🟢',
  Norepinephrine: '🟠',
  GABA: '🔵',
  Glutamate: '🔺',
  Melatonin: '🌙',
  Histamine: '🟡',
  Acetylcholine: '🧠',
};

const DRUG_CLASS_ICONS: Record<string, string> = {
  'Typical Antipsychotic (1st generation)': '💊',
  'Atypical Antipsychotic (2nd generation)': '🧩',
  'Atypical Antipsychotic (2nd generation; Dopamine Partial Agonist)': '🎯',
  'SSRI (Selective Serotonin Reuptake Inhibitor)': '🌿',
  'SSRI / SPARI (Serotonin Partial Agonist-Reuptake Inhibitor)': '🧬',
  'SMS (Serotonin Modulator and Stimulator)': '🔬',
  'SNRI (Serotonin-Norepinephrine Reuptake Inhibitor)': '⚡',
  'Mood Stabilizer': '🪨',
  Benzodiazepine: '😴',
};

function buildShuffledOptions(questions: QuizQuestion[]): string[][] {
  return questions.map((q) => shuffle([q.correctAnswer, ...q.wrongAnswers.slice(0, 3)]));
}

export default function Quiz({ progress, setProgress }: Props) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [optionsPerQuestion, setOptionsPerQuestion] = useState<string[][]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('start');
  const [selected, setSelected] = useState<string | null>(null);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [mode, setMode] = useState<QuizMode>('diagram');
  const [sandboxReceptorId, setSandboxReceptorId] = useState('');
  const [sandboxDrugName, setSandboxDrugName] = useState('');

  const shuffledOptions = useMemo(
    () => optionsPerQuestion[currentIndex] ?? [],
    [optionsPerQuestion, currentIndex],
  );

  function startQuiz(count = 10) {
    if (mode === 'diagram') {
      setQuestions([]);
      setOptionsPerQuestion([]);
      setCurrentIndex(0);
      setSelected(null);
      setSessionCorrect(0);
      setSessionTotal(0);
      setNewBadges([]);
      setSandboxReceptorId('');
      setSandboxDrugName('');
      setPhase('sandbox');

      const updated = recordStudy(progress);
      setProgress(updated);
      saveProgress(updated);
      return;
    }

    const qs = generateQuestions().slice(0, count);
    setQuestions(qs);
    setOptionsPerQuestion(buildShuffledOptions(qs));
    setCurrentIndex(0);
    setPhase('question');
    setSelected(null);
    setSessionCorrect(0);
    setSessionTotal(0);
    setNewBadges([]);
    const updated = recordStudy(progress);
    setProgress(updated);
    saveProgress(updated);
  }

  function handleAnswer(option: string) {
    if (phase !== 'question') return;
    setSelected(option);
    setPhase('answered');

    const correct = option === questions[currentIndex].correctAnswer;
    const prevBadges = progress.badges;
    const updated = recordAnswer(progress, questions[currentIndex].id, correct);
    setProgress(updated);
    saveProgress(updated);

    const gained = updated.badges.filter((b) => !prevBadges.includes(b));
    if (gained.length > 0) setNewBadges((prev) => [...prev, ...gained]);

    setSessionTotal((t) => t + 1);
    if (correct) setSessionCorrect((c) => c + 1);
  }

  function next() {
    if (currentIndex + 1 >= questions.length) {
      setPhase('complete');
    } else {
      setSelected(null);
      setCurrentIndex((i) => i + 1);
      setPhase('question');
    }
  }

  if (phase === 'start') {
    return (
      <div className="quiz-start">
        <div className="quiz-start-card">
          <div className="quiz-icon">🧠</div>
          <h2>Receptor Quiz</h2>
          <p>
            Test your knowledge of psychiatric drug receptors with either classic MCQs or an object-based
            binding challenge where receptor and drug objects interact.
          </p>
          <div className="quiz-stats-row">
            <div className="quiz-stat">
              <span className="stat-num">{progress.questionsAnswered}</span>
              <span className="stat-label">Total Answered</span>
            </div>
            <div className="quiz-stat">
              <span className="stat-num">
                {progress.questionsAnswered > 0
                  ? Math.round((progress.correctAnswers / progress.questionsAnswered) * 100)
                  : 0}
                %
              </span>
              <span className="stat-label">Accuracy</span>
            </div>
            <div className="quiz-stat">
              <span className="stat-num">{progress.streakDays}</span>
              <span className="stat-label">Day Streak 🔥</span>
            </div>
          </div>
          <div className="quiz-btn-group">
            <button
              className={`btn-secondary${mode === 'classic' ? ' mode-active' : ''}`}
              onClick={() => setMode('classic')}
            >
              Classic Mode
            </button>
            <button
              className={`btn-secondary${mode === 'diagram' ? ' mode-active' : ''}`}
              onClick={() => setMode('diagram')}
            >
              Diagram Mode
            </button>
          </div>
          <div className="quiz-btn-group" style={{ marginTop: '0.6rem' }}>
            {mode === 'classic' ? (
              <>
                <button className="btn-primary" onClick={() => startQuiz(10)}>
                  Quick Quiz (10 Q)
                </button>
                <button className="btn-secondary" onClick={() => startQuiz(25)}>
                  Full Quiz (25 Q)
                </button>
              </>
            ) : (
              <button className="btn-primary" onClick={() => startQuiz()}>
                Open Free Interaction Mode
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'sandbox') {
    return (
      <DiagramSandbox
        receptorId={sandboxReceptorId}
        drugName={sandboxDrugName}
        onReceptorChange={setSandboxReceptorId}
        onDrugChange={setSandboxDrugName}
        onBack={() => setPhase('start')}
      />
    );
  }

  if (phase === 'complete') {
    const pct = Math.round((sessionCorrect / sessionTotal) * 100);
    return (
      <div className="quiz-start">
        <div className="quiz-start-card">
          <div className="quiz-icon">{pct >= 80 ? '🏆' : pct >= 60 ? '⭐' : '💪'}</div>
          <h2>Quiz Complete!</h2>
          <p>
            You got <strong>{sessionCorrect}</strong> out of <strong>{sessionTotal}</strong> correct (
            {pct}%).
          </p>
          {newBadges.length > 0 && (
            <div className="badges-earned">
              <strong>🎉 New Badges Earned!</strong>
              <div className="badge-list">
                {newBadges.map((b) => (
                  <span key={b} className="badge-chip">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          )}
          <div className="quiz-btn-group">
            <button className="btn-primary" onClick={() => startQuiz(10)}>
              Play Again
            </button>
            <button className="btn-secondary" onClick={() => setPhase('start')}>
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[currentIndex];
  if (!q) return null;
  const isCorrect = selected === q.correctAnswer;
  const { titleSearchUrl } = getCitationLinks(q.citation);

  return (
    <div className="quiz-page">
      <div className="quiz-progress-bar">
        <div
          className="quiz-progress-fill"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
      <div className="quiz-counter">
        Question {currentIndex + 1} / {questions.length} &nbsp;|&nbsp; ✅ {sessionCorrect} correct
      </div>

      <div className="question-card">
        <div className="question-text">{q.question}</div>

        <div className="options-grid">
          {shuffledOptions.map((opt) => {
            let cls = 'option-btn';
            if (phase === 'answered') {
              if (opt === q.correctAnswer) cls += ' correct';
              else if (opt === selected) cls += ' incorrect';
            }
            return (
              <button
                key={opt}
                className={cls}
                onClick={() => handleAnswer(opt)}
                disabled={phase === 'answered'}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {phase === 'answered' && (
          <div className={`feedback-box ${isCorrect ? 'feedback-correct' : 'feedback-incorrect'}`}>
            <div className="feedback-header">
              {isCorrect ? '✅ Correct!' : `❌ Incorrect — ${q.correctAnswer}`}
            </div>
            <p className="feedback-explanation">{q.explanation}</p>
            <div className="citation-card">
              <span className="citation-icon">📄</span>
              <span>
                <strong>{q.citation.authors}</strong> ({q.citation.year}).{' '}
                <em>{q.citation.journal}</em>.
                {titleSearchUrl && (
                  <>
                    {' '}
                    <a href={titleSearchUrl} target="_blank" rel="noopener noreferrer">
                      Open Citation
                    </a>
                  </>
                )}
              </span>
            </div>
            <button className="btn-primary next-btn" onClick={next}>
              {currentIndex + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DiagramSandbox({
  receptorId,
  drugName,
  onReceptorChange,
  onDrugChange,
  onBack,
}: {
  receptorId: string;
  drugName: string;
  onReceptorChange: (id: string) => void;
  onDrugChange: (name: string) => void;
  onBack: () => void;
}) {
  const selectedReceptor = receptorId ? receptors.find((r) => r.id === receptorId) : undefined;
  const selectedDrug = drugName ? drugs.find((d) => d.name === drugName) : undefined;
  const selectedBinding = selectedDrug?.receptorBindings.find((binding) => binding.receptorId === receptorId);

  const ntIcon = NT_ICONS[selectedReceptor?.neurotransmitter ?? ''] ?? '🧠';
  const drugIcon = selectedDrug ? DRUG_CLASS_ICONS[selectedDrug.drugClass] ?? '💊' : '💊';
  const hasBothSelected = Boolean(selectedReceptor && selectedDrug);
  const hasMatch = Boolean(selectedBinding);

  const receptorMatches = receptorId
    ? drugs.reduce<Array<{ drug: (typeof drugs)[number]; binding: (typeof drugs)[number]['receptorBindings'][number] }>>(
        (accumulator, drug) => {
          const binding = drug.receptorBindings.find((candidate) => candidate.receptorId === receptorId);
          if (binding) accumulator.push({ drug, binding });
          return accumulator;
        },
        [],
      )
    : [];

  const actionLabel = selectedBinding ? ACTION_LABELS[selectedBinding.action] ?? 'acts at' : 'acts at';
  const { titleSearchUrl } = selectedBinding ? getCitationLinks(selectedBinding.citation) : { titleSearchUrl: null };

  return (
    <div className="quiz-page">
      <div className="question-card diagram-sandbox">
        <div className="sandbox-header-row">
          <div>
            <h2 className="sandbox-title">Free Interaction Mode</h2>
            <p className="sandbox-subtitle">Select any receptor and/or drug to explore real binding relationships.</p>
          </div>
          <button className="btn-secondary" onClick={onBack}>
            Back to Menu
          </button>
        </div>

        <div className="sandbox-controls">
          <label className="sandbox-control">
            <span>Receptor</span>
            <select className="sandbox-select" value={receptorId} onChange={(e) => onReceptorChange(e.target.value)}>
              <option value="">Select receptor</option>
              {receptors.map((receptor) => (
                <option key={receptor.id} value={receptor.id}>
                  {receptor.name}
                </option>
              ))}
            </select>
          </label>

          <label className="sandbox-control">
            <span>Drug</span>
            <select className="sandbox-select" value={drugName} onChange={(e) => onDrugChange(e.target.value)}>
              <option value="">Select drug</option>
              {drugs.map((drug) => (
                <option key={drug.id} value={drug.name}>
                  {drug.name}
                </option>
              ))}
            </select>
          </label>

          <button
            className="btn-secondary sandbox-clear-btn"
            onClick={() => {
              onReceptorChange('');
              onDrugChange('');
            }}
          >
            Clear
          </button>
        </div>

        <div className={`binding-board${hasBothSelected ? (hasMatch ? ' success' : ' fail') : ''}`}>
          <div className="receptor-object">
            <div className="receptor-image" role="img" aria-label="receptor object">
              {ntIcon}
            </div>
            <div className="receptor-title">{selectedReceptor?.name ?? 'Receptor'}</div>
            <div className="receptor-sub">{selectedReceptor ? `${selectedReceptor.id} target` : 'Choose receptor'}</div>
          </div>

          <div className="binding-link-zone">
            <span
              className={`binding-line${hasBothSelected ? (hasMatch ? ' line-correct' : ' line-incorrect') : ''}`}
            />
            <span className="diagram-link-label">
              {hasBothSelected ? (hasMatch ? 'Interaction Found' : 'No Direct Interaction') : 'Select to Explore'}
            </span>
          </div>

          <div className="receptor-object">
            <div className="receptor-image" role="img" aria-label="drug object">
              {drugIcon}
            </div>
            <div className="receptor-title">{selectedDrug?.name ?? 'Drug'}</div>
            <div className="receptor-sub">{selectedDrug?.drugClass ?? 'Choose drug'}</div>
          </div>
        </div>

        {hasBothSelected && (
          <div className={`feedback-box ${hasMatch ? 'feedback-correct' : 'feedback-incorrect'}`}>
            <div className="feedback-header">
              {hasMatch
                ? `${selectedDrug?.name} ${actionLabel} ${selectedReceptor?.name}`
                : `${selectedDrug?.name} has no listed binding at ${selectedReceptor?.name}`}
            </div>
            {selectedBinding ? (
              <>
                <p className="feedback-explanation">{selectedBinding.clinicalRelevance}</p>
                <div className="citation-card">
                  <span className="citation-icon">📄</span>
                  <span>
                    <strong>{selectedBinding.citation.authors}</strong> ({selectedBinding.citation.year}).{' '}
                    <em>{selectedBinding.citation.journal}</em>.
                    {titleSearchUrl && (
                      <>
                        {' '}
                        <a href={titleSearchUrl} target="_blank" rel="noopener noreferrer">
                          Open Citation
                        </a>
                      </>
                    )}
                  </span>
                </div>
              </>
            ) : (
              <p className="feedback-explanation">Try another drug or receptor to find a known interaction in the database.</p>
            )}
          </div>
        )}

        <div className="sandbox-columns">
          <div className="sandbox-panel">
            <h3>Drugs for selected receptor</h3>
            {receptorId ? (
              receptorMatches.length > 0 ? (
                <div className="sandbox-list">
                  {receptorMatches.map(({ drug, binding }) => (
                    <button
                      key={`${receptorId}_${drug.id}`}
                      className="sandbox-list-item"
                      onClick={() => onDrugChange(drug.name)}
                    >
                      <span>{DRUG_CLASS_ICONS[drug.drugClass] ?? '💊'}</span>
                      <span>{drug.name}</span>
                      <span>{ACTION_LABELS[binding.action] ?? binding.action}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <p className="sandbox-empty">No drugs currently mapped to this receptor.</p>
              )
            ) : (
              <p className="sandbox-empty">Select a receptor to list interacting drugs.</p>
            )}
          </div>

          <div className="sandbox-panel">
            <h3>Receptors for selected drug</h3>
            {selectedDrug ? (
              selectedDrug.receptorBindings.length > 0 ? (
                <div className="sandbox-list">
                  {selectedDrug.receptorBindings.map((binding) => {
                    const receptor = receptors.find((r) => r.id === binding.receptorId);
                    return (
                      <button
                        key={`${selectedDrug.id}_${binding.receptorId}`}
                        className="sandbox-list-item"
                        onClick={() => onReceptorChange(binding.receptorId)}
                      >
                        <span>{NT_ICONS[receptor?.neurotransmitter ?? ''] ?? '🧠'}</span>
                        <span>{receptor?.name ?? binding.receptorId}</span>
                        <span>{ACTION_LABELS[binding.action] ?? binding.action}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="sandbox-empty">This drug has no receptor bindings listed.</p>
              )
            ) : (
              <p className="sandbox-empty">Select a drug to list its receptor interactions.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
