import type { Citation } from '../types';
import { getCitationLinks } from '../utils/citation';

interface CitationCardProps {
  citation: Citation;
}

export default function CitationCard({ citation }: CitationCardProps) {
  const { titleSearchUrl } = getCitationLinks(citation);

  return (
    <div className="citation-card">
      <span className="citation-icon">📄</span>
      <span>
        <strong>{citation.authors}</strong> ({citation.year}). {citation.title}.{' '}
        <em>{citation.journal}</em>.
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
