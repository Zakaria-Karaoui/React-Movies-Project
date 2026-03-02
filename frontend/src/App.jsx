import './css/App.css'
import NavBar from './components/NavBar'
import Footer from './components/footer'
import Favorites from './pages/Favorites'
import Home from './pages/Home'
import Preferences from './pages/Preferences'
import Recommendations from './pages/Recommendations'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'

function App() {
  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/"                element={<Home />} />
            <Route path="/favorites"       element={<Favorites />} />
            <Route path="/preferences"     element={<Preferences />} />
            <Route path="/recommendations" element={<Recommendations />} />
          </Routes>
        </main>
        <Footer />
      </MovieProvider>
    </>
  )
}

export default App
