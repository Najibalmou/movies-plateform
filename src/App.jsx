import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './sections/header/Header';
import PlatformHeader from './plateform/header/Header';
import Movies from './sections/movies/movies';
import Plateform from './plateform/plateform';
import Footer from './sections/Footer/footer';
import MovieDetail from './plateform/movieDetail';
import WatchList from './plateform/watchlist/watchlist';
import './App.css';
import { useState } from 'react';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [watchlist, setWatchlist] = useState([]); // Watchlist state

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-theme', !isDarkMode);
  };

  const addToWatchlist = (movie) => {
    // Prevent duplicates
    if (!watchlist.some((item) => item.id === movie.id)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Header Routes */}
        <Route path="/" element={<Header toggleTheme={toggleTheme} />} />
        <Route path="/:type/:id" element={<PlatformHeader toggleTheme={toggleTheme} />} />
        <Route path="/plateform" element={<PlatformHeader toggleTheme={toggleTheme} />} />
        <Route path="/WatchList" element={<PlatformHeader toggleTheme={toggleTheme} />} />
      </Routes>

      {/* Content Routes */}
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/plateform" element={<Plateform />} />
        <Route
          path="/:type/:id"
          element={<MovieDetail addToWatchlist={addToWatchlist} />} // Pass addToWatchlist
        />
        <Route
          path="/WatchList"
          element={<WatchList watchlist={watchlist} />} // Pass watchlist to WatchList
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
