import { getDb } from "./db";

const db = getDb();

console.log("🌱 Seeding database...");

// ── Clear existing data ──
db.exec("DELETE FROM posts");
db.exec("DELETE FROM users");

// ── Helper: random item from array ──
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ── Helper: random integer in range ──
function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ── Helper: random date in 2024 ──
function randomDate(): string {
  const start = new Date("2024-01-01").getTime();
  const end = new Date("2024-12-31").getTime();
  return new Date(start + Math.random() * (end - start)).toISOString();
}

// ── Data pools ──
const firstNames = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Hank",
  "Ivy",
  "Jack",
  "Karen",
  "Leo",
  "Mona",
  "Nate",
  "Olive",
  "Paul",
  "Quinn",
  "Rosa",
  "Sam",
  "Tina",
  "Uma",
  "Victor",
  "Wendy",
  "Xander",
  "Yara",
  "Zack",
  "Amélie",
  "Bastien",
  "Camille",
  "David",
];

const lastNames = [
  "Dupont",
  "Martin",
  "Bernard",
  "Petit",
  "Robert",
  "Richard",
  "Durand",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
  "Morel",
  "Girard",
  "Andre",
  "Lefevre",
  "Mercier",
  "Dupuis",
  "Lucas",
  "Brun",
  "Gauthier",
];

const tags = [
  "react",
  "javascript",
  "typescript",
  "node",
  "graphql",
  "react-native",
  "expo",
  "design",
  "backend",
  "frontend",
  "mobile",
  "web",
  "api",
  "database",
  "testing",
  "devops",
  "security",
  "performance",
  "ux",
  "ai",
];

const titleTemplates = [
  "Introduction à {topic}",
  "Les bases de {topic}",
  "Maîtriser {topic} en 2024",
  "Guide complet sur {topic}",
  "10 astuces pour {topic}",
  "Comment débuter avec {topic}",
  "Pourquoi choisir {topic} ?",
  "Les meilleures pratiques {topic}",
  "Comprendre {topic} simplement",
  "Aller plus loin avec {topic}",
  "{topic} : ce qu'il faut savoir",
  "Dépannage {topic} pour les pros",
  "Optimiser vos projets avec {topic}",
  "L'avenir de {topic}",
  "{topic} vs alternatives : comparatif",
];

const excerptTemplates = [
  "Découvrez les concepts fondamentaux de {topic} et comment les appliquer.",
  "Un tour d'horizon complet des fonctionnalités de {topic}.",
  "Apprenez à utiliser {topic} efficacement dans vos projets.",
  "Les secrets de {topic} révélés par un expert.",
  "Tout ce que vous devez savoir sur {topic}.",
];

const bodyParagraphs = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
  "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
  "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.",
  "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.",
];

function generateBody(): string {
  const count = randInt(3, 6);
  const paragraphs: string[] = [];
  for (let i = 0; i < count; i++) {
    paragraphs.push(pick(bodyParagraphs));
  }
  return paragraphs.join("\n\n");
}

function generatePostTags(): string {
  const count = randInt(1, 4);
  const selected = new Set<string>();
  while (selected.size < count) {
    selected.add(pick(tags));
  }
  return JSON.stringify(Array.from(selected));
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// ── Insert users ──
console.log("  👤 Inserting 500 users...");
const insertUser = db.prepare(`
  INSERT INTO users (id, name, email, avatar)
  VALUES (?, ?, ?, ?)
`);

const insertUsers = db.transaction(() => {
  for (let i = 1; i <= 500; i++) {
    const first = pick(firstNames);
    const last = pick(lastNames);
    const name = `${first} ${last}`;
    const email = `${slugify(first)}.${slugify(last)}${i}@example.com`;
    const avatar = `https://api.dicebear.com/8.x/avataaars/svg?seed=${slugify(name)}`;
    insertUser.run(`user-${i}`, name, email, avatar);
  }
});
insertUsers();

// ── Insert posts ──
console.log("  📝 Inserting 5000 posts...");
const insertPost = db.prepare(`
  INSERT INTO posts (id, title, excerpt, body, tags, author_id, created_at)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertPosts = db.transaction(() => {
  for (let i = 1; i <= 5000; i++) {
    const topic = pick(tags);
    const title = pick(titleTemplates).replace("{topic}", topic);
    const titleSlug = slugify(title);
    const date = randomDate();

    insertPost.run(
      `post-${i}`,
      title,
      pick(excerptTemplates).replace("{topic}", topic),
      generateBody(),
      generatePostTags(),
      `user-${randInt(1, 500)}`,
      date,
    );
  }
});
insertPosts();

console.log("✅ Seed complete!");
console.log(`   - 500 users created`);
console.log(`   - 5000 posts created`);

// ── Verify ──
const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as {
  count: number;
};
const postCount = db.prepare("SELECT COUNT(*) as count FROM posts").get() as {
  count: number;
};
console.log(`   - Users in DB: ${userCount.count}`);
console.log(`   - Posts in DB: ${postCount.count}`);
