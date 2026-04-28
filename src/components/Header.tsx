// ✅ FIX 2 : useMemo pour le calcul couteux + React.memo pour StatBadge
import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface FeedStats {
  totalPosts: number;
  totalLikes: number;
  averageLikes: number;
  topAuthor: string;
  activeUsers: number;
  engagementRate: number;
}

function computeExpensiveStats(data: any[]): FeedStats {
  const start = performance.now();
  while (performance.now() - start < 5) {}
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
  const stats = useMemo(() => computeExpensiveStats(posts), [posts]);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fil d'actualite</Text>
      <View style={styles.statsRow}>
        <StatBadge label="Posts" value={stats.totalPosts} />
        <StatBadge label="Likes" value={stats.totalLikes} />
        <StatBadge label="Moyenne" value={stats.averageLikes} />
        <StatBadge label="Engagement" value={`${stats.engagementRate.toFixed(0)}%`} />
      </View>
    </View>
  );
}

const StatBadge = React.memo(function StatBadge({ label, value }: { label: string; value: number | string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeValue}>{value}</Text>
      <Text style={styles.badgeLabel}>{label}</Text>
    </View>
  );
});

export default React.memo(Header);

const styles = StyleSheet.create({
  container: { backgroundColor: '#021023', padding: 16, paddingTop: 8 },
  title: { fontSize: 22, fontWeight: '700', color: '#FF3000', marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  badge: { backgroundColor: '#1a2a3a', borderRadius: 8, padding: 10, alignItems: 'center', flex: 1 },
  badgeValue: { fontSize: 18, fontWeight: '700', color: '#fff' },
  badgeLabel: { fontSize: 11, color: '#8899aa', marginTop: 2 },
});
