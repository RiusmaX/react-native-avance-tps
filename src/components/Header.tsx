// ❌ PROBLÈME 2 : Calcul lourd inline (pas de useMemo)
// computeExpensiveStats est appelé à CHAQUE render,
// même si `posts` n'a pas changé.
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FeedStats {
  totalPosts: number;
  totalLikes: number;
  averageLikes: number;
  topAuthor: string;
  activeUsers: number;
  engagementRate: number;
}

// Simulation d'un calcul coûteux
function computeExpensiveStats(data: any[]): FeedStats {
  const start = performance.now();
  while (performance.now() - start < 5) {
    // Boucle synchrone qui bloque le JS thread pendant 5ms
    // Sur 500 items, ça bloque le thread JS à chaque render
  }

  return {
    totalPosts: data.length,
    totalLikes: data.reduce((sum: number, p: any) => sum + (p.likes || 0), 0),
    averageLikes: data.length > 0
      ? Math.round(data.reduce((sum: number, p: any) => sum + (p.likes || 0), 0) / data.length)
      : 0,
    topAuthor: (data as any[])[0]?.author?.name || 'N/A',
    activeUsers: new Set(data.map((p: any) => p.author?.name)).size,
    engagementRate: Math.random() * 100,
  };
}

function Header({ posts }: { posts: any[] }) {
  // ❌ Appelé à CHAQUE render, même si posts est le même tableau
  const stats = computeExpensiveStats(posts);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fil d'actualité</Text>
      <View style={styles.statsRow}>
        <StatBadge label="Posts" value={stats.totalPosts} />
        <StatBadge label="Likes" value={stats.totalLikes} />
        <StatBadge label="Moyenne" value={stats.averageLikes} />
        <StatBadge label="Engagement" value={`${stats.engagementRate.toFixed(0)}%`} />
      </View>
    </View>
  );
}

// ❌ Sous-composant sans React.memo non plus
function StatBadge({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeValue}>{value}</Text>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  container: { backgroundColor: '#021023', padding: 16, paddingTop: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#FF3000', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  badge: { backgroundColor: '#1a2a3a', borderRadius: 8, padding: 10, alignItems: 'center', flex: 1 },
  badgeValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
  badgeLabel: { fontSize: 11, color: '#8899aa', marginTop: 2 },
});
