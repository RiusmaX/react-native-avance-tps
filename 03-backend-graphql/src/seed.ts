import { getDb } from './db';

interface UserInput {
  id: string;
  name: string;
  email: string;
}

interface PostInput {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  tags: string[];
  authorId: string;
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const FIRST_NAMES = [
  'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank',
  'Ivy', 'Jack', 'Kate', 'Leo', 'Maria', 'Noah', 'Olivia', 'Paul',
  'Quinn', 'Rosa', 'Sam', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xander',
];

const LAST_NAMES = [
  'Martin', 'Bernard', 'Dubois', 'Thomas', 'Robert', 'Richard', 'Petit', 'Durand',
  'Leroy', 'Moreau', 'Simon', 'Laurent', 'Lefevre', 'Michel', 'Garcia', 'David',
];

const POST_TITLES = [
  'Introduction à React Native', 'Les nouveautés d Expo SDK 55',
  'Pourquoi choisir TypeScript', 'Architecture Clean Code en React',
  'Optimiser ses listes avec FlashList', 'Comprendre le New Architecture',
  'Tests unitaires avec Jest', 'Déploiement continu avec EAS',
  'Animations fluides avec Reanimated', 'Deep linking avec Expo Router',
  'Gestion d état avec TanStack Query', 'Bridging natif avec Expo Modules',
  'Bonnes pratiques de sécurité', 'Internationalisation i18n',
  'Accessibilité sur mobile', 'Patterns de navigation avancés',
];

const POST_BODIES = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
];

const TAGS = ['react-native', 'expo', 'typescript', 'performance', 'tests', 'navigation', 'animation', 'deployment'];

export function seedDatabase() {
  const db = getDb();

  // Vérifier si déjà seedé
  const count = db.prepare('SELECT COUNT(*) as c FROM users').get() as { c: number };
  if (count.c > 0) {
    console.log(`Base déjà seedée : ${count.c} utilisateurs`);
    return;
  }

  console.log('Seeding en cours...');

  const insertUser = db.prepare('INSERT INTO users (id, name, email, avatar) VALUES (?, ?, ?, ?)');
  const insertPost = db.prepare(
    'INSERT INTO posts (id, title, excerpt, body, tags, authorId, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)'
  );

  const transaction = db.transaction(() => {
    // Créer 500 utilisateurs
    const users: UserInput[] = [];
    for (let i = 0; i < 500; i++) {
      const firstName = randomItem(FIRST_NAMES);
      const lastName = randomItem(LAST_NAMES);
      const user = {
        id: `user-${i + 1}`,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@example.com`,
      };
      users.push(user);
      insertUser.run(user.id, user.name, user.email, `https://i.pravatar.cc/150?u=${user.id}`);
    }

    // Créer 5000 posts
    for (let i = 0; i < 5000; i++) {
      const author = users[i % users.length];
      const tagCount = 1 + Math.floor(Math.random() * 3);
      const postTags = [];
      const shuffled = [...TAGS].sort(() => Math.random() - 0.5);
      for (let t = 0; t < tagCount; t++) postTags.push(shuffled[t]);

      const post = {
        id: `post-${i + 1}`,
        title: `${randomItem(POST_TITLES)} — Partie ${(i % 20) + 1}`,
        excerpt: `Découvrez les concepts avancés de ${randomItem(TAGS)}...`,
        body: randomItem(POST_BODIES),
        tags: postTags,
        authorId: author.id,
        createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      };
      insertPost.run(post.id, post.title, post.excerpt, post.body, JSON.stringify(post.tags), post.authorId, post.createdAt);
    }
  });

  transaction();
  console.log('✅ Seed terminé : 500 utilisateurs, 5000 posts');
}

// Exécution directe
seedDatabase();
