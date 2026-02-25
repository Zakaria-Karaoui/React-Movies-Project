
import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css"
import { searchMovies, getPopularMovies } from "../services/api";

function Home() {

    const [searchQuery,SetSearchQuery]=useState("") ;
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState (null);
    const [loading, setLoading] = useState(true);

    useEffect (()=> {
      const loadPopularMovies = async () => {
          try {
             const popularMovies= await getPopularMovies()
             setMovies(popularMovies)
          }
          catch (err) {
            console.log(err)
            setError("Failed To Load Movies...")
          }
          finally{
              setLoading(false)
          }
      }

      loadPopularMovies()
    } , [])


const HandleSearch = async(e) => {
  e.preventDefault();
  if (!searchQuery.trim()) return 
  if (loading) return
  setLoading(true)
  try {
     const searchResults = await searchMovies(searchQuery) 
     setMovies(searchResults)   
     setError(null)
  }
  catch(err) {
    console.log(err)
    setError("Failed To search Movies...")
  }
  finally {
    setLoading(false)
  }

};

  return (   
  <div className="Home">
      <form onSubmit={HandleSearch} className="search-form"> 
        <input type="text" 
               placeholder="Search for Movies..." 
               className="search-input"
               value={searchQuery}
               onChange={(e)=>SetSearchQuery(e.target.value)}
               />  
        <button type="submit" className="search-button">Search</button>
      </form>   

      {error && <div className="error-message">{error}</div>}
   
      {loading ? (<div className="loading">Loading...</div> 
      ) 
      : 
      (<div className="movies-grid">
          {movies.map((movie)=> 
            (<MovieCard movie={movie} key={movie.id}/> ))} 
        </div> ) 
      }
      
    </div>
 );
}

export default Home;