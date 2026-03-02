import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecommendations } from "../utils/recommendations";
import { useMovieContext } from "../contexts/MovieContext";
import "../css/Recommendations.css";

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function Recommendations() {
  const navigate = useNavigate();
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext();

  const [top3, setTop3] = useState([]);
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userPreferences");
    if (!saved) {
      navigate("/preferences");
      return;
    }

    const preferences = JSON.parse(saved);

    fetchRecommendations(preferences)
      .then(({ top3, others }) => {
        setTop3(top3);
        setOthers(others);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      });
  }, []);

  function onFavoriteClick(e, movie) {
    e.preventDefault();
    isFavorite(movie.id)
      ? removeFromFavorites(movie.id)
      : addToFavorites(movie);
  }

  if (loading) return <div className="rec-loading">🎬 Finding your perfect movies...</div>;
  if (error)   return <div className="rec-error">{error}</div>;

  return (
    <div className="rec-container">

      {/* Header */}
      <div className="rec-header">
        <h1>🎯 Your Recommendations</h1>
        <button className="back-btn" onClick={() => navigate("/preferences")}>
          ← Adjust Preferences
        </button>
      </div>

      {/* Top 3 */}
      <section className="top3-section">
        <h2>🥇 Top Picks For You</h2>
        <div className="top3-grid">
          {top3.map((movie, index) => (
            <div key={movie.id} className={`top3-card rank-${index + 1}`}>
              <div className="rank-badge">#{index + 1}</div>
              <div className="movie-poster">
                <img
                  src={movie.poster_path
                    ? `${IMG_BASE}${movie.poster_path}`
                    : "/placeholder.png"}
                  alt={movie.title}
                />
                <div className="movie-overlay">
                  <button
                    className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
                    onClick={(e) => onFavoriteClick(e, movie)}
                  >
                    ❤
                  </button>
                </div>
              </div>
              <div className="top3-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                  <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                  <span>🌟 {Math.round(movie.popularity)}</span>
                </div>
                <p className="overview">{movie.overview?.slice(0, 120)}...</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Others */}
      {others.length > 0 && (
        <section className="others-section">
          <h2>🎬 More Good Choices</h2>
          <div className="others-grid">
            {others.map(movie => (
              <div key={movie.id} className="other-card">
                <div className="movie-poster">
                  <img
                    src={movie.poster_path
                      ? `${IMG_BASE}${movie.poster_path}`
                      : "/placeholder.png"}
                    alt={movie.title}
                  />
                  <div className="movie-overlay">
                    <button
                      className={`favorite-btn ${isFavorite(movie.id) ? "active" : ""}`}
                      onClick={(e) => onFavoriteClick(e, movie)}
                    >
                      ❤
                    </button>
                  </div>
                </div>
                <div className="other-info">
                  <h3>{movie.title}</h3>
                  <div className="movie-meta">
                    <span>⭐ {movie.vote_average.toFixed(1)}</span>
                    <span>📅 {new Date(movie.release_date).getFullYear()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}

export default Recommendations;
