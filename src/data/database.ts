import type { Receptor, Drug } from '../types';

// ─── Receptors ────────────────────────────────────────────────────────────────

export const receptors: Receptor[] = [
  {
    id: 'D2',
    name: 'Dopamine D2 Receptor',
    aliases: ['D2', 'DRD2'],
    neurotransmitter: 'Dopamine',
    system: 'Dopaminergic',
    description:
      'A G-protein coupled receptor (Gi/Go) predominantly in the striatum, limbic system, and frontal cortex. Central target of all antipsychotic drugs.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Reduction of positive psychotic symptoms (hallucinations, delusions)',
        clinicalRelevance: 'Basis of antipsychotic action in mesolimbic pathway',
        citation: {
          authors: 'Kapur S, Mamo D',
          title: 'Half a century of antipsychotics and still a central role for dopamine D2 receptors',
          journal: 'Progress in Neuro-Psychopharmacology and Biological Psychiatry',
          year: 2003,
          doi: '10.1016/j.pnpbp.2003.09.004',
          pmid: '14596509',
        },
      },
      {
        action: 'antagonist',
        effect: 'Extrapyramidal side effects (EPS), tardive dyskinesia, hyperprolactinemia',
        clinicalRelevance: 'Blockade in nigrostriatal and tuberoinfundibular pathways causes motor and endocrine side effects',
        citation: {
          authors: 'Leucht S, Cipriani A, Spineli L, et al.',
          title: 'Comparative efficacy and tolerability of 15 antipsychotic drugs in schizophrenia: a multiple-treatments meta-analysis',
          journal: 'The Lancet',
          year: 2013,
          doi: '10.1016/S0140-6736(13)60733-3',
          pmid: '23810019',
        },
      },
      {
        action: 'partial_agonist',
        effect: 'Reduced psychosis with lower EPS risk, dopamine stabilization',
        clinicalRelevance: 'Partial agonism acts as functional antagonist in high-dopamine states and agonist in low-dopamine states',
        citation: {
          authors: 'Stahl SM',
          title: 'Dopamine system stabilizers, aripiprazole, and the next generation of antipsychotics',
          journal: 'Journal of Clinical Psychiatry',
          year: 2001,
          doi: '10.4088/jcp.v62n1204',
          pmid: '11843961',
        },
      },
    ],
  },
  {
    id: 'D1',
    name: 'Dopamine D1 Receptor',
    aliases: ['D1', 'DRD1'],
    neurotransmitter: 'Dopamine',
    system: 'Dopaminergic',
    description:
      'Gs-coupled receptor abundant in prefrontal cortex and striatum. Essential for working memory and executive function via the mesocortical pathway.',
    behavioralEffects: [
      {
        action: 'agonist',
        effect: 'Improved working memory and cognitive function',
        clinicalRelevance: 'Optimal D1 stimulation (inverted-U curve) supports PFC function relevant to schizophrenia cognition',
        citation: {
          authors: 'Goldman-Rakic PS, Muly EC, Williams GV',
          title: 'D1 receptors in prefrontal cells and circuits',
          journal: 'Brain Research Reviews',
          year: 2000,
          doi: '10.1016/s0165-0173(99)00045-4',
          pmid: '10817748',
        },
      },
    ],
  },
  {
    id: '5HT2A',
    name: '5-HT₂A Receptor',
    aliases: ['5-HT2A', 'HTR2A', 'Serotonin 2A'],
    neurotransmitter: 'Serotonin',
    system: 'Serotonergic',
    description:
      'Gq-coupled receptor in cortex, limbic system, and striatum. Blockade by atypical antipsychotics reduces EPS and improves cognition by disinhibiting dopamine in the mesocortical pathway.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Decreased EPS, improved cognition, antidepressant effects',
        clinicalRelevance: 'Key differentiator of atypical vs typical antipsychotics; improves negative/cognitive symptoms',
        citation: {
          authors: 'Meltzer HY, Matsubara S, Lee JC',
          title: 'Classification of typical and atypical antipsychotic drugs on the basis of dopamine D-1, D-2 and serotonin2 pKi values',
          journal: 'Journal of Pharmacology and Experimental Therapeutics',
          year: 1989,
          pmid: '2571413',
        },
      },
      {
        action: 'agonist',
        effect: 'Psychedelic/hallucinogenic experiences, altered perception',
        clinicalRelevance: 'Basis of classical psychedelic effects; under investigation for treatment-resistant depression',
        citation: {
          authors: 'Nichols DE',
          title: 'Psychedelics',
          journal: 'Pharmacological Reviews',
          year: 2016,
          doi: '10.1124/pr.115.011478',
          pmid: '26841800',
        },
      },
    ],
  },
  {
    id: '5HT2C',
    name: '5-HT₂C Receptor',
    aliases: ['5-HT2C', 'HTR2C', 'Serotonin 2C'],
    neurotransmitter: 'Serotonin',
    system: 'Serotonergic',
    description:
      'Gq-coupled receptor involved in appetite regulation, mood, and dopamine release modulation. Blockade is associated with weight gain.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Increased appetite, weight gain; possible antidepressant effects via DA/NE disinhibition',
        clinicalRelevance: 'Major driver of metabolic side effects with many atypical antipsychotics and mirtazapine',
        citation: {
          authors: 'Tecott LH, Sun LM, Akana SF, et al.',
          title: 'Eating disorder and epilepsy in mice lacking 5-HT2c serotonin receptors',
          journal: 'Nature',
          year: 1995,
          doi: '10.1038/374542a0',
          pmid: '7700379',
        },
      },
      {
        action: 'agonist',
        effect: 'Weight loss, appetite suppression',
        clinicalRelevance: 'Lorcaserin mechanism for obesity treatment',
        citation: {
          authors: 'Fidler MC, Sanchez M, Raether B, et al.',
          title: 'A one-year randomized trial of lorcaserin for weight loss in obese and overweight adults',
          journal: 'Journal of Clinical Endocrinology & Metabolism',
          year: 2011,
          doi: '10.1210/jc.2011-1256',
          pmid: '21646370',
        },
      },
    ],
  },
  {
    id: '5HT1A',
    name: '5-HT₁A Receptor',
    aliases: ['5-HT1A', 'HTR1A', 'Serotonin 1A'],
    neurotransmitter: 'Serotonin',
    system: 'Serotonergic',
    description:
      'Gi-coupled autoreceptor (raphe nuclei) and postsynaptic receptor (limbic, cortical areas). Critical target for anxiolytics and antidepressants.',
    behavioralEffects: [
      {
        action: 'partial_agonist',
        effect: 'Anxiolytic, antidepressant effects; improved negative symptoms of schizophrenia',
        clinicalRelevance: 'Buspirone mechanism; also contributes to actions of many atypical antipsychotics and antidepressants',
        citation: {
          authors: 'Blier P, Ward NM',
          title: 'Is there a role for 5-HT1A agonists in the treatment of depression?',
          journal: 'Biological Psychiatry',
          year: 2003,
          doi: '10.1016/s0006-3223(03)00288-x',
          pmid: '12893107',
        },
      },
      {
        action: 'agonist',
        effect: 'Reduction of anxiety, antidepressant-like effects, sexual dysfunction (at low doses)',
        clinicalRelevance: 'Postsynaptic activation in hippocampus/cortex mediates anxiolytic/AD effects',
        citation: {
          authors: 'Newman-Tancredi A, Martel JC, Assié MB, et al.',
          title: 'Signal transduction and functional selectivity of F15599, a preferential post-synaptic 5-HT1A receptor agonist',
          journal: 'British Journal of Pharmacology',
          year: 2009,
          doi: '10.1111/j.1476-5381.2009.00201.x',
          pmid: '19422369',
        },
      },
    ],
  },
  {
    id: 'SERT',
    name: 'Serotonin Transporter',
    aliases: ['SERT', 'SLC6A4', '5-HTT'],
    neurotransmitter: 'Serotonin',
    system: 'Serotonergic',
    description:
      'Membrane transporter responsible for reuptake of serotonin from the synapse. The primary target of SSRIs and SNRIs.',
    behavioralEffects: [
      {
        action: 'reuptake_inhibitor',
        effect: 'Antidepressant, anxiolytic, anti-OCD effects; initial anxiety and sexual dysfunction',
        clinicalRelevance: 'Increased synaptic serotonin; delayed onset of therapeutic effect (2–4 weeks) due to autoreceptor desensitization',
        citation: {
          authors: 'Cipriani A, Furukawa TA, Salanti G, et al.',
          title: 'Comparative efficacy and acceptability of 21 antidepressant drugs for the acute treatment of adults with major depressive disorder: a systematic review and network meta-analysis',
          journal: 'The Lancet',
          year: 2018,
          doi: '10.1016/S0140-6736(17)32802-7',
          pmid: '29477251',
        },
      },
    ],
  },
  {
    id: 'NET',
    name: 'Norepinephrine Transporter',
    aliases: ['NET', 'SLC6A2', 'NAT'],
    neurotransmitter: 'Norepinephrine',
    system: 'Noradrenergic',
    description:
      'Membrane transporter for norepinephrine reuptake. Target of SNRIs, TCAs, and stimulants. Contributes to antidepressant, anxiolytic, and pro-cognitive effects.',
    behavioralEffects: [
      {
        action: 'reuptake_inhibitor',
        effect: 'Antidepressant, improved concentration and energy, pain relief',
        clinicalRelevance: 'NE reuptake inhibition contributes to antidepressant effect, pain modulation, and ADHD treatment',
        citation: {
          authors: 'Stahl SM, Grady MM',
          title: 'A critical review of atypical antipsychotic residual affective symptoms in bipolar disorder and schizophrenia: time to set a new standard for tolerability?',
          journal: 'Journal of Clinical Psychiatry',
          year: 2004,
          pmid: '15554774',
        },
      },
    ],
  },
  {
    id: 'DAT',
    name: 'Dopamine Transporter',
    aliases: ['DAT', 'SLC6A3'],
    neurotransmitter: 'Dopamine',
    system: 'Dopaminergic',
    description:
      'Membrane transporter for dopamine reuptake. Target of stimulants. Blockade increases synaptic DA, producing pro-cognitive and reinforcing effects.',
    behavioralEffects: [
      {
        action: 'reuptake_inhibitor',
        effect: 'Improved attention, increased motivation, euphoria at high doses, addiction potential',
        clinicalRelevance: 'Primary mechanism of stimulants for ADHD; high-affinity rapid blockade associated with abuse potential',
        citation: {
          authors: 'Volkow ND, Wang GJ, Fowler JS, et al.',
          title: 'Dopamine transporter occupancies in the human brain induced by therapeutic doses of oral methylphenidate',
          journal: 'American Journal of Psychiatry',
          year: 1998,
          doi: '10.1176/ajp.155.10.1325',
          pmid: '9766762',
        },
      },
    ],
  },
  {
    id: 'GABA_A',
    name: 'GABA-A Receptor',
    aliases: ['GABA-A', 'GABRA', 'GABAR'],
    neurotransmitter: 'GABA',
    system: 'GABAergic',
    description:
      'Ionotropic Cl⁻ channel receptor. The main inhibitory receptor in the brain. Benzodiazepines act as positive allosteric modulators at the benzodiazepine binding site.',
    behavioralEffects: [
      {
        action: 'allosteric_modulator',
        effect: 'Anxiolytic, sedative, anticonvulsant, muscle relaxant, amnestic effects',
        clinicalRelevance: 'Positive allosteric modulation (PAM) by benzodiazepines increases Cl⁻ current frequency',
        citation: {
          authors: 'Möhler H, Fritschy JM, Rudolph U',
          title: 'A new benzodiazepine pharmacology',
          journal: 'Journal of Pharmacology and Experimental Therapeutics',
          year: 2002,
          pmid: '11782434',
        },
      },
    ],
  },
  {
    id: 'NMDA',
    name: 'NMDA Receptor',
    aliases: ['NMDA', 'NMDAR', 'NR1'],
    neurotransmitter: 'Glutamate',
    system: 'Glutamatergic',
    description:
      'Ionotropic glutamate receptor permeable to Ca²⁺. Involved in synaptic plasticity, learning, and memory. Hypofunction is implicated in schizophrenia; over-activation in excitotoxicity.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Dissociative anesthesia/analgesia, psychotomimetic effects, antidepressant effects',
        clinicalRelevance: 'Ketamine/esketamine mechanism for treatment-resistant depression; also models schizophrenia',
        citation: {
          authors: 'Zarate CA, Singh JB, Carlson PJ, et al.',
          title: 'A randomized trial of an N-methyl-D-aspartate antagonist in treatment-resistant major depression',
          journal: 'Archives of General Psychiatry',
          year: 2006,
          doi: '10.1001/archpsyc.63.8.856',
          pmid: '16894061',
        },
      },
    ],
  },
  {
    id: 'H1',
    name: 'Histamine H1 Receptor',
    aliases: ['H1', 'HRH1'],
    neurotransmitter: 'Histamine',
    system: 'Histaminergic',
    description:
      'Gq-coupled receptor in brain, mediating arousal and wakefulness. Blockade causes sedation and weight gain.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Sedation, weight gain, drowsiness',
        clinicalRelevance: 'Common side effect of many antipsychotics and antidepressants; useful for insomnia in some contexts',
        citation: {
          authors: 'Kroeze WK, Hufeisen SJ, Popadak BA, et al.',
          title: 'H1-histamine receptor affinity predicts short-term weight gain for typical and atypical antipsychotic drugs',
          journal: 'Neuropsychopharmacology',
          year: 2003,
          doi: '10.1038/sj.npp.1300027',
          pmid: '12700715',
        },
      },
    ],
  },
  {
    id: 'M1',
    name: 'Muscarinic M1 Receptor',
    aliases: ['M1', 'CHRM1', 'mAChR1'],
    neurotransmitter: 'Acetylcholine',
    system: 'Cholinergic',
    description:
      'Gq-coupled muscarinic receptor in cortex and hippocampus. Important for memory and cognition. Blockade causes anticholinergic side effects.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Memory impairment, confusion, dry mouth, urinary retention, constipation, blurred vision',
        clinicalRelevance: 'Anticholinergic side effects of TCAs and some antipsychotics; important for elderly patients',
        citation: {
          authors: 'Minzenberg MJ, Poole JH, Benton C, Vinogradov S',
          title: 'Association of anticholinergic load with impairment of complex attention and memory in schizophrenia',
          journal: 'American Journal of Psychiatry',
          year: 2004,
          doi: '10.1176/appi.ajp.161.1.116',
          pmid: '14702260',
        },
      },
    ],
  },
  {
    id: 'alpha1',
    name: 'Alpha-1 Adrenergic Receptor',
    aliases: ['α1', 'ADRA1'],
    neurotransmitter: 'Norepinephrine',
    system: 'Noradrenergic',
    description:
      'Gq-coupled receptor in vasculature, brain, and spinal cord. Blockade causes orthostatic hypotension and sedation.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Orthostatic hypotension, sedation, dizziness, reflex tachycardia',
        clinicalRelevance: 'Common with many antipsychotics and TCAs; requires fall precautions especially in elderly',
        citation: {
          authors: 'Barnett AA',
          title: 'Prazosin: a clinical overview',
          journal: 'Drugs',
          year: 1991,
          pmid: '1718271',
        },
      },
    ],
  },
  {
    id: 'alpha2',
    name: 'Alpha-2 Adrenergic Receptor',
    aliases: ['α2', 'ADRA2', 'Alpha-2 autoreceptor'],
    neurotransmitter: 'Norepinephrine',
    system: 'Noradrenergic',
    description:
      'Gi-coupled autoreceptor and heteroreceptor. Presynaptic alpha-2 inhibits NE and 5-HT release. Blockade increases NE and serotonin release.',
    behavioralEffects: [
      {
        action: 'antagonist',
        effect: 'Increased NE and 5-HT release → antidepressant effects; sedation',
        clinicalRelevance: 'Mirtazapine mechanism; disinhibits NE and 5-HT release in cortex and limbic system',
        citation: {
          authors: 'de Boer T',
          title: 'The pharmacologic profile of mirtazapine',
          journal: 'Journal of Clinical Psychiatry',
          year: 1996,
          pmid: '8649967',
        },
      },
      {
        action: 'agonist',
        effect: 'Sedation, hypotension, reduced PTSD nightmares',
        clinicalRelevance: 'Clonidine and guanfacine mechanism for PTSD, ADHD, and hypertension',
        citation: {
          authors: 'Arnsten AF, Raskind MA, Taylor FB, Connor DF',
          title: 'The effects of stress exposure on prefrontal cortex: Translating basic research into successful treatments for post-traumatic stress disorder',
          journal: 'Neurobiology of Stress',
          year: 2015,
          doi: '10.1016/j.ynstr.2014.10.002',
          pmid: '25530050',
        },
      },
    ],
  },
  {
    id: 'sigma1',
    name: 'Sigma-1 Receptor',
    aliases: ['σ1', 'SIGMAR1', 'Sigma-1'],
    neurotransmitter: 'Endogenous ligands (neurosteroids, DMT)',
    system: 'Sigma',
    description:
      'Chaperone protein at ER-mitochondria junction. Modulates ion channels, NMDA receptors, and neuroplasticity. Relevant to antidepressant and antipsychotic effects.',
    behavioralEffects: [
      {
        action: 'agonist',
        effect: 'Neuroprotection, antidepressant effects, cognitive enhancement',
        clinicalRelevance: 'Fluvoxamine and some antipsychotics bind sigma-1; may contribute to antidepressant efficacy',
        citation: {
          authors: 'Hashimoto K',
          title: 'Sigma-1 receptor chaperone and brain-derived neurotrophic factor: emerging links between cardiovascular disease and depression',
          journal: 'Progress in Neurobiology',
          year: 2013,
          doi: '10.1016/j.pneurobio.2013.10.001',
          pmid: '24144614',
        },
      },
    ],
  },
];

// ─── Drugs ────────────────────────────────────────────────────────────────────

export const drugs: Drug[] = [
  // ── Typical Antipsychotics ─────────────────────────────────────────────────
  {
    id: 'haloperidol',
    name: 'Haloperidol',
    brandNames: ['Haldol'],
    drugClass: 'Typical Antipsychotic (1st generation)',
    indications: ['Schizophrenia', 'Acute agitation', 'Tourette syndrome', 'Delirium'],
    mechanismSummary:
      'Potent D2 antagonist. High D2 occupancy causes antipsychotic efficacy but also significant EPS and tardive dyskinesia risk. Minimal 5-HT2A activity.',
    receptorBindings: [
      {
        receptorId: 'D2',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Primary antipsychotic mechanism; D2 Ki ~1 nM. >80% occupancy causes EPS.',
        citation: {
          authors: 'Seeman P',
          title: 'Dopamine receptors and the dopamine hypothesis of schizophrenia',
          journal: 'Synapse',
          year: 1987,
          doi: '10.1002/syn.890010304',
          pmid: '2905529',
        },
      },
      {
        receptorId: 'alpha1',
        action: 'antagonist',
        affinity: 'medium',
        clinicalRelevance: 'Contributes to orthostatic hypotension',
        citation: {
          authors: 'Richelson E, Souder T',
          title: 'Binding of antipsychotic drugs to human brain receptors: focus on newer generation compounds',
          journal: 'Life Sciences',
          year: 2000,
          doi: '10.1016/s0024-3205(00)00887-5',
          pmid: '11077562',
        },
      },
      {
        receptorId: 'sigma1',
        action: 'antagonist',
        affinity: 'medium',
        clinicalRelevance: 'May contribute to dysphoric side effects',
        citation: {
          authors: 'Sharkey J, Serafinowska HT, Bocking S, et al.',
          title: 'Sigma binding sites in the human central nervous system: autoradiographic detection using [3H](+)SKF10,047',
          journal: 'Neuroscience',
          year: 1988,
          pmid: '2843010',
        },
      },
    ],
  },
  {
    id: 'chlorpromazine',
    name: 'Chlorpromazine',
    brandNames: ['Thorazine'],
    drugClass: 'Typical Antipsychotic (1st generation)',
    indications: ['Schizophrenia', 'Hiccups', 'Nausea', 'Porphyria'],
    mechanismSummary:
      'First antipsychotic; broad receptor antagonism including D2, H1, M1, α1. Lower potency at D2 than haloperidol, causing less EPS but more sedation and anticholinergic effects.',
    receptorBindings: [
      {
        receptorId: 'D2',
        action: 'antagonist',
        affinity: 'medium',
        clinicalRelevance: 'Primary antipsychotic mechanism',
        citation: {
          authors: 'Seeman P',
          title: 'Dopamine receptors and the dopamine hypothesis of schizophrenia',
          journal: 'Synapse',
          year: 1987,
          pmid: '2905529',
        },
      },
      {
        receptorId: 'H1',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Major cause of sedation and weight gain',
        citation: {
          authors: 'Kroeze WK, Hufeisen SJ, Popadak BA, et al.',
          title: 'H1-histamine receptor affinity predicts short-term weight gain for typical and atypical antipsychotic drugs',
          journal: 'Neuropsychopharmacology',
          year: 2003,
          doi: '10.1038/sj.npp.1300027',
          pmid: '12700715',
        },
      },
      {
        receptorId: 'M1',
        action: 'antagonist',
        affinity: 'medium',
        clinicalRelevance: 'Anticholinergic side effects (dry mouth, urinary retention)',
        citation: {
          authors: 'Richelson E, Souder T',
          title: 'Binding of antipsychotic drugs to human brain receptors',
          journal: 'Life Sciences',
          year: 2000,
          doi: '10.1016/s0024-3205(00)00887-5',
          pmid: '11077562',
        },
      },
      {
        receptorId: 'alpha1',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Significant orthostatic hypotension',
        citation: {
          authors: 'Richelson E, Souder T',
          title: 'Binding of antipsychotic drugs to human brain receptors',
          journal: 'Life Sciences',
          year: 2000,
          doi: '10.1016/s0024-3205(00)00887-5',
          pmid: '11077562',
        },
      },
    ],
  },

  // ── Atypical Antipsychotics ────────────────────────────────────────────────
  {
    id: 'clozapine',
    name: 'Clozapine',
    brandNames: ['Clozaril', 'FazaClo'],
    drugClass: 'Atypical Antipsychotic (2nd generation)',
    indications: ['Treatment-resistant schizophrenia', 'Suicidality in schizophrenia'],
    mechanismSummary:
      'Unique "loose binding" at D2 (fast dissociation), combined with strong 5-HT2A, H1, M1, and α antagonism. Superior efficacy for treatment-resistant cases but requires monitoring for agranulocytosis.',
    receptorBindings: [
      {
        receptorId: 'D2',
        action: 'antagonist',
        affinity: 'low',
        clinicalRelevance: 'Fast-off kinetics at D2 = low EPS risk despite antipsychotic efficacy',
        citation: {
          authors: 'Kapur S, Seeman P',
          title: 'Does fast dissociation from the dopamine D2 receptor explain the action of atypical antipsychotics?: A new hypothesis',
          journal: 'American Journal of Psychiatry',
          year: 2001,
          doi: '10.1176/appi.ajp.158.3.360',
          pmid: '11229973',
        },
      },
      {
        receptorId: '5HT2A',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Reduces negative/cognitive symptoms; disinhibits mesocortical DA',
        citation: {
          authors: 'Meltzer HY',
          title: 'The role of serotonin in antipsychotic drug action',
          journal: 'Neuropsychopharmacology',
          year: 1999,
          doi: '10.1016/S0893-133X(99)00096-9',
          pmid: '10619599',
        },
      },
      {
        receptorId: '5HT2C',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Major contributor to weight gain and metabolic syndrome',
        citation: {
          authors: 'Reynolds GP, Hill MJ, Kirk SL',
          title: 'The 5-HT2C receptor and antipsychoticinduced weight gain',
          journal: 'European Psychiatry',
          year: 2006,
          pmid: '16143233',
        },
      },
      {
        receptorId: 'H1',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Sedation; also contributes to weight gain',
        citation: {
          authors: 'Kroeze WK, Hufeisen SJ, Popadak BA, et al.',
          title: 'H1-histamine receptor affinity predicts short-term weight gain for typical and atypical antipsychotic drugs',
          journal: 'Neuropsychopharmacology',
          year: 2003,
          doi: '10.1038/sj.npp.1300027',
          pmid: '12700715',
        },
      },
      {
        receptorId: 'M1',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Prominent anticholinergic effects; hypersalivation paradoxically via M4',
        citation: {
          authors: 'Richelson E, Souder T',
          title: 'Binding of antipsychotic drugs to human brain receptors',
          journal: 'Life Sciences',
          year: 2000,
          pmid: '11077562',
        },
      },
      {
        receptorId: 'alpha1',
        action: 'antagonist',
        affinity: 'high',
        clinicalRelevance: 'Orthostatic hypotension; contributes to syncope risk',
        citation: {
          authors: 'Richelson E, Souder T',
          title: 'Binding of antipsychotic drugs to human brain receptors',
          journal: 'Life Sciences',
          year: 2000,
          pmid: '11077562',
        },
      },
    ],
  },
  {
    id: 'olanzapine',
    name: 'Olanzapine',
    brandNames: ['Zyprexa'],
    drugClass: 'Atypical Antipsychotic (2nd generation)',
    indications: ['Schizophrenia', 'Bipolar mania', 'Adjunct in depression (with fluoxetine)'],
    mechanismSummary:
      'Structurally similar to clozapine. D2 + 5-HT2A antagonism with additional H1, M1, and α1 blockade. High efficacy but significant metabolic side effects.',
    receptorBindings: [
      { receptorId: 'D2', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Antipsychotic efficacy; moderate EPS risk', citation: { authors: 'Leucht S et al.', title: 'Comparative efficacy and tolerability of 15 antipsychotic drugs', journal: 'The Lancet', year: 2013, doi: '10.1016/S0140-6736(13)60733-3', pmid: '23810019' } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Reduced EPS, improved cognition', citation: { authors: 'Meltzer HY', title: 'The role of serotonin in antipsychotic drug action', journal: 'Neuropsychopharmacology', year: 1999, pmid: '10619599' } },
      { receptorId: '5HT2C', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Major weight gain contributor; worse than most antipsychotics', citation: { authors: 'Reynolds GP et al.', title: 'The 5-HT2C receptor and antipsychotic-induced weight gain', journal: 'European Psychiatry', year: 2006, pmid: '16143233' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Sedation, weight gain', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
      { receptorId: 'M1', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Anticholinergic side effects', citation: { authors: 'Richelson E, Souder T', title: 'Binding of antipsychotic drugs to human brain receptors', journal: 'Life Sciences', year: 2000, pmid: '11077562' } },
    ],
  },
  {
    id: 'risperidone',
    name: 'Risperidone',
    brandNames: ['Risperdal'],
    drugClass: 'Atypical Antipsychotic (2nd generation)',
    indications: ['Schizophrenia', 'Bipolar mania', 'Autism-related irritability'],
    mechanismSummary:
      'Potent D2 and 5-HT2A antagonism. At higher doses acts more like a typical antipsychotic with higher EPS risk. Also has α1/α2, H1 antagonism. Significant prolactin elevation.',
    receptorBindings: [
      { receptorId: 'D2', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Strong D2 blockade; EPS risk increases at doses >6 mg/day', citation: { authors: 'Leucht S et al.', title: 'Comparative efficacy and tolerability of 15 antipsychotic drugs', journal: 'The Lancet', year: 2013, pmid: '23810019' } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Atypical features; reduces EPS at low doses', citation: { authors: 'Meltzer HY', title: 'The role of serotonin in antipsychotic drug action', journal: 'Neuropsychopharmacology', year: 1999, pmid: '10619599' } },
      { receptorId: 'alpha1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Orthostatic hypotension, dizziness', citation: { authors: 'Richelson E, Souder T', title: 'Binding of antipsychotic drugs to human brain receptors', journal: 'Life Sciences', year: 2000, pmid: '11077562' } },
      { receptorId: 'alpha2', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'May enhance NE release; contributes to metabolic effects', citation: { authors: 'Richelson E, Souder T', title: 'Binding of antipsychotic drugs to human brain receptors', journal: 'Life Sciences', year: 2000, pmid: '11077562' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Sedation, weight gain', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
    ],
  },
  {
    id: 'quetiapine',
    name: 'Quetiapine',
    brandNames: ['Seroquel'],
    drugClass: 'Atypical Antipsychotic (2nd generation)',
    indications: ['Schizophrenia', 'Bipolar mania', 'Bipolar depression', 'Adjunct MDD'],
    mechanismSummary:
      'Transient D2 blockade (very fast off), 5-HT2A antagonism, strong H1 and moderate α1 antagonism. At low doses, H1 dominates (sedation). Active metabolite norquetiapine inhibits NET and is a 5-HT2C antagonist.',
    receptorBindings: [
      { receptorId: 'D2', action: 'antagonist', affinity: 'low', clinicalRelevance: 'Very transient D2 blockade = minimal EPS, minimal prolactin elevation', citation: { authors: 'Kapur S, Seeman P', title: 'Does fast dissociation from the dopamine D2 receptor explain atypical antipsychotics?', journal: 'American Journal of Psychiatry', year: 2001, pmid: '11229973' } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Contributes to antidepressant and antipsychotic effects', citation: { authors: 'Meltzer HY', title: 'The role of serotonin in antipsychotic drug action', journal: 'Neuropsychopharmacology', year: 1999, pmid: '10619599' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Dominant at low doses; sedation commonly exploited for insomnia', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
      { receptorId: 'alpha1', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Orthostatic hypotension, especially on initiation', citation: { authors: 'Richelson E, Souder T', title: 'Binding of antipsychotic drugs to human brain receptors', journal: 'Life Sciences', year: 2000, pmid: '11077562' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'medium', clinicalRelevance: 'Norquetiapine metabolite inhibits NET → antidepressant effects in bipolar depression', citation: { authors: 'Jensen NH, Rodriguiz RM, Caron MG, et al.', title: 'N-desalkylquetiapine, a potent norepinephrine reuptake inhibitor and partial 5-HT1A agonist', journal: 'Neuropsychopharmacology', year: 2008, doi: '10.1038/sj.npp.1301646', pmid: '17805310' } },
      { receptorId: '5HT1A', action: 'partial_agonist', affinity: 'medium', clinicalRelevance: 'Norquetiapine partial agonism at 5-HT1A contributes to antidepressant effect', citation: { authors: 'Jensen NH et al.', title: 'N-desalkylquetiapine, a potent norepinephrine reuptake inhibitor', journal: 'Neuropsychopharmacology', year: 2008, pmid: '17805310' } },
    ],
  },
  {
    id: 'aripiprazole',
    name: 'Aripiprazole',
    brandNames: ['Abilify'],
    drugClass: 'Atypical Antipsychotic (3rd generation / Dopamine Partial Agonist)',
    indications: ['Schizophrenia', 'Bipolar mania', 'Adjunct MDD', 'Tourette syndrome', 'Autism irritability'],
    mechanismSummary:
      'Unique dopamine system stabilizer: partial agonist at D2 and D3, partial agonist at 5-HT1A, antagonist at 5-HT2A. Acts as functional antagonist when dopamine is high, and agonist when dopamine is low.',
    receptorBindings: [
      { receptorId: 'D2', action: 'partial_agonist', affinity: 'high', clinicalRelevance: 'Stabilizes DA tone; low EPS, low prolactin elevation, weight-neutral', citation: { authors: 'Stahl SM', title: 'Dopamine system stabilizers, aripiprazole, and the next generation of antipsychotics', journal: 'Journal of Clinical Psychiatry', year: 2001, pmid: '11843961' } },
      { receptorId: '5HT1A', action: 'partial_agonist', affinity: 'high', clinicalRelevance: 'Anxiolytic, antidepressant properties; enhances DA in PFC', citation: { authors: 'Shapiro DA et al.', title: 'Aripiprazole, a novel atypical antipsychotic drug with a unique and robust pharmacology', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12629531' } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Atypical features, cognitive improvement', citation: { authors: 'Shapiro DA et al.', title: 'Aripiprazole pharmacology', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12629531' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'low', clinicalRelevance: 'Minimal sedation; weight-neutral profile', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
    ],
  },
  {
    id: 'lurasidone',
    name: 'Lurasidone',
    brandNames: ['Latuda'],
    drugClass: 'Atypical Antipsychotic (2nd generation)',
    indications: ['Schizophrenia', 'Bipolar depression'],
    mechanismSummary:
      'Potent D2 and 5-HT2A antagonism, 5-HT7 antagonism (possibly pro-cognitive), 5-HT1A partial agonism. Low metabolic burden; requires food for absorption.',
    receptorBindings: [
      { receptorId: 'D2', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Antipsychotic efficacy', citation: { authors: 'Meyer JM', title: 'Pharmacotherapy of psychosis and mania', journal: 'Goodman & Gilman\'s Pharmacology', year: 2012 } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Atypical features, reduced EPS', citation: { authors: 'Meltzer HY', title: 'The role of serotonin in antipsychotic drug action', journal: 'Neuropsychopharmacology', year: 1999, pmid: '10619599' } },
      { receptorId: '5HT1A', action: 'partial_agonist', affinity: 'medium', clinicalRelevance: 'Antidepressant effects relevant in bipolar depression', citation: { authors: 'Citrome L', title: 'Lurasidone for schizophrenia: a review of the efficacy and safety profile for this newly approved second-generation antipsychotic', journal: 'International Journal of Clinical Practice', year: 2011, pmid: '22112009' } },
      { receptorId: 'alpha2', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'May enhance NE/5-HT release', citation: { authors: 'Citrome L', title: 'Lurasidone for schizophrenia', journal: 'International Journal of Clinical Practice', year: 2011, pmid: '22112009' } },
    ],
  },

  // ── SSRIs ──────────────────────────────────────────────────────────────────
  {
    id: 'fluoxetine',
    name: 'Fluoxetine',
    brandNames: ['Prozac', 'Sarafem'],
    drugClass: 'SSRI (Selective Serotonin Reuptake Inhibitor)',
    indications: ['MDD', 'OCD', 'Bulimia', 'Panic disorder', 'PMDD', 'Bipolar depression (with olanzapine)'],
    mechanismSummary:
      'Potent SERT inhibitor, longest half-life SSRI (2–6 days; active metabolite norfluoxetine ~1–2 weeks). Also a sigma-1 agonist and mild 5-HT2C antagonist.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Primary mechanism; increases synaptic serotonin → antidepressant after 2–4 weeks', citation: { authors: 'Cipriani A et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs', journal: 'The Lancet', year: 2018, pmid: '29477251' } },
      { receptorId: '5HT2C', action: 'antagonist', affinity: 'low', clinicalRelevance: 'May contribute to antidepressant/weight-neutral profile', citation: { authors: 'Stahl SM', title: 'Essential Psychopharmacology', journal: 'Cambridge University Press', year: 2021 } },
      { receptorId: 'sigma1', action: 'agonist', affinity: 'low', clinicalRelevance: 'May contribute to antidepressant effects and neuroprotection', citation: { authors: 'Hashimoto K', title: 'Sigma-1 receptor chaperone and brain-derived neurotrophic factor', journal: 'Progress in Neurobiology', year: 2013, pmid: '24144614' } },
    ],
  },
  {
    id: 'sertraline',
    name: 'Sertraline',
    brandNames: ['Zoloft'],
    drugClass: 'SSRI (Selective Serotonin Reuptake Inhibitor)',
    indications: ['MDD', 'PTSD', 'OCD', 'Panic disorder', 'Social anxiety', 'PMDD'],
    mechanismSummary:
      'Potent SERT inhibitor, mild DAT inhibitor, sigma-1 agonist. Most studied SSRI; often first-line due to tolerability and safety profile.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Primary antidepressant mechanism', citation: { authors: 'Cipriani A et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs', journal: 'The Lancet', year: 2018, pmid: '29477251' } },
      { receptorId: 'DAT', action: 'reuptake_inhibitor', affinity: 'low', clinicalRelevance: 'Mild DA augmentation; may contribute to energy and motivation effects', citation: { authors: 'Owens MJ et al.', title: 'Neurotransmitter receptor and transporter binding profile of antidepressants and their metabolites', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 1997, pmid: '9356068' } },
      { receptorId: 'sigma1', action: 'agonist', affinity: 'medium', clinicalRelevance: 'Among highest sigma-1 affinity of SSRIs; may enhance neuroprotection', citation: { authors: 'Hashimoto K', title: 'Sigma-1 receptor chaperone', journal: 'Progress in Neurobiology', year: 2013, pmid: '24144614' } },
    ],
  },
  {
    id: 'escitalopram',
    name: 'Escitalopram',
    brandNames: ['Lexapro'],
    drugClass: 'SSRI (Selective Serotonin Reuptake Inhibitor)',
    indications: ['MDD', 'GAD'],
    mechanismSummary:
      'S-enantiomer of citalopram. Most selective SERT inhibitor; fewest drug interactions; allosteric SERT binding site modulation increases efficacy.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Highest SERT selectivity of SSRIs; allosteric site binding boosts serotonergic action', citation: { authors: 'Cipriani A et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs', journal: 'The Lancet', year: 2018, pmid: '29477251' } },
    ],
  },

  // ── SNRIs ──────────────────────────────────────────────────────────────────
  {
    id: 'venlafaxine',
    name: 'Venlafaxine',
    brandNames: ['Effexor'],
    drugClass: 'SNRI (Serotonin-Norepinephrine Reuptake Inhibitor)',
    indications: ['MDD', 'GAD', 'Panic disorder', 'Social anxiety', 'PTSD'],
    mechanismSummary:
      'Dose-dependent SERT and NET inhibition. At low doses, primarily SERT inhibitor; at higher doses (≥150 mg) significant NET inhibition adds noradrenergic effects.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Dominant at lower doses (≤75 mg)', citation: { authors: 'Cipriani A et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs', journal: 'The Lancet', year: 2018, pmid: '29477251' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'medium', clinicalRelevance: 'Significant at ≥150 mg; adds NE effects: energy, concentration, pain relief', citation: { authors: 'Stahl SM et al.', title: 'A review of the neuropharmacology of bupropion', journal: 'Primary Care Companion Journal of Clinical Psychiatry', year: 2004, pmid: '15213793' } },
    ],
  },
  {
    id: 'duloxetine',
    name: 'Duloxetine',
    brandNames: ['Cymbalta'],
    drugClass: 'SNRI (Serotonin-Norepinephrine Reuptake Inhibitor)',
    indications: ['MDD', 'GAD', 'Diabetic peripheral neuropathy', 'Fibromyalgia', 'Stress urinary incontinence'],
    mechanismSummary:
      'Balanced SERT and NET inhibition across all doses (unlike venlafaxine). Effective for mood and pain; approved for multiple pain conditions.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Antidepressant and anxiolytic effects', citation: { authors: 'Cipriani A et al.', title: 'Comparative efficacy and acceptability of 21 antidepressant drugs', journal: 'The Lancet', year: 2018, pmid: '29477251' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Balanced NE reuptake inhibition; pain modulation via descending NE pathways', citation: { authors: 'Raskin J et al.', title: 'A double-blind, randomized multicenter trial comparing duloxetine with placebo in the management of diabetic peripheral neuropathic pain', journal: 'Pain Medicine', year: 2005, pmid: '16266355' } },
    ],
  },

  // ── Other Antidepressants ──────────────────────────────────────────────────
  {
    id: 'bupropion',
    name: 'Bupropion',
    brandNames: ['Wellbutrin', 'Zyban', 'Aplenzin'],
    drugClass: 'NDRI (Norepinephrine-Dopamine Reuptake Inhibitor)',
    indications: ['MDD', 'Seasonal affective disorder', 'Smoking cessation', 'ADHD (off-label)'],
    mechanismSummary:
      'Inhibits NET and DAT; no serotonergic activity. Weight-neutral/weight loss; low sexual side effects; lowers seizure threshold at high doses.',
    receptorBindings: [
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'medium', clinicalRelevance: 'Contributes to antidepressant effects and smoking cessation', citation: { authors: 'Stahl SM et al.', title: 'A review of the neuropharmacology of bupropion', journal: 'Primary Care Companion Journal of Clinical Psychiatry', year: 2004, pmid: '15213793' } },
      { receptorId: 'DAT', action: 'reuptake_inhibitor', affinity: 'medium', clinicalRelevance: 'Pro-motivational, pro-energizing effects; contributes to reduced craving in smoking cessation', citation: { authors: 'Stahl SM et al.', title: 'A review of the neuropharmacology of bupropion', journal: 'Primary Care Companion Journal of Clinical Psychiatry', year: 2004, pmid: '15213793' } },
    ],
  },
  {
    id: 'mirtazapine',
    name: 'Mirtazapine',
    brandNames: ['Remeron'],
    drugClass: 'NaSSA (Noradrenergic and Specific Serotonergic Antidepressant)',
    indications: ['MDD', 'Anxiety disorders', 'Insomnia', 'PTSD (off-label)', 'Appetite stimulation'],
    mechanismSummary:
      'α2 antagonism disinhibits NE and 5-HT release. 5-HT2A, 5-HT2C, 5-HT3 antagonism channels serotonin to 5-HT1A receptors. Strong H1 antagonism causes sedation (more at lower doses). Significant weight gain.',
    receptorBindings: [
      { receptorId: 'alpha2', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Core mechanism: disinhibits NE and 5-HT release from raphe/locus coeruleus', citation: { authors: 'de Boer T', title: 'The pharmacologic profile of mirtazapine', journal: 'Journal of Clinical Psychiatry', year: 1996, pmid: '8649967' } },
      { receptorId: '5HT2A', action: 'antagonist', affinity: 'medium', clinicalRelevance: 'Helps antidepressant effects; channels 5-HT to 5-HT1A', citation: { authors: 'Stahl SM', title: 'Essential Psychopharmacology', journal: 'Cambridge University Press', year: 2021 } },
      { receptorId: '5HT2C', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Major contributor to appetite stimulation and weight gain', citation: { authors: 'Tecott LH et al.', title: 'Eating disorder and epilepsy in mice lacking 5-HT2c receptors', journal: 'Nature', year: 1995, pmid: '7700379' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Potent sedation; paradoxically MORE sedating at 7.5–15 mg than at 30+ mg', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
    ],
  },

  // ── TCAs ───────────────────────────────────────────────────────────────────
  {
    id: 'amitriptyline',
    name: 'Amitriptyline',
    brandNames: ['Elavil'],
    drugClass: 'TCA (Tricyclic Antidepressant)',
    indications: ['MDD', 'Neuropathic pain', 'Migraine prophylaxis', 'Insomnia', 'Fibromyalgia'],
    mechanismSummary:
      'Broad-spectrum TCA: inhibits SERT, NET; antagonizes H1, M1, α1; sodium channel blockade. Effective but poorly tolerated; lethality in overdose.',
    receptorBindings: [
      { receptorId: 'SERT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Antidepressant mechanism; serotonin augmentation', citation: { authors: 'Owens MJ et al.', title: 'Neurotransmitter receptor and transporter binding profile of antidepressants', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 1997, pmid: '9356068' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'NE augmentation; contributes to pain relief and antidepressant effect', citation: { authors: 'Owens MJ et al.', title: 'Neurotransmitter receptor and transporter binding profile of antidepressants', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 1997, pmid: '9356068' } },
      { receptorId: 'H1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Sedation; useful for insomnia and neuropathic pain', citation: { authors: 'Kroeze WK et al.', title: 'H1-histamine receptor affinity predicts short-term weight gain', journal: 'Neuropsychopharmacology', year: 2003, pmid: '12700715' } },
      { receptorId: 'M1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Anticholinergic: dry mouth, constipation, urinary retention, confusion', citation: { authors: 'Minzenberg MJ et al.', title: 'Association of anticholinergic load with impairment', journal: 'American Journal of Psychiatry', year: 2004, pmid: '14702260' } },
      { receptorId: 'alpha1', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Orthostatic hypotension; falls risk', citation: { authors: 'Richelson E, Souder T', title: 'Binding of antipsychotic drugs to human brain receptors', journal: 'Life Sciences', year: 2000, pmid: '11077562' } },
    ],
  },

  // ── Mood Stabilizers ───────────────────────────────────────────────────────
  {
    id: 'lithium',
    name: 'Lithium',
    brandNames: ['Eskalith', 'Lithobid'],
    drugClass: 'Mood Stabilizer',
    indications: ['Bipolar disorder (manic and depressive episodes)', 'Augmentation of antidepressants', 'Suicidality reduction'],
    mechanismSummary:
      'Inhibits inositol monophosphatase and GSK-3β (glycogen synthase kinase-3β). Modulates serotonin, dopamine, and glutamate neurotransmission. Enhances 5-HT1A receptor activity. Narrow therapeutic index (0.6–1.2 mEq/L).',
    receptorBindings: [
      { receptorId: '5HT1A', action: 'agonist', affinity: 'medium', clinicalRelevance: 'Enhances 5-HT1A sensitivity; contributes to anti-suicidal and antidepressant effects', citation: { authors: 'Blier P, de Montigny C', title: 'Short-term lithium administration enhances serotonergic neurotransmission', journal: 'Synapse', year: 1985, pmid: '2868044' } },
      { receptorId: 'D2', action: 'antagonist', affinity: 'low', clinicalRelevance: 'Mild D2 reduction may contribute to antimanic effects', citation: { authors: 'Treiser SL et al.', title: 'Lithium increases serotonin release and decreases serotonin receptors in the hippocampus', journal: 'Science', year: 1981, pmid: '6261087' } },
    ],
  },

  // ── Benzodiazepines ────────────────────────────────────────────────────────
  {
    id: 'diazepam',
    name: 'Diazepam',
    brandNames: ['Valium'],
    drugClass: 'Benzodiazepine',
    indications: ['Anxiety disorders', 'Alcohol withdrawal', 'Seizures', 'Muscle spasms', 'Procedural sedation'],
    mechanismSummary:
      'Positive allosteric modulator at GABA-A receptor at benzodiazepine binding site. Increases frequency of Cl⁻ channel opening. Long-acting with active metabolites.',
    receptorBindings: [
      { receptorId: 'GABA_A', action: 'allosteric_modulator', affinity: 'high', clinicalRelevance: 'Anxiolytic, anticonvulsant, muscle relaxant, sedative effects; dependence and tolerance with chronic use', citation: { authors: 'Möhler H et al.', title: 'A new benzodiazepine pharmacology', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 2002, pmid: '11782434' } },
    ],
  },
  {
    id: 'lorazepam',
    name: 'Lorazepam',
    brandNames: ['Ativan'],
    drugClass: 'Benzodiazepine',
    indications: ['Anxiety', 'Acute agitation', 'Status epilepticus', 'Alcohol withdrawal', 'Preoperative sedation'],
    mechanismSummary:
      'GABA-A positive allosteric modulator. Intermediate half-life (~12 hours), no active metabolites, making it preferable in hepatic impairment and elderly patients.',
    receptorBindings: [
      { receptorId: 'GABA_A', action: 'allosteric_modulator', affinity: 'high', clinicalRelevance: 'Rapid anxiolytic and anticonvulsant; no active metabolites advantageous in elderly', citation: { authors: 'Möhler H et al.', title: 'A new benzodiazepine pharmacology', journal: 'Journal of Pharmacology and Experimental Therapeutics', year: 2002, pmid: '11782434' } },
    ],
  },

  // ── Stimulants ─────────────────────────────────────────────────────────────
  {
    id: 'methylphenidate',
    name: 'Methylphenidate',
    brandNames: ['Ritalin', 'Concerta', 'Focalin'],
    drugClass: 'Stimulant (ADHD Medication)',
    indications: ['ADHD', 'Narcolepsy'],
    mechanismSummary:
      'Blocks DAT and NET, increasing synaptic DA and NE. Improves attention and executive function via PFC NE/DA circuits. Lower abuse potential than amphetamine when used as prescribed.',
    receptorBindings: [
      { receptorId: 'DAT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Increases synaptic DA in striatum and PFC → attention and motivation', citation: { authors: 'Volkow ND et al.', title: 'Dopamine transporter occupancies in the human brain', journal: 'American Journal of Psychiatry', year: 1998, pmid: '9766762' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Increases NE in PFC → improves working memory and executive function', citation: { authors: 'Arnsten AF', title: 'Stimulants: therapeutic actions in ADHD', journal: 'Neuropsychopharmacology', year: 2006, doi: '10.1038/sj.npp.1300967', pmid: '16688173' } },
    ],
  },
  {
    id: 'amphetamine',
    name: 'Amphetamine / d-Amphetamine',
    brandNames: ['Adderall', 'Dexedrine', 'Vyvanse (lisdexamfetamine)'],
    drugClass: 'Stimulant (ADHD Medication)',
    indications: ['ADHD', 'Narcolepsy', 'Binge eating disorder (lisdexamfetamine)'],
    mechanismSummary:
      'Releases DA, NE, and 5-HT from terminals (reverse transport via DAT/NET/SERT) in addition to reuptake inhibition. More potent and longer-acting than methylphenidate.',
    receptorBindings: [
      { receptorId: 'DAT', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Reverses DAT: releases DA → improved attention; higher abuse potential than MPH', citation: { authors: 'Sulzer D et al.', title: 'Mechanisms of neurotransmitter release by amphetamines', journal: 'Progress in Neurobiology', year: 2005, doi: '10.1016/j.pneurobio.2004.10.001', pmid: '15716481' } },
      { receptorId: 'NET', action: 'reuptake_inhibitor', affinity: 'high', clinicalRelevance: 'Reverses NET: releases NE → improved executive function and focus', citation: { authors: 'Sulzer D et al.', title: 'Mechanisms of neurotransmitter release by amphetamines', journal: 'Progress in Neurobiology', year: 2005, pmid: '15716481' } },
    ],
  },

  // ── Buspirone ──────────────────────────────────────────────────────────────
  {
    id: 'buspirone',
    name: 'Buspirone',
    brandNames: ['Buspar'],
    drugClass: 'Anxiolytic (Non-Benzodiazepine)',
    indications: ['GAD', 'Augmentation of SSRIs/SNRIs'],
    mechanismSummary:
      '5-HT1A partial agonist (postsynaptic > presynaptic). Delayed onset (2–4 weeks); no dependence, tolerance, or abuse potential. Also weak D2 partial agonism.',
    receptorBindings: [
      { receptorId: '5HT1A', action: 'partial_agonist', affinity: 'high', clinicalRelevance: 'Primary anxiolytic mechanism; initial presynaptic agonism reduces 5-HT then postsynaptic downregulation normalizes anxiety', citation: { authors: 'Blier P, Ward NM', title: 'Is there a role for 5-HT1A agonists in the treatment of depression?', journal: 'Biological Psychiatry', year: 2003, pmid: '12893107' } },
      { receptorId: 'D2', action: 'partial_agonist', affinity: 'low', clinicalRelevance: 'May contribute to mild antipsychotic/antidopaminergic effects at high doses', citation: { authors: 'Eison AS, Temple DL Jr', title: 'Buspirone: review of its pharmacology and current perspectives on its mechanism of action', journal: 'American Journal of Medicine', year: 1986, pmid: '2941862' } },
    ],
  },

  // ── Ketamine ───────────────────────────────────────────────────────────────
  {
    id: 'esketamine',
    name: 'Esketamine',
    brandNames: ['Spravato'],
    drugClass: 'Glutamate Modulator / Rapid-Acting Antidepressant',
    indications: ['Treatment-resistant MDD', 'MDD with acute suicidality'],
    mechanismSummary:
      'NMDA receptor antagonist; blockade triggers mTOR-mediated synaptogenesis. Rapid antidepressant effect within hours vs. weeks for traditional antidepressants.',
    receptorBindings: [
      { receptorId: 'NMDA', action: 'antagonist', affinity: 'high', clinicalRelevance: 'Rapid (hours) antidepressant onset; triggers BDNF/mTOR/AMPA-mediated synaptogenesis', citation: { authors: 'Zarate CA et al.', title: 'A randomized trial of an N-methyl-D-aspartate antagonist in treatment-resistant major depression', journal: 'Archives of General Psychiatry', year: 2006, doi: '10.1001/archpsyc.63.8.856', pmid: '16894061' } },
      { receptorId: 'sigma1', action: 'agonist', affinity: 'low', clinicalRelevance: 'May contribute to neuroprotective and rapid antidepressant effects', citation: { authors: 'Hashimoto K', title: 'Sigma-1 receptor chaperone', journal: 'Progress in Neurobiology', year: 2013, pmid: '24144614' } },
    ],
  },
];

export function getDrugById(id: string): Drug | undefined {
  return drugs.find((d) => d.id === id);
}

export function getReceptorById(id: string): Receptor | undefined {
  return receptors.find((r) => r.id === id);
}

export function getDrugsForReceptor(receptorId: string): Drug[] {
  return drugs.filter((d) => d.receptorBindings.some((rb) => rb.receptorId === receptorId));
}

export function getReceptorsForDrug(drugId: string): Receptor[] {
  const drug = getDrugById(drugId);
  if (!drug) return [];
  const receptorIds = drug.receptorBindings.map((rb) => rb.receptorId);
  return receptors.filter((r) => receptorIds.includes(r.id));
}
