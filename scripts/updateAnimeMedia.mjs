import fs from 'fs';

const filePath = 'src/data/animeDecisionTree.json';
const tree = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const query = `
  query ($search: String) {
    Media(search: $search, type: ANIME) {
      title {
        romaji
        english
      }
      coverImage {
        extraLarge
        large
      }
      trailer {
        id
        site
        thumbnail
      }
      siteUrl
    }
  }
`;

const titleAliases = {
  'Frieren': "Frieren: Beyond Journey's End",
  'Frieren: Beyond Journey’s End': "Frieren: Beyond Journey's End",
  'Demon Slayer': 'Demon Slayer: Kimetsu no Yaiba',
  'Hell’s Paradise': "Hell's Paradise",
  "Vivy: Fluorite Eye’s Song": "Vivy: Fluorite Eye's Song",
  'The Apothecary Diaries': 'Kusuriya no Hitorigoto',
  'The Dangers in My Heart': 'Boku no Kokoro no Yabai Yatsu',
  'Mashle: Magic and Muscles': 'Mashle',
  'Delicious in Dungeon': 'Dungeon Meshi',
  'Cyberpunk: Edgerunners': 'Cyberpunk Edgerunners',
  'Summertime Render': 'Summer Time Rendering',
  '86: Eighty-Six': '86',
  'That Time I Got Reincarnated as a Slime': 'Tensei shitara Slime Datta Ken',
  'Gundam: Witch from Mercury': 'Mobile Suit Gundam: The Witch from Mercury',
  'Saiki Kusuo': 'Saiki Kusuo no Psi-nan',
  'KonoSuba': "KonoSuba: God's Blessing on This Wonderful World!",
  'Re:Zero Season 3': 'Re:Zero kara Hajimeru Isekai Seikatsu 3rd Season',
  'Monster': 'Monster',
};

const titleIds = {
  'Frieren': 154587,
  'Frieren: Beyond Journey’s End': 154587,
  "Hell's Paradise": 128893,
  'Hell’s Paradise': 128893,
  'Dorohedoro': 105228,
  'Vinland Saga': 101348,
  "The Ancient Magus' Bride": 98436,
  'Monster': 19,
  'Metallic Rouge': 162985,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const normalizeTitle = (title) => {
  return titleAliases[title] || title.replaceAll('’', "'");
};

const lookupAnime = async (title) => {
  const id = titleIds[title];
  const variables = id ? { id } : { search: normalizeTitle(title) };
  const activeQuery = id
    ? query.replace('($search: String)', '($id: Int)').replace('search: $search', 'id: $id')
    : query;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetch('https://graphql.anilist.co', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: activeQuery,
        variables,
      }),
    });

    const result = await response.json();

    if (result.data?.Media) {
      return result.data.Media;
    }

    await sleep(1200 * (attempt + 1));
  }

  return null;
};

const updateAnime = (anime, media) => {
  if (!media) return;

  anime.image = media.coverImage?.extraLarge || media.coverImage?.large || anime.image;
  anime.link = media.siteUrl || anime.link;

  if (media.trailer?.site?.toLowerCase() === 'youtube' && media.trailer.id) {
    anime.trailerUrl = `https://www.youtube.com/watch?v=${media.trailer.id}`;
  }
};

const animeByTitle = new Map();

const addAnime = (anime) => {
  const title = anime.title;

  if (!animeByTitle.has(title)) {
    animeByTitle.set(title, []);
  }

  animeByTitle.get(title).push(anime);
};

Object.values(tree.nodes).forEach((node) => {
  if (node.type !== 'result' || !node.anime) return;

  addAnime(node.anime);

  node.anime.alternativeSuggestions?.forEach((anime) => {
    addAnime(anime);
  });
});

for (const [title, animeEntries] of animeByTitle.entries()) {
  await sleep(700);
  const media = await lookupAnime(title);

  if (!media) {
    console.warn(`Missing AniList match: ${title}`);
    continue;
  }

  animeEntries.forEach((anime) => updateAnime(anime, media));
  console.log(
    `Updated ${title} (${animeEntries.length}) -> ${media.title.english || media.title.romaji}`
  );
}

fs.writeFileSync(filePath, `${JSON.stringify(tree, null, 2)}\n`);
