
import MovieCard from "../components/MovieCard";
import { useState } from "react";
import "../css/Home.css"

function Home() {

    const [searchQuery,SetSearchQuery]=useState("") ;

    const movies= [
     {id: 1, title:"John Wick", release_date: "2026"},
     {id: 2, title:"Tom Cruise", release_date: "2025"},
     {id: 3, title:"Zakaria Karaoui", release_date: "2024"},
     {id: 4, title:"Jacky Chan", release_date: "2024"},
   ]

const HandleSearch = (e) => {
  e.preventDefault();
  alert(searchQuery);
}

  return (   
  <div className="Home">
      <form onSubmit={HandleSearch} className="search-form"> 
        <input type="text" 
               placeholder="Search for Movies..." 
               className="Search-Movies"
               value={searchQuery}
               onChange={(e)=>SetSearchQuery(e.target.value)}
               />  
        <button type="submit" className="search-button">Search</button>
      </form>   

      <div className="movie-grid">
          {movies.map((movie)=> 
            (<MovieCard movie={movie} key={movie.id}/> ))} 
      </div>
    </div>
 );
}

export default Home;