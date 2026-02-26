import type { Citation } from '../types';

interface CitationCardProps {
  citation: Citation;
}

export default function CitationCard({ citation }: CitationCardProps) {
  const url = citation.doi
    ? `https://doi.org/${citation.doi}`
    : citation.pmid
    ? `https://pubmed.ncbi.nlm.nih.gov/${citation.pmid}/`
    : null;

  return (
    <div className="citation-card">
      <span className="citation-icon">📄</span>
      <span>
        <strong>{citation.authors}</strong> ({citation.year}). {citation.title}.{' '}
        <em>{citation.journal}</em>.
        {url && (
          <>
            {' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
              {citation.doi ? `DOI: ${citation.doi}` : `PMID: ${citation.pmid}`}
            </a>
          </>
        )}
      </span>
    </div>
  );
}
