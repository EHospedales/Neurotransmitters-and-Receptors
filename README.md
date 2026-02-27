# PsychRx — Psychiatric Drug Receptors & Behavior

A web application for psychiatric residents to **visualize**, **explore**, and **quiz** themselves on psychiatric drug receptor pharmacology, backed by peer-reviewed literature.

## Features

### 🔬 Explorer
- Interactive **drug × receptor matrix** showing all key receptor bindings at a glance
- Color-coded action badges (Antagonist, Agonist, Partial Agonist, Reuptake Inhibitor, PAM)
- Affinity indicators (●●● High / ●●○ Medium / ●○○ Low)
- Filter by drug class or search by drug name / brand name
- Additional **CYP enzyme interaction table** (substrates, inhibitors, inducers, notes) for all listed drugs
- Click any **drug row** for a detailed view: indications, mechanism summary, receptor bindings with clinical relevance and citations
- Click any **receptor column** for a detailed view: description, behavioral effects by action type, and all drugs acting on that receptor

### 🎯 Quiz
- Multiple-choice questions generated from the pharmacology database
- Question types: drug class, receptor action, behavioral effect → drug, drug → receptor
- Immediate feedback with detailed explanations and direct links to peer-reviewed citations (DOI / PubMed)
- Progress bar and live score counter
- Quick Quiz (10 Q) or Full Quiz (25 Q) modes

### 📊 Progress
- Tracks questions answered, correct answers, accuracy %, and daily study streak
- **Coverage bars** showing which drugs and receptors have been explored
- **Achievement badges** (10 total) unlocked by milestones: first answer, correct streaks, exploration coverage, accuracy goals
- Quiz history log (last 20 answers with dates)

## Drug Database (49 drugs)

| Class | Drugs |
|---|---|
| Typical Antipsychotics (1st gen) | Haloperidol, Chlorpromazine, Fluphenazine, Perphenazine, Trifluoperazine, Thioridazine, Loxapine |
| Atypical Antipsychotics (2nd gen) | Clozapine, Olanzapine, Risperidone, Quetiapine, Lurasidone, Ziprasidone, Paliperidone, Asenapine, Iloperidone, Amisulpride, Lumateperone |
| Atypical Antipsychotics (2nd gen; Dopamine Partial Agonists) | Aripiprazole, Brexpiprazole, Cariprazine |
| TAAR1 Agonist (Investigational Antipsychotic) | Ulotaront (SEP-363856) |
| SSRIs | Fluoxetine, Sertraline, Escitalopram, Paroxetine, Fluvoxamine |
| SSRI / SPARI | Vilazodone |
| SMS (Serotonin Modulator and Stimulator) | Vortioxetine |
| Melatonergic Antidepressant | Agomelatine |
| 5-HT4 Agonist (Investigational Pro-cognitive) | Prucalopride |
| 5-HT6 Antagonist (Investigational Pro-cognitive) | Idalopirdine (Lu AE58054) |
| SNRIs | Venlafaxine, Duloxetine, Desvenlafaxine |
| NDRI | Bupropion |
| NaSSA | Mirtazapine |
| SARI | Trazodone |
| TCA | Amitriptyline |
| Mood Stabilizers | Lithium, Valproate / Divalproex, Lamotrigine, Carbamazepine, Oxcarbazepine |
| Benzodiazepines | Diazepam, Lorazepam, Clonazepam |
| Stimulants | Methylphenidate, Amphetamine |
| Non-Stimulant ADHD Medication (NRI) | Atomoxetine |
| Anxiolytic | Buspirone |
| Rapid Antidepressant | Esketamine |

## Receptor Database (26 receptors)

D2, D1, D3, TAAR1, 5-HT₂A, 5-HT₂C, 5-HT₁A, 5-HT₁B, 5-HT₁D, 5-HT₃, 5-HT₄, 5-HT₆, 5-HT₇, SERT, NET, DAT, GABA-A, NMDA, MT1, MT2, H1, M1, α1, α2, Sigma-1

## Getting Started

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Share as a Website (GitHub Pages)

This repo is configured to auto-deploy to GitHub Pages using [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml).

1. Push your latest changes to the `main` branch.
2. In GitHub, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow will publish the site after each push to `main`.

Your public URL will be:

`https://<your-github-username>.github.io/Neurotransmitters-and-Receptors/`

Validate citation metadata:
```bash
npm run validate-citations
```

Run optional PubMed title cross-check:
```bash
npm run validate-citations -- --online
```

## Tech Stack
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) build tool
- Plain CSS (no framework)
- `localStorage` for persistent progress tracking

## Disclaimer

PsychRx is a **learning tool for residency education only**. All pharmacology content is based on peer-reviewed literature with citations provided. It is **not intended for clinical use**.
