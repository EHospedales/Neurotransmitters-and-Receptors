import type { CypInteractionProfile } from '../types';

const UNKNOWN_PROFILE: CypInteractionProfile = {
  substrates: [],
  inhibits: [],
  induces: [],
  notes: 'No CYP interaction metadata entered yet.',
};

export const cypInteractionsByDrugName: Record<string, CypInteractionProfile> = {
  Haloperidol: { substrates: ['CYP3A4', 'CYP2D6'], inhibits: [], induces: [], notes: 'Exposure may rise with strong CYP3A4/2D6 inhibitors.' },
  Chlorpromazine: { substrates: ['CYP2D6', 'CYP1A2'], inhibits: ['CYP2D6'], induces: [], notes: 'Phenothiazine metabolism is multi-pathway and variable.' },
  Fluphenazine: { substrates: ['CYP2D6'], inhibits: [], induces: [], notes: 'Primarily oxidative metabolism through CYP2D6.' },
  Perphenazine: { substrates: ['CYP2D6'], inhibits: [], induces: [], notes: '2D6 poor metabolizers may have higher plasma concentrations.' },
  Trifluoperazine: { substrates: ['CYP1A2', 'CYP2D6'], inhibits: [], induces: [], notes: 'Older phenothiazine with less standardized PK interaction data.' },
  Thioridazine: { substrates: ['CYP2D6'], inhibits: ['CYP2D6'], induces: [], notes: 'Clinically important 2D6 interaction liability.' },
  Loxapine: { substrates: ['CYP1A2', 'CYP3A4', 'CYP2D6'], inhibits: [], induces: [], notes: 'Smoking can lower exposure via CYP1A2 induction.' },

  Clozapine: { substrates: ['CYP1A2', 'CYP3A4', 'CYP2D6'], inhibits: [], induces: [], notes: 'CYP1A2 is dominant; smoking strongly affects levels.' },
  Olanzapine: { substrates: ['CYP1A2', 'CYP2D6'], inhibits: [], induces: [], notes: 'CYP1A2 pathway is clinically relevant for smokers.' },
  Risperidone: { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Converted to active paliperidone mainly through CYP2D6.' },
  Quetiapine: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'High sensitivity to CYP3A4 inhibitors/inducers.' },
  Aripiprazole: { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Dose adjustments often needed with strong CYP2D6/3A4 modifiers.' },
  Lurasidone: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'Contraindicated with strong CYP3A4 inhibitors/inducers.' },
  Ziprasidone: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'Mostly aldehyde oxidase; CYP3A4 contributes secondarily.' },
  Paliperidone: { substrates: [], inhibits: [], induces: [], notes: 'Minimal CYP metabolism; largely renal elimination.' },
  Asenapine: { substrates: ['CYP1A2'], inhibits: ['CYP2D6'], induces: [], notes: 'UGT1A4 and direct glucuronidation also contribute.' },
  Iloperidone: { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Dose reduction often used with strong CYP2D6 or CYP3A4 inhibition.' },
  Brexpiprazole: { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Dose adjustments recommended with potent CYP modifiers.' },
  Cariprazine: { substrates: ['CYP3A4', 'CYP2D6'], inhibits: [], induces: [], notes: 'CYP3A4 is primary route to active metabolites.' },
  Amisulpride: { substrates: [], inhibits: [], induces: [], notes: 'Very limited hepatic CYP metabolism; mostly renal excretion.' },
  Lumateperone: { substrates: ['CYP3A4', 'CYP2C8', 'CYP1A2'], inhibits: [], induces: [], notes: 'Multi-enzyme metabolism; strongest signal through CYP3A4.' },
  'Ulotaront (SEP-363856)': { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'Investigational agent; interaction data still evolving.' },

  Fluoxetine: { substrates: ['CYP2D6', 'CYP2C9'], inhibits: ['CYP2D6', 'CYP2C19', 'CYP3A4'], induces: [], notes: 'Long half-life and active metabolite increase interaction persistence.' },
  Sertraline: { substrates: ['CYP2B6', 'CYP2C19', 'CYP3A4'], inhibits: ['CYP2D6'], induces: [], notes: 'CYP2D6 inhibition is usually dose dependent.' },
  Escitalopram: { substrates: ['CYP2C19', 'CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Generally low CYP inhibition burden.' },
  Paroxetine: { substrates: ['CYP2D6'], inhibits: ['CYP2D6'], induces: [], notes: 'Potent CYP2D6 inhibitor.' },
  Fluvoxamine: { substrates: ['CYP2D6'], inhibits: ['CYP1A2', 'CYP2C19', 'CYP3A4'], induces: [], notes: 'Strong inhibitor profile with broad interaction potential.' },
  Vilazodone: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'CYP3A4 is principal route; 2C19/2D6 are minor.' },
  Vortioxetine: { substrates: ['CYP2D6', 'CYP3A4', 'CYP2C19'], inhibits: [], induces: [], notes: 'CYP2D6 is major enzyme; lower doses may be needed with strong 2D6 inhibition.' },
  Agomelatine: { substrates: ['CYP1A2', 'CYP2C9'], inhibits: [], induces: [], notes: 'CYP1A2 inhibitors can significantly increase exposure.' },
  Prucalopride: { substrates: [], inhibits: [], induces: [], notes: 'Minimal CYP involvement; mostly unchanged renal excretion.' },
  'Idalopirdine (Lu AE58054)': { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Investigational status; interaction evidence remains limited.' },
  Venlafaxine: { substrates: ['CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'CYP2D6 forms active metabolite desvenlafaxine.' },
  Duloxetine: { substrates: ['CYP1A2', 'CYP2D6'], inhibits: ['CYP2D6'], induces: [], notes: 'Moderate CYP2D6 inhibition can affect co-medications.' },
  Desvenlafaxine: { substrates: [], inhibits: [], induces: [], notes: 'Limited CYP metabolism; mainly conjugation and renal elimination.' },
  Bupropion: { substrates: ['CYP2B6'], inhibits: ['CYP2D6'], induces: [], notes: 'Clinically meaningful CYP2D6 inhibition.' },
  Mirtazapine: { substrates: ['CYP1A2', 'CYP2D6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Multi-pathway metabolism with modest inhibition profile.' },
  Trazodone: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'Sensitive to strong CYP3A4 inhibitors and inducers.' },
  Amitriptyline: { substrates: ['CYP2D6', 'CYP2C19', 'CYP3A4'], inhibits: [], induces: [], notes: 'Metabolized to nortriptyline; CYP2D6 variability is clinically relevant.' },

  Lithium: { substrates: [], inhibits: [], induces: [], notes: 'Not metabolized by CYP enzymes; renal clearance only.' },
  'Valproate / Divalproex': { substrates: ['CYP2C9'], inhibits: ['CYP2C9', 'UGT'], induces: [], notes: 'Also inhibits glucuronidation pathways and epoxide hydrolase.' },
  Lamotrigine: { substrates: [], inhibits: [], induces: [], notes: 'Primarily UGT metabolism, not major CYP.' },
  Carbamazepine: { substrates: ['CYP3A4'], inhibits: [], induces: ['CYP3A4', 'CYP1A2', 'CYP2C9', 'CYP2C19'], notes: 'Strong auto-inducer and broad inducer of CYP enzymes.' },
  Oxcarbazepine: { substrates: [], inhibits: [], induces: ['CYP3A4'], notes: 'Can inhibit CYP2C19 and induce CYP3A4 at higher doses.' },

  Diazepam: { substrates: ['CYP2C19', 'CYP3A4'], inhibits: [], induces: [], notes: 'Long-acting benzodiazepine with CYP-dependent oxidation.' },
  Lorazepam: { substrates: [], inhibits: [], induces: [], notes: 'Metabolized by glucuronidation (UGT), not CYP.' },
  Clonazepam: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'CYP3A4 inhibition may increase sedation.' },

  Methylphenidate: { substrates: [], inhibits: [], induces: [], notes: 'Primarily hydrolyzed by CES1; negligible CYP metabolism.' },
  'Amphetamine / d-Amphetamine': { substrates: ['CYP2D6'], inhibits: [], induces: [], notes: 'CYP2D6 contributes variably to metabolism.' },
  Atomoxetine: { substrates: ['CYP2D6'], inhibits: [], induces: [], notes: 'CYP2D6 poor metabolizers have markedly higher exposure.' },
  Buspirone: { substrates: ['CYP3A4'], inhibits: [], induces: [], notes: 'Significant first-pass CYP3A4 metabolism.' },
  Esketamine: { substrates: ['CYP2B6', 'CYP3A4'], inhibits: [], induces: [], notes: 'Interactions possible with strong CYP2B6/3A4 modifiers.' },
};

export function getCypInteractionProfile(drugName: string): CypInteractionProfile {
  return cypInteractionsByDrugName[drugName] ?? UNKNOWN_PROFILE;
}
