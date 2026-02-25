### Home Page
![Home Page](screenshots/home-page.png)

### Favorites Page
![Favorites Page](screenshots/favorites-page.png)

# React Movies Project 🎬

A React-based movie browser application that integrates with the TMDb API to display popular movies, provide search functionality, detailed movie information, and favorites management. 
Built with Vite for an optimal development experience.

---

## 🚀 Features

- Browse popular movies fetched from TMDb API
- Search movies by title
- View detailed movie information (poster, rating, overview, release date)
- Add/remove movies to a **Favorites** list
- Dedicated **Favorites** page to see saved movies
- Persistent favorites using `localStorage` (favorites remain after page refresh)
- Responsive layout for desktop and mobile

---

## 🛠 Tech Stack

- **React** (with hooks and context)
- **Vite** (development bundler)
- **TMDb API** for movie data
- **CSS** for styling (custom components, grid layout, etc.)

---

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Zakaria-Karaoui/React-Movies-Project.git
cd React-Movies-Project
Install dependencies

### 2. Install dependencies

npm install

### 3. Configure environment variables
VITE_TMDB_API_KEY=YOUR_TMDB_API_KEY_HERE

### 4. Run the development server
npm run dev

Then open the URL shown in the terminal (usually http://localhost:5173).

📁 Project Structure
src/
  components/
    MovieCard.jsx
    Navbar.jsx
    ...
  pages/
    Home.jsx
    Favorites.jsx
    MovieDetails.jsx
  contexts/
    MovieContext.jsx
  css/
    Favorites.css
    MovieCard.css
    ...
  App.jsx
  main.jsx

📡 TMDb API

This project uses the TMDb API to fetch:

    Popular movies

    Movie details by ID

    Search results by title

You must create a free account and API key on the official TMDb website. Be sure to follow their terms of use and attribution guidelines.

🙌 Acknowledgements

    The Movie Database (TMDb) for providing the movie data API.

    The React and Vite communities for great tooling and documentation.