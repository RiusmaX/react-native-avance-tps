/**
 * ✅ Logique métier extraite du composant.
 * Testable indépendamment, pure function.
 */
export function formatJoinDate(dateStr: string | null | undefined): string {
  if (!dateStr) return 'Date inconnue';
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return 'Date invalide';
  return date.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
