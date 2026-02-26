# NeuroRx — Psychiatric Drug Receptors & Behavior

A web application for psychiatric residents to **visualize**, **explore**, and **quiz** themselves on psychiatric drug receptor pharmacology, backed by peer-reviewed literature.

## Features

### 🔬 Explorer
- Interactive **drug × receptor matrix** showing all key receptor bindings at a glance
- Color-coded action badges (Antagonist, Agonist, Partial Agonist, Reuptake Inhibitor, PAM)
- Affinity indicators (●●● High / ●●○ Medium / ●○○ Low)
- Filter by drug class or search by drug name / brand name
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

## Drug Database (23 drugs)

| Class | Drugs |
|---|---|
| Typical Antipsychotics | Haloperidol, Chlorpromazine |
| Atypical Antipsychotics (2nd gen) | Clozapine, Olanzapine, Risperidone, Quetiapine, Lurasidone |
| Dopamine Partial Agonist (3rd gen) | Aripiprazole |
| SSRIs | Fluoxetine, Sertraline, Escitalopram |
| SNRIs | Venlafaxine, Duloxetine |
| NDRI | Bupropion |
| NaSSA | Mirtazapine |
| TCA | Amitriptyline |
| Mood Stabilizer | Lithium |
| Benzodiazepines | Diazepam, Lorazepam |
| Stimulants | Methylphenidate, Amphetamine |
| Anxiolytic | Buspirone |
| Rapid Antidepressant | Esketamine |

## Receptor Database (15 receptors)

D2, D1, 5-HT₂A, 5-HT₂C, 5-HT₁A, SERT, NET, DAT, GABA-A, NMDA, H1, M1, α1, α2, Sigma-1

## Getting Started

```bash
npm install
npm run dev
```

Build for production:
```bash
npm run build
```

## Tech Stack
- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) build tool
- Plain CSS (no framework)
- `localStorage` for persistent progress tracking

## Disclaimer

NeuroRx is a **learning tool for residency education only**. All pharmacology content is based on peer-reviewed literature with citations provided. It is **not intended for clinical use**.
