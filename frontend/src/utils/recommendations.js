const API_KEY =import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const SCORING_WEIGHTS = {
  voteAverage: 50,
  genreMatch: 15,
  popularityBoost: 10,
  voteCount: 5,
  recencyBoost: 5,
};

const POPULARITY_MAP = {
  low:    { "popularity.gte": 1,   "popularity.lte": 50  },
  medium: { "popularity.gte": 50,  "popularity.lte": 200 },
  high:   { "popularity.gte": 200 },
};

function scoreMovie(movie, preferences) {
  let score = 0;

  // ⭐ Heaviest: Rating
  score += movie.vote_average * SCORING_WEIGHTS.voteAverage;

  // 🎬 Genre match
  const matched = movie.genre_ids.filter(g => preferences.genres.includes(g));
  score += matched.length * SCORING_WEIGHTS.genreMatch;

  // 🌟 Popularity
  if (movie.popularity > 0)
    score += Math.log10(movie.popularity) * SCORING_WEIGHTS.popularityBoost;

  // 🗳️ Vote credibility
  if (movie.vote_count > 0)
    score += Math.log10(movie.vote_count) * SCORING_WEIGHTS.voteCount;

  // 📅 Recency bonus
  const year = new Date(movie.release_date).getFullYear();
  if (year >= 2020) score += SCORING_WEIGHTS.recencyBoost;

  return score;
}

export async function fetchRecommendations(preferences) {
  const popularityParams = POPULARITY_MAP[preferences.popularity] || {};

  const params = new URLSearchParams({
    api_key: API_KEY,
    language: preferences.language,
    with_genres: preferences.genres.join(","),
    "primary_release_date.gte": `${preferences.releaseFrom}-01-01`,
    "primary_release_date.lte": `${preferences.releaseTo}-12-31`,
    include_adult: preferences.adult,
    sort_by: "vote_average.desc",
    "vote_count.gte": 50,       // internal: filters unreliable ratings
    page: 1,
    ...popularityParams,
  });

  const res = await fetch(`${BASE_URL}/discover/movie?${params}`);
  const data = await res.json();

  const scored = (data.results || [])
    .map(movie => ({ ...movie, score: scoreMovie(movie, preferences) }))
    .sort((a, b) => b.score - a.score);

  return {
    top3: scored.slice(0, 3),
    others: scored.slice(3, 20),
  };
}
