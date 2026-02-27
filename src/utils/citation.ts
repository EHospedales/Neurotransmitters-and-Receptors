import type { Citation } from '../types';

function normalizeDoi(rawDoi?: string): string | null {
  if (!rawDoi) return null;
  const cleaned = rawDoi
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '')
    .replace(/[\s.]+$/g, '');

  return cleaned.length > 0 ? cleaned : null;
}

function normalizePmid(rawPmid?: string): string | null {
  if (!rawPmid) return null;
  const cleaned = rawPmid.trim();
  return /^\d+$/.test(cleaned) ? cleaned : null;
}

function getFirstAuthorSurname(authors: string): string | null {
  if (!authors) return null;
  const firstAuthor = authors.split(',')[0]?.trim();
  if (!firstAuthor) return null;
  const parts = firstAuthor.split(/\s+/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : null;
}

export function getCitationLinks(citation: Citation): {
  titleSearchUrl: string | null;
  doiUrl: string | null;
  pmidUrl: string | null;
} {
  const doi = normalizeDoi(citation.doi);
  const pmid = normalizePmid(citation.pmid);
  const title = citation.title?.trim();
  const surname = getFirstAuthorSurname(citation.authors);
  const titleQuery = title ? `"${title}"[Title]` : null;
  const searchQuery = titleQuery
    ? surname
      ? `${titleQuery} AND ${surname}[Author]`
      : titleQuery
    : null;

  return {
    titleSearchUrl: searchQuery
      ? `https://pubmed.ncbi.nlm.nih.gov/?term=${encodeURIComponent(searchQuery)}`
      : null,
    doiUrl: doi ? `https://doi.org/${doi}` : null,
    pmidUrl: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : null,
  };
}
