# TP-06 : Profiling & Correction de Jank

**Branche :** `tp-06-with-jank`
**Module :** M8 — Profiling & Performance
**Durée :** 0h30
**Niveau :** ⬡⬡⬡ Avancé

## 4 problèmes de performance

| # | Fichier | Problème | Symptôme | Correction |
|---|---------|----------|----------|------------|
| 1 | `src/components/PostCard.tsx` | Pas de `React.memo` ni `useCallback` | Re-renders tous les 500 items | `React.memo` + `useCallback` |
| 2 | `src/components/Header.tsx` | `computeExpensiveStats()` inline | Calcul lourd à chaque render | `useMemo(fn, [data])` |
| 3 | `src/components/AnimatedLike.tsx` | `Animated.timing` sur JS thread | Animation saccadée au scroll | Reanimated 3 (UI thread) |
| 4 | `src/hooks/useFeed.ts` | `EventEmitter.addListener` sans cleanup | Fuite mémoire + re-renders | `useEffect` cleanup |

## Étapes

1. **Mesure de référence** — React DevTools Profiler (5s de scroll)
2. **Xcode Instruments / Android Profiler** — identifier les hotspots
3. **Corrections** — appliquer les 4 correctifs
4. **Vérification** — fps avant (~20) vs après (~60)

## Commandes

```bash
npm install
npx expo start --dev-client
npx react-devtools  # Profiler
```
