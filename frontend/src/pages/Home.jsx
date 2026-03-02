import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {
  const navigate = useNavigate();

  const [searchQuery, SetSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        setMovies(popularMovies);
      } catch (err) {
        console.log(err);
        setError("Failed To Load Movies...");
      } finally {
        setLoading(false);
      }
    };
    loadPopularMovies();
  }, []);

  const HandleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (loading) return;
    setLoading(true);
    try {
      const searchResults = await searchMovies(searchQuery);
      setMovies(searchResults);
      setError(null);
    } catch (err) {
      console.log(err);
      setError("Failed To Search Movies...");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Home">

      {/* Search */}
      <form onSubmit={HandleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for Movies..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => SetSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">Search</button>
      </form>

      {/* 🎯 CTA Banner */}
      <div className="rec-banner">
        <div className="rec-banner-text">
          <h2>🎯 Not sure what to watch?</h2>
          <p>Tell us your taste and we'll find the perfect movie for you</p>
        </div>
        <button
          className="rec-banner-btn"
          onClick={() => navigate("/preferences")}
        >
          Get Recommendations →
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      )}

    </div>
  );
}

export default Home;
