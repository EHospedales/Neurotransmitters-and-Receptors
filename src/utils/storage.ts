import type { UserProgress } from '../types';

const STORAGE_KEY = 'neuro_progress';

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as UserProgress;
  } catch {
    // ignore
  }
  return {
    questionsAnswered: 0,
    correctAnswers: 0,
    streakDays: 0,
    lastStudyDate: '',
    badges: [],
    reviewedDrugs: [],
    reviewedReceptors: [],
    quizHistory: [],
  };
}

export function saveProgress(progress: UserProgress): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function recordStudy(progress: UserProgress): UserProgress {
  const today = new Date().toISOString().split('T')[0];
  if (progress.lastStudyDate === today) return progress;

  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  const newStreak = progress.lastStudyDate === yesterday ? progress.streakDays + 1 : 1;

  return { ...progress, lastStudyDate: today, streakDays: newStreak };
}

export function markDrugReviewed(progress: UserProgress, drugId: string): UserProgress {
  if (progress.reviewedDrugs.includes(drugId)) return progress;
  return { ...progress, reviewedDrugs: [...progress.reviewedDrugs, drugId] };
}

export function markReceptorReviewed(progress: UserProgress, receptorId: string): UserProgress {
  if (progress.reviewedReceptors.includes(receptorId)) return progress;
  return { ...progress, reviewedReceptors: [...progress.reviewedReceptors, receptorId] };
}

export function recordAnswer(
  progress: UserProgress,
  questionId: string,
  correct: boolean,
): UserProgress {
  const newHistory = [
    ...progress.quizHistory,
    { questionId, correct, date: new Date().toISOString() },
  ];
  const updated = {
    ...progress,
    questionsAnswered: progress.questionsAnswered + 1,
    correctAnswers: progress.correctAnswers + (correct ? 1 : 0),
    quizHistory: newHistory,
  };
  return checkBadges(updated);
}

const BADGE_RULES: { id: string; label: string; check: (p: UserProgress) => boolean }[] = [
  { id: 'first_answer', label: '🎯 First Answer', check: (p) => p.questionsAnswered >= 1 },
  { id: 'ten_correct', label: '🔟 Ten Correct', check: (p) => p.correctAnswers >= 10 },
  { id: 'fifty_correct', label: '⭐ 50 Correct', check: (p) => p.correctAnswers >= 50 },
  { id: 'streak_3', label: '🔥 3-Day Streak', check: (p) => p.streakDays >= 3 },
  { id: 'streak_7', label: '🏆 7-Day Streak', check: (p) => p.streakDays >= 7 },
  { id: 'drugs_5', label: '💊 5 Drugs Explored', check: (p) => p.reviewedDrugs.length >= 5 },
  { id: 'drugs_all', label: '🧪 Drug Expert', check: (p) => p.reviewedDrugs.length >= 15 },
  { id: 'receptors_5', label: '🔬 5 Receptors Explored', check: (p) => p.reviewedReceptors.length >= 5 },
  { id: 'receptors_all', label: '🧠 Receptor Master', check: (p) => p.reviewedReceptors.length >= 10 },
  { id: 'accuracy_80', label: '🎓 80% Accuracy', check: (p) => p.questionsAnswered >= 10 && p.correctAnswers / p.questionsAnswered >= 0.8 },
];

export function checkBadges(progress: UserProgress): UserProgress {
  const newBadges = BADGE_RULES.filter(
    (rule) => !progress.badges.includes(rule.id) && rule.check(progress),
  ).map((rule) => rule.id);

  if (newBadges.length === 0) return progress;
  return { ...progress, badges: [...progress.badges, ...newBadges] };
}

export const BADGE_LABELS: Record<string, string> = Object.fromEntries(
  BADGE_RULES.map((r) => [r.id, r.label]),
);
