import type { QuizQuestion } from '../types';
import { drugs, receptors } from '../data/database';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickWrong<T>(pool: T[], correct: T, count = 3): T[] {
  return shuffle(pool.filter((x) => x !== correct)).slice(0, count);
}

const ACTION_LABELS: Record<string, string> = {
  agonist: 'Agonist',
  antagonist: 'Antagonist',
  partial_agonist: 'Partial Agonist',
  inverse_agonist: 'Inverse Agonist',
  reuptake_inhibitor: 'Reuptake Inhibitor',
  allosteric_modulator: 'Positive Allosteric Modulator',
};

export function generateQuestions(): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  // Q1: Drug → What class is this drug?
  for (const drug of drugs) {
    const allClasses = [...new Set(drugs.map((d) => d.drugClass))];
    questions.push({
      id: `drug_class_${drug.id}`,
      type: 'drug_to_receptor',
      question: `What drug class does ${drug.name} belong to?`,
      correctAnswer: drug.drugClass,
      wrongAnswers: pickWrong(allClasses, drug.drugClass),
      explanation: `${drug.name} (${drug.brandNames.join(', ')}) is classified as a ${drug.drugClass}. ${drug.mechanismSummary}`,
      citation: drug.receptorBindings[0]?.citation ?? {
        authors: 'Stahl SM',
        title: 'Essential Psychopharmacology',
        journal: 'Cambridge University Press',
        year: 2021,
      },
      drugId: drug.id,
    });
  }

  // Q2: Drug → Primary receptor action
  for (const drug of drugs) {
    for (const binding of drug.receptorBindings.slice(0, 2)) {
      const receptor = receptors.find((r) => r.id === binding.receptorId);
      if (!receptor) continue;
      const allActions = Object.values(ACTION_LABELS);
      const correct = ACTION_LABELS[binding.action] ?? binding.action;
      questions.push({
        id: `drug_action_${drug.id}_${binding.receptorId}`,
        type: 'drug_to_receptor',
        question: `What is ${drug.name}'s action at the ${receptor.name}?`,
        correctAnswer: correct,
        wrongAnswers: pickWrong(allActions, correct),
        explanation: `${drug.name} acts as a ${correct} at the ${receptor.name}. ${binding.clinicalRelevance}`,
        citation: binding.citation,
        drugId: drug.id,
        receptorId: binding.receptorId,
      });
    }
  }

  // Q3: Receptor effect → Which drug?
  for (const receptor of receptors) {
    for (const effect of receptor.behavioralEffects.slice(0, 1)) {
      const drugsWithReceptor = drugs.filter((d) =>
        d.receptorBindings.some((rb) => rb.receptorId === receptor.id && rb.action === effect.action),
      );
      if (drugsWithReceptor.length === 0) continue;
      const correctDrug = drugsWithReceptor[0];
      const allDrugNames = drugs.map((d) => d.name);
      questions.push({
        id: `receptor_effect_${receptor.id}_${effect.action}`,
        type: 'receptor_to_effect',
        question: `${effect.action === 'antagonist' ? 'Antagonism' : 'Agonism / Modulation'} at the ${receptor.name} produces which behavioral effect?`,
        correctAnswer: effect.effect,
        wrongAnswers: pickWrong(
          receptors.flatMap((r) => r.behavioralEffects.map((e) => e.effect)),
          effect.effect,
        ),
        explanation: effect.clinicalRelevance,
        citation: effect.citation,
        receptorId: receptor.id,
      });

      // Reverse: effect → drug
      questions.push({
        id: `effect_to_drug_${receptor.id}_${effect.action}`,
        type: 'effect_to_drug',
        question: `Which drug acts as a ${ACTION_LABELS[effect.action] ?? effect.action} at the ${receptor.name}?`,
        correctAnswer: correctDrug.name,
        wrongAnswers: pickWrong(allDrugNames, correctDrug.name),
        explanation: `${correctDrug.name} acts as a ${ACTION_LABELS[effect.action]} at the ${receptor.name}. ${correctDrug.mechanismSummary}`,
        citation: effect.citation,
        drugId: correctDrug.id,
        receptorId: receptor.id,
      });
    }
  }

  // Q4: Side effect from drug class
  for (const drug of drugs) {
    if (drug.receptorBindings.length < 2) continue;
    const binding = drug.receptorBindings.find((rb) =>
      ['H1', 'M1', 'alpha1'].includes(rb.receptorId),
    );
    if (!binding) continue;
    const receptor = receptors.find((r) => r.id === binding.receptorId);
    if (!receptor) continue;

    // Build a receptor-specific clinical scenario
    const sideEffectScenarios: Record<string, string> = {
      H1: `A patient taking ${drug.name} reports excessive sedation and significant weight gain. Which receptor binding is MOST responsible?`,
      M1: `A patient taking ${drug.name} complains of dry mouth, constipation, and urinary retention. Which receptor binding is MOST responsible?`,
      alpha1: `A patient taking ${drug.name} develops dizziness upon standing (orthostatic hypotension). Which receptor binding is MOST responsible?`,
    };
    const question =
      sideEffectScenarios[binding.receptorId] ??
      `A patient taking ${drug.name} develops a side effect. Which receptor binding is MOST responsible?`;

    questions.push({
      id: `side_effect_${drug.id}_${binding.receptorId}`,
      type: 'drug_to_effect',
      question,
      correctAnswer: receptor.name,
      wrongAnswers: pickWrong(receptors.map((r) => r.name), receptor.name),
      explanation: binding.clinicalRelevance,
      citation: binding.citation,
      drugId: drug.id,
      receptorId: binding.receptorId,
    });
  }

  return shuffle(questions);
}
