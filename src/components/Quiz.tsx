import { useState, useMemo } from 'react';
import type { QuizQuestion } from '../types';
import type { UserProgress } from '../types';
import { generateQuestions } from '../utils/quiz';
import { recordAnswer, saveProgress, recordStudy } from '../utils/storage';

interface Props {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
}

type Phase = 'start' | 'question' | 'answered' | 'complete';

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

  const shuffledOptions = useMemo(
    () => optionsPerQuestion[currentIndex] ?? [],
    [optionsPerQuestion, currentIndex],
  );

  function startQuiz(count = 10) {
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
            Test your knowledge of psychiatric drug receptors with spaced-repetition-style questions
            backed by peer-reviewed literature.
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
            <button className="btn-primary" onClick={() => startQuiz(10)}>
              Quick Quiz (10 Q)
            </button>
            <button className="btn-secondary" onClick={() => startQuiz(25)}>
              Full Quiz (25 Q)
            </button>
          </div>
        </div>
      </div>
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
                {(q.citation.doi || q.citation.pmid) && (
                  <>
                    {' '}
                    <a
                      href={
                        q.citation.doi
                          ? `https://doi.org/${q.citation.doi}`
                          : `https://pubmed.ncbi.nlm.nih.gov/${q.citation.pmid}/`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View
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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
