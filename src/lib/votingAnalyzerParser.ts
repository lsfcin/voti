// votingAnalyzerParser: CSV parsing helpers for deputy voting data
import type { VotingProject } from './votingTypes';

export function extractDateFromHeader(header: string): string {
  const dateMatch = header.match(/(\d{2}\/\d{2}\/\d{4})/);
  return dateMatch ? dateMatch[1] : 'Data não disponível';
}

export function parseCSVLine(line: string): string[] {
  const values: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current.trim());
  return values;
}

export function parseCSV(csvContent: string): VotingProject[] {
  const projects: VotingProject[] = [];
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) {
    return projects;
  }

  const headers = parseCSVLine(lines[0]);
  const votingHeaders = headers.slice(2);

  votingHeaders.forEach((header, index) => {
    if (!header || header.trim() === '') {
      return;
    }

    const project: VotingProject = {
      id: `projeto-${index + 1}`,
      title: header.trim(),
      date: extractDateFromHeader(header),
      votes: {}
    };

    for (let i = 1; i < lines.length; i++) {
      const values = parseCSVLine(lines[i]);
      if (values.length < 3) {
        continue;
      }

      const deputyName = values[0]?.trim();
      const vote = values[index + 2]?.trim();

      if (deputyName && vote && vote !== '-') {
        project.votes[deputyName] = vote.toUpperCase();
      }
    }

    if (Object.keys(project.votes).length > 0) {
      projects.push(project);
    }
  });

  console.log(`Carregados ${projects.length} projetos de votação`);
  return projects;
}
