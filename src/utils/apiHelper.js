// @deprecated Utiliser apiHelper.ts (TypeScript) à la place
// Ce fichier JS sera supprimé dans une prochaine version.
// Les nouveaux appels API doivent utiliser TanStack Query.

// ❌ Pas de TypeScript
// ❌ Pas de typage des parametres/retours
// ❌ Gestion d'erreur inconsistante

const API_BASE_URL = 'https://api.example.com';

export function fetchApi(endpoint, options = {}) {
  return fetch(API_BASE_URL + endpoint, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }).then((res) => {
    // ❌ Parfois retourne json, parfois texte
    if (res.headers.get('content-type')?.includes('application/json')) {
      return res.json();
    }
    return res.text();
  });
}

export function postApi(endpoint, data) {
  return fetchApi(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

// ❌ Fonction qui mute son parametre
export function processUserData(user) {
  // ❌ Mutation directe
  user.fullName = user.name + ' (' + user.email + ')';
  user.isActive = user.status === 'active';
  return user;
}
