import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Preferences.css";

const GENRES = [
  { id: 28,    name: "Action" },
  { id: 12,    name: "Adventure" },
  { id: 16,    name: "Animation" },
  { id: 35,    name: "Comedy" },
  { id: 80,    name: "Crime" },
  { id: 99,    name: "Documentary" },
  { id: 18,    name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14,    name: "Fantasy" },
  { id: 36,    name: "History" },
  { id: 27,    name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648,  name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878,   name: "Sci-Fi" },
  { id: 53,    name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37,    name: "Western" },
];

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "fr", label: "French" },
  { code: "ar", label: "Arabic" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "hi", label: "Hindi" },
];

function Preferences() {
  const navigate = useNavigate();

  const [preferences, setPreferences] = useState({
    language: "en",
    genres: [],
    releaseFrom: 2000,
    releaseTo: 2026,
    adult: false,
    popularity: "medium",
  });

  function toggleGenre(id) {
    setPreferences(prev => ({
      ...prev,
      genres: prev.genres.includes(id)
        ? prev.genres.filter(g => g !== id)
        : [...prev.genres, id],
    }));
  }

  function handleSubmit() {
    if (preferences.genres.length === 0) {
      alert("Please select at least one genre!");
      return;
    }
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    navigate("/recommendations");
  }

  return (
    <div className="preferences-container">
      <h1>🎬 Find Your Perfect Movie</h1>
      <p className="subtitle">Tell us what you like and we'll do the rest</p>

      {/* Language */}
      <div className="pref-section">
        <label>🌍 Language</label>
        <select
          value={preferences.language}
          onChange={e => setPreferences({ ...preferences, language: e.target.value })}
        >
          {LANGUAGES.map(l => (
            <option key={l.code} value={l.code}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Genres */}
      <div className="pref-section">
        <label>🎭 Genres <span>(select one or more)</span></label>
        <div className="genre-grid">
          {GENRES.map(genre => (
            <button
              key={genre.id}
              className={`genre-btn ${preferences.genres.includes(genre.id) ? "selected" : ""}`}
              onClick={() => toggleGenre(genre.id)}
            >
              {genre.name}
            </button>
          ))}
        </div>
      </div>

      {/* Release Year */}
      <div className="pref-section">
        <label>📅 Release Year</label>
        <div className="year-range">
          <input
            type="number"
            min="1900"
            max={preferences.releaseTo}
            value={preferences.releaseFrom}
            onChange={e => setPreferences({ ...preferences, releaseFrom: +e.target.value })}
          />
          <span>→</span>
          <input
            type="number"
            min={preferences.releaseFrom}
            max="2026"
            value={preferences.releaseTo}
            onChange={e => setPreferences({ ...preferences, releaseTo: +e.target.value })}
          />
        </div>
      </div>

      {/* Popularity */}
      <div className="pref-section">
        <label>🌟 Popularity</label>
        <div className="popularity-slider">
          {["low", "medium", "high"].map(level => (
            <button
              key={level}
              className={`pop-btn ${preferences.popularity === level ? "selected" : ""}`}
              onClick={() => setPreferences({ ...preferences, popularity: level })}
            >
              {level === "low"    && "🔍 Hidden Gems"}
              {level === "medium" && "🎬 Popular"}
              {level === "high"   && "🚀 Blockbusters"}
            </button>
          ))}
        </div>
      </div>

      {/* Adult Toggle */}
      <div className="pref-section adult-toggle">
        <label>🔞 Adult Content</label>
        <div
          className={`toggle ${preferences.adult ? "on" : "off"}`}
          onClick={() => setPreferences({ ...preferences, adult: !preferences.adult })}
        >
          <div className="toggle-thumb" />
          <span>{preferences.adult ? "Included" : "Excluded"}</span>
        </div>
      </div>

      {/* Submit */}
      <button className="submit-btn" onClick={handleSubmit}>
        🎯 Get My Recommendations →
      </button>
    </div>
  );
}

export default Preferences;
