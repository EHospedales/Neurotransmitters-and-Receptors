export type ReceptorAction =
  | 'agonist'
  | 'antagonist'
  | 'partial_agonist'
  | 'inverse_agonist'
  | 'reuptake_inhibitor'
  | 'allosteric_modulator';

export type Affinity = 'high' | 'medium' | 'low';

export interface Citation {
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
  pmid?: string;
}

export interface BehavioralEffect {
  action: ReceptorAction;
  effect: string;
  clinicalRelevance: string;
  citation: Citation;
}

export interface Receptor {
  id: string;
  name: string;
  aliases: string[];
  neurotransmitter: string;
  system: string;
  behavioralEffects: BehavioralEffect[];
  description: string;
}

export interface ReceptorBinding {
  receptorId: string;
  action: ReceptorAction;
  affinity: Affinity;
  clinicalRelevance: string;
  citation: Citation;
}

export interface Drug {
  id: string;
  name: string;
  brandNames: string[];
  drugClass: string;
  indications: string[];
  receptorBindings: ReceptorBinding[];
  mechanismSummary: string;
}

export interface CypInteractionProfile {
  substrates: string[];
  inhibits: string[];
  induces: string[];
  notes?: string;
}

export type QuestionType = 'drug_to_receptor' | 'receptor_to_effect' | 'drug_to_effect' | 'effect_to_drug';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  question: string;
  correctAnswer: string;
  wrongAnswers: string[];
  explanation: string;
  citation: Citation;
  drugId?: string;
  receptorId?: string;
}

export interface UserProgress {
  questionsAnswered: number;
  correctAnswers: number;
  streakDays: number;
  lastStudyDate: string;
  badges: string[];
  reviewedDrugs: string[];
  reviewedReceptors: string[];
  quizHistory: { questionId: string; correct: boolean; date: string }[];
}
