import { useState } from 'react';
import { drugs, receptors } from '../data/database';
import { getCypInteractionProfile } from '../data/cypInteractions';
import ActionBadge from './ActionBadge';
import type { Drug, Receptor } from '../types';
import type { UserProgress } from '../types';
import { markDrugReviewed, markReceptorReviewed, saveProgress } from '../utils/storage';
import { getCitationLinks } from '../utils/citation';

type View = 'matrix' | 'drug' | 'receptor';
type ExplorerTableView = 'receptor' | 'cyp';

interface Props {
  progress: UserProgress;
  setProgress: (p: UserProgress) => void;
}

const DRUG_CLASS_COLORS: Record<string, string> = {
  'Typical Antipsychotic (1st generation)': '#fca5a5',
  'Atypical Antipsychotic (2nd generation)': '#fdba74',
  'Atypical Antipsychotic (3rd generation / Dopamine Partial Agonist)': '#fcd34d',
  'SSRI (Selective Serotonin Reuptake Inhibitor)': '#6ee7b7',
  'SSRI / SPARI (Serotonin Partial Agonist-Reuptake Inhibitor)': '#86efac',
  'SMS (Serotonin Modulator and Stimulator)': '#5eead4',
  'Melatonergic Antidepressant': '#a7f3d0',
  'TAAR1 Agonist (Investigational Antipsychotic)': '#fbcfe8',
  '5-HT4 Agonist (Investigational Pro-cognitive)': '#99f6e4',
  '5-HT6 Antagonist (Investigational Pro-cognitive)': '#bae6fd',
  'SNRI (Serotonin-Norepinephrine Reuptake Inhibitor)': '#67e8f9',
  'NDRI (Norepinephrine-Dopamine Reuptake Inhibitor)': '#93c5fd',
  'NaSSA (Noradrenergic and Specific Serotonergic Antidepressant)': '#c4b5fd',
  'TCA (Tricyclic Antidepressant)': '#f9a8d4',
  'Mood Stabilizer': '#a5b4fc',
  Benzodiazepine: '#fde68a',
  'Stimulant (ADHD Medication)': '#bbf7d0',
  'Anxiolytic (Non-Benzodiazepine)': '#d1fae5',
  'Glutamate Modulator / Rapid-Acting Antidepressant': '#e0f2fe',
};

function getDrugClassColor(cls: string): string {
  return DRUG_CLASS_COLORS[cls] ?? '#e5e7eb';
}

export default function Explorer({ progress, setProgress }: Props) {
  const [view, setView] = useState<View>('matrix');
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);
  const [selectedReceptor, setSelectedReceptor] = useState<Receptor | null>(null);
  const [filterClass, setFilterClass] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [tableView, setTableView] = useState<ExplorerTableView>('receptor');

  const allClasses = ['All', ...new Set(drugs.map((d) => d.drugClass))];

  const filteredDrugs = drugs.filter((d) => {
    const matchClass = filterClass === 'All' || d.drugClass === filterClass;
    const matchSearch =
      searchTerm === '' ||
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.brandNames.some((b) => b.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchClass && matchSearch;
  });

  function openDrug(drug: Drug) {
    setSelectedDrug(drug);
    setView('drug');
    const updated = markDrugReviewed(progress, drug.id);
    setProgress(updated);
    saveProgress(updated);
  }

  function openReceptor(receptor: Receptor) {
    setSelectedReceptor(receptor);
    setView('receptor');
    const updated = markReceptorReviewed(progress, receptor.id);
    setProgress(updated);
    saveProgress(updated);
  }

  if (view === 'drug' && selectedDrug) {
    return <DrugDetail drug={selectedDrug} onBack={() => setView('matrix')} onReceptorClick={openReceptor} />;
  }
  if (view === 'receptor' && selectedReceptor) {
    return <ReceptorDetail receptor={selectedReceptor} onBack={() => setView('matrix')} onDrugClick={openDrug} />;
  }

  return (
    <div className="explorer">
      <div className="explorer-controls">
        <input
          className="search-input"
          type="text"
          placeholder="Search drug by name or brand..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="class-select"
          value={filterClass}
          onChange={(e) => setFilterClass(e.target.value)}
        >
          {allClasses.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <div className="table-toggle" role="group" aria-label="Explorer table mode">
          <button
            className={`table-toggle-btn${tableView === 'receptor' ? ' active' : ''}`}
            onClick={() => setTableView('receptor')}
          >
            Receptor Matrix
          </button>
          <button
            className={`table-toggle-btn${tableView === 'cyp' ? ' active' : ''}`}
            onClick={() => setTableView('cyp')}
          >
            CYP Table
          </button>
        </div>
      </div>

      {tableView === 'receptor' ? (
        <>
          <div className="matrix-container">
            <table className="matrix-table">
              <thead>
                <tr>
                  <th className="drug-header-cell">Drug</th>
                  {receptors.map((r) => (
                    <th key={r.id} className="receptor-header-cell">
                      <button
                        className="receptor-header-btn"
                        onClick={() => openReceptor(r)}
                        title={r.description}
                      >
                        <span className="receptor-abbr">{r.id}</span>
                        <span className="receptor-nt">{r.neurotransmitter}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDrugs.map((drug) => (
                  <tr key={drug.id}>
                    <td className="drug-name-cell">
                      <button
                        className="drug-name-btn"
                        style={{ borderLeft: `4px solid ${getDrugClassColor(drug.drugClass)}` }}
                        onClick={() => openDrug(drug)}
                      >
                        <span className="drug-name">{drug.name}</span>
                        <span className="drug-brand">{drug.brandNames[0]}</span>
                      </button>
                    </td>
                    {receptors.map((receptor) => {
                      const binding = drug.receptorBindings.find((rb) => rb.receptorId === receptor.id);
                      return (
                        <td key={receptor.id} className="binding-cell">
                          {binding ? (
                            <ActionBadge action={binding.action} affinity={binding.affinity} small />
                          ) : (
                            <span className="no-binding">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="legend">
            <strong>Legend:</strong>
            {[
              { action: 'agonist', label: 'Agonist' },
              { action: 'antagonist', label: 'Antagonist' },
              { action: 'partial_agonist', label: 'Partial Agonist' },
              { action: 'reuptake_inhibitor', label: 'Reuptake Inhibitor' },
              { action: 'allosteric_modulator', label: 'PAM' },
            ].map((item) => (
              <ActionBadge key={item.action} action={item.action as never} small />
            ))}
            <span className="affinity-legend">Affinity: ●●● High &nbsp; ●●○ Med &nbsp; ●○○ Low</span>
          </div>
        </>
      ) : (
        <div className="cyp-section">
          <h3 className="cyp-title">CYP Enzyme Interaction Table</h3>
          <div className="matrix-container">
            <table className="matrix-table cyp-table">
              <thead>
                <tr>
                  <th className="drug-header-cell">Drug</th>
                  <th className="drug-header-cell">Substrate(s)</th>
                  <th className="drug-header-cell">Inhibits</th>
                  <th className="drug-header-cell">Induces</th>
                  <th className="drug-header-cell">Notes</th>
                </tr>
              </thead>
              <tbody>
                {filteredDrugs.map((drug) => {
                  const cyp = getCypInteractionProfile(drug.name);
                  return (
                    <tr key={`cyp_${drug.id}`}>
                      <td className="drug-name-cell">
                        <button
                          className="drug-name-btn"
                          style={{ borderLeft: `4px solid ${getDrugClassColor(drug.drugClass)}` }}
                          onClick={() => openDrug(drug)}
                        >
                          <span className="drug-name">{drug.name}</span>
                          <span className="drug-brand">{drug.brandNames[0]}</span>
                        </button>
                      </td>
                      <td className="cyp-cell">{joinOrDash(cyp.substrates)}</td>
                      <td className="cyp-cell">{joinOrDash(cyp.inhibits)}</td>
                      <td className="cyp-cell">{joinOrDash(cyp.induces)}</td>
                      <td className="cyp-cell cyp-note">{cyp.notes ?? '—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Drug Detail ─────────────────────────────────────────────────────────────

function DrugDetail({
  drug,
  onBack,
  onReceptorClick,
}: {
  drug: Drug;
  onBack: () => void;
  onReceptorClick: (r: Receptor) => void;
}) {
  return (
    <div className="detail-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Explorer
      </button>
      <div className="detail-header">
        <h2>{drug.name}</h2>
        <div className="brand-names">
          {drug.brandNames.map((b) => (
            <span key={b} className="brand-tag">
              {b}
            </span>
          ))}
        </div>
        <span className="drug-class-tag">{drug.drugClass}</span>
      </div>

      <div className="detail-section">
        <h3>🎯 Indications</h3>
        <ul>
          {drug.indications.map((ind) => (
            <li key={ind}>{ind}</li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h3>⚙️ Mechanism Summary</h3>
        <p>{drug.mechanismSummary}</p>
      </div>

      <div className="detail-section">
        <h3>🧪 CYP Interactions</h3>
        {(() => {
          const cyp = getCypInteractionProfile(drug.name);
          return (
            <div className="binding-card">
              <p>
                <strong>Substrate(s):</strong> {joinOrDash(cyp.substrates)}
              </p>
              <p>
                <strong>Inhibits:</strong> {joinOrDash(cyp.inhibits)}
              </p>
              <p>
                <strong>Induces:</strong> {joinOrDash(cyp.induces)}
              </p>
              <p className="binding-relevance">
                <strong>Notes:</strong> {cyp.notes ?? '—'}
              </p>
            </div>
          );
        })()}
      </div>

      <div className="detail-section">
        <h3>🔬 Receptor Bindings</h3>
        <div className="binding-list">
          {drug.receptorBindings.map((binding) => {
            const receptor = receptors.find((r) => r.id === binding.receptorId);
            return (
              <div key={binding.receptorId} className="binding-card">
                <div className="binding-card-header">
                  <button
                    className="receptor-link"
                    onClick={() => receptor && onReceptorClick(receptor)}
                  >
                    {receptor?.name ?? binding.receptorId}
                  </button>
                  <ActionBadge action={binding.action} affinity={binding.affinity} />
                </div>
                <p className="binding-relevance">{binding.clinicalRelevance}</p>
                <div className="citation-block">
                  <CitationInline citation={binding.citation} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Receptor Detail ──────────────────────────────────────────────────────────

function ReceptorDetail({
  receptor,
  onBack,
  onDrugClick,
}: {
  receptor: Receptor;
  onBack: () => void;
  onDrugClick: (d: Drug) => void;
}) {
  const drugsWithReceptor = drugs.filter((d) =>
    d.receptorBindings.some((rb) => rb.receptorId === receptor.id),
  );

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={onBack}>
        ← Back to Explorer
      </button>
      <div className="detail-header">
        <h2>{receptor.name}</h2>
        <span className="drug-class-tag">{receptor.system}</span>
        <span className="drug-class-tag" style={{ backgroundColor: '#e0f2fe', color: '#075985' }}>
          NT: {receptor.neurotransmitter}
        </span>
      </div>

      {receptor.aliases.length > 0 && (
        <div className="detail-section">
          <h3>🏷️ Aliases</h3>
          <p>{receptor.aliases.join(', ')}</p>
        </div>
      )}

      <div className="detail-section">
        <h3>📖 Description</h3>
        <p>{receptor.description}</p>
      </div>

      <div className="detail-section">
        <h3>🧠 Behavioral Effects by Action</h3>
        {receptor.behavioralEffects.map((eff, i) => (
          <div key={i} className="effect-card">
            <div className="effect-header">
              <ActionBadge action={eff.action} />
            </div>
            <p>
              <strong>Effect:</strong> {eff.effect}
            </p>
            <p>
              <strong>Clinical Relevance:</strong> {eff.clinicalRelevance}
            </p>
            <CitationInline citation={eff.citation} />
          </div>
        ))}
      </div>

      <div className="detail-section">
        <h3>💊 Drugs Acting on This Receptor</h3>
        <div className="drug-grid">
          {drugsWithReceptor.map((drug) => {
            const binding = drug.receptorBindings.find((rb) => rb.receptorId === receptor.id)!;
            return (
              <button key={drug.id} className="drug-card-btn" onClick={() => onDrugClick(drug)}>
                <div className="drug-card-name">{drug.name}</div>
                <div className="drug-card-brand">{drug.brandNames[0]}</div>
                <ActionBadge action={binding.action} affinity={binding.affinity} small />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Inline Citation ──────────────────────────────────────────────────────────

function CitationInline({ citation }: { citation: { authors: string; title: string; journal: string; year: number; doi?: string; pmid?: string } }) {
  const { titleSearchUrl } = getCitationLinks(citation);
  return (
    <div className="citation-card">
      <span className="citation-icon">📄</span>
      <span>
        <strong>{citation.authors}</strong> ({citation.year}). <em>{citation.journal}</em>.
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
  );
}

function joinOrDash(values: string[]): string {
  return values.length > 0 ? values.join(', ') : '—';
}
