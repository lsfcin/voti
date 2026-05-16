// PoliticiansGridUtils: shared formatting helpers for the politicians grid
export function getAffinityColor(affinity: number): string {
  if (affinity >= 80) return 'bg-green-500';
  if (affinity >= 60) return 'bg-green-400';
  if (affinity >= 40) return 'bg-yellow-500';
  if (affinity >= 20) return 'bg-orange-500';
  return 'bg-red-600';
}

export function getAffinityLabel(affinity: number): string {
  if (affinity >= 80) return 'Perfeita';
  if (affinity >= 60) return 'Alta';
  if (affinity >= 40) return 'Média';
  if (affinity >= 20) return 'Baixa';
  return 'Muito Baixa';
}

export function formatDeputyName(name: string): string {
  return name
    .replace(/^(Dep\.|Deputado|Deputada)\s*/i, '')
    .replace(/\s*\([^)]*\)$/, '')
    .trim();
}
