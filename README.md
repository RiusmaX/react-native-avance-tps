# TP-04 : Tests Avancés — MSW + Maestro

**Branche :** `tp-04-tests-starter`
**Module :** M6 — Tests Avancés
**Durée :** 0h30 (2 × 15 min)
**Niveau :** ⬡⬡ Intermédiaire

## Contexte

Jest + RTL + MSW pré-configurés. À vous d'écrire les tests et le flow Maestro.

## Partie A — MSW (15 min)

```bash
npm install
npm test
```

**Tests à écrire dans `__tests__/PostCard.test.tsx` :**
1. ✅ Chargement réussi : les posts s'affichent après réponse MSW
2. ✅ Erreur 500 : le message d'erreur apparaît
3. 🏆 Bonus : vérifier le skeleton pendant le chargement

**Handlers MSW à compléter dans `__tests__/setup.ts` :**

## Partie B — Maestro (15 min)

```bash
npx expo run:ios  # ou Android
maestro test .maestro/flows/browse_posts.yaml
```

**Flow à écrire dans `.maestro/flows/browse_posts.yaml` :**
1. Lancer l'app
2. Attendre la liste de posts
3. Scroller
4. Taper sur un post

## Backend

```bash
cd 03-backend-graphql
npm install && npm run seed && npm start
```
