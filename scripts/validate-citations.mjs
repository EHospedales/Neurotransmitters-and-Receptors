import fs from 'node:fs/promises';

const ONLINE_FLAG = '--online';
const online = process.argv.includes(ONLINE_FLAG);

const databasePath = new URL('../src/data/database.ts', import.meta.url);

function normalizeDoi(raw) {
  if (!raw) return null;
  return raw
    .trim()
    .replace(/^https?:\/\/(dx\.)?doi\.org\//i, '')
    .replace(/^doi:\s*/i, '')
    .replace(/[\s.]+$/g, '');
}

function tokenize(text) {
  return new Set((text.toLowerCase().match(/[a-z0-9]+/g) ?? []));
}

function overlapScore(a, b) {
  const left = tokenize(a);
  const right = tokenize(b);
  if (left.size === 0) return 0;
  let shared = 0;
  for (const token of left) {
    if (right.has(token)) shared += 1;
  }
  return shared / left.size;
}

function getLineNumber(source, index) {
  return source.slice(0, index).split('\n').length;
}

function parseCitations(source) {
  const citations = [];
  let cursor = 0;

  while (true) {
    const marker = source.indexOf('citation:', cursor);
    if (marker === -1) break;

    const objectStart = source.indexOf('{', marker);
    if (objectStart === -1) break;

    let depth = 0;
    let i = objectStart;
    for (; i < source.length; i += 1) {
      if (source[i] === '{') depth += 1;
      if (source[i] === '}') {
        depth -= 1;
        if (depth === 0) break;
      }
    }

    if (i >= source.length) break;

    const body = source.slice(objectStart, i + 1);
    const get = (field) => {
      const match = body.match(new RegExp(`${field}:\\s*'([^']*)'`));
      return match?.[1]?.trim();
    };

    citations.push({
      line: getLineNumber(source, marker),
      title: get('title') ?? '',
      authors: get('authors') ?? '',
      journal: get('journal') ?? '',
      year: get('year') ?? '',
      doi: get('doi') ?? null,
      pmid: get('pmid') ?? null,
    });

    cursor = i + 1;
  }

  return citations;
}

async function fetchJson(url, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt += 1) {
    const response = await fetch(url, {
      headers: {
        'user-agent': 'psychrx-citation-validator/1.0',
      },
    });

    if (response.ok) return response.json();
    if (response.status !== 429 || attempt === retries) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }

    await new Promise((resolve) => setTimeout(resolve, 400 * attempt));
  }

  throw new Error(`Unable to fetch ${url}`);
}

function uniqueByTitle(citations) {
  const map = new Map();
  for (const citation of citations) {
    if (!map.has(citation.title)) map.set(citation.title, citation);
  }
  return [...map.values()];
}

async function run() {
  const source = await fs.readFile(databasePath, 'utf8');
  const citations = parseCitations(source);

  const errors = [];
  const warnings = [];

  for (const c of citations) {
    if (!c.title) errors.push(`L${c.line}: Missing citation title`);
    if (!c.authors) errors.push(`L${c.line}: Missing citation authors`);
    if (!c.journal) errors.push(`L${c.line}: Missing citation journal`);

    if (c.pmid && !/^\d+$/.test(c.pmid)) {
      errors.push(`L${c.line}: Invalid PMID format (${c.pmid})`);
    }

    if (c.doi) {
      const doi = normalizeDoi(c.doi);
      if (!doi || !/^10\.\d{4,9}\/.+/i.test(doi)) {
        errors.push(`L${c.line}: Invalid DOI format (${c.doi})`);
      }
    }

    if (!c.doi && !c.pmid) {
      warnings.push(`L${c.line}: Citation has neither DOI nor PMID`);
    }
  }

  if (online) {
    const unique = uniqueByTitle(citations).filter((c) => c.title);
    for (const c of unique) {
      const normalizedDoi = normalizeDoi(c.doi);

      try {
        if (normalizedDoi) {
          const doiTerm = encodeURIComponent(`${normalizedDoi}[AID]`);
          const doiSearchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=2&term=${doiTerm}`;
          const doiSearch = await fetchJson(doiSearchUrl);
          const doiIds = doiSearch?.esearchresult?.idlist ?? [];

          if (doiIds.length === 1) {
            const doiPmid = doiIds[0];
            if (c.pmid && c.pmid !== doiPmid) {
              warnings.push(`L${c.line}: DOI/PMID mismatch (current ${c.pmid}, DOI resolves to ${doiPmid})`);
            }
            continue;
          }
        }

        const term = encodeURIComponent(`"${c.title}"[Title]`);
        const searchUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&retmode=json&retmax=1&term=${term}`;
        const search = await fetchJson(searchUrl);
        const topPmid = search?.esearchresult?.idlist?.[0];

        if (!topPmid) {
          warnings.push(`L${c.line}: No PubMed match found for title`);
          continue;
        }

        if (c.pmid && c.pmid !== topPmid) {
          warnings.push(`L${c.line}: PMID mismatch (current ${c.pmid}, top title match ${topPmid})`);
        }

        const summaryUrl = `https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json&id=${topPmid}`;
        const summary = await fetchJson(summaryUrl);
        const pubmedTitle = summary?.result?.[topPmid]?.title ?? '';
        const score = overlapScore(c.title, pubmedTitle);

        if (score < 0.5) {
          warnings.push(`L${c.line}: Low title similarity against PubMed top hit (${score.toFixed(2)})`);
        }
      } catch (error) {
        warnings.push(`L${c.line}: Online check skipped (${error.message})`);
      }

      await new Promise((resolve) => setTimeout(resolve, 140));
    }
  }

  console.log(`Checked ${citations.length} citation entries${online ? ' (online mode)' : ''}.`);

  if (errors.length > 0) {
    console.log('\nErrors:');
    for (const error of errors) console.log(`- ${error}`);
  }

  if (warnings.length > 0) {
    console.log('\nWarnings:');
    for (const warning of warnings) console.log(`- ${warning}`);
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('No citation issues found.');
  }

  if (errors.length > 0) {
    process.exitCode = 1;
  }
}

run().catch((error) => {
  console.error('Citation validation failed:', error);
  process.exitCode = 1;
});
