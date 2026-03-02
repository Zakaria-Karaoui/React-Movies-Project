import "../css/MovieCard.css"
import { useMovieContext } from "../contexts/MovieContext"

const IMG_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        e.preventDefault()
        if (favorite) removeFromFavorites(movie.id)
        else addToFavorites(movie)
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img
                    src={movie.poster_path
                        ? `${IMG_BASE}${movie.poster_path}`
                        : "/placeholder.png"}
                    alt={movie.title}
                />
                <div className="movie-overlay">
                    <button
                        className={`favorite-btn ${favorite ? "active" : ""}`}
                        onClick={onFavoriteClick}
                    >
                        ❤
                    </button>
                    <p className="overview">{movie.overview?.slice(0, 120)}...</p>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta">
                    <span>⭐ {movie.vote_average?.toFixed(1)}</span>
                    <span>📅 {movie.release_date?.split("-")[0]}</span>
                    <span>🌟 {Math.round(movie.popularity)}</span>
                </div>
            </div>
        </div>
    )
}

export default MovieCard
