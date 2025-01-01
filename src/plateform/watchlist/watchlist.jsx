import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import "./watchlist.css";

function WatchList() {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
        setWatchlist(storedWatchlist);
    }, []);

    const removeFromWatchlist = (movieId) => {
        const updatedWatchlist = watchlist.filter(movie => movie.id !== movieId);
        setWatchlist(updatedWatchlist);
        localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
    };

    return (
        <div className="watchlist-container">
            <h1 className="watchlist-txt">My Watchlist</h1>
            {watchlist.length === 0 ? (
                <p className="empty-watchlist-message">
                    Your watchlist is empty. Add some movies or TV shows!
                </p>
            ) : (
                <div className="watchlist-items">
                    {watchlist.map((item) => (
                        <div key={item.id} className="watchlist-item">
                            <div className="watchlist-card">
                                {/* Link to the correct route (movie or tv) */}
                                <Link to={`/${item.type}/${item.id}`}>
                                    <img
                                        src={
                                            item.poster_path
                                                ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                                : "https://via.placeholder.com/200x300?text=No+Image"
                                        }
                                        alt={item.title || item.name}
                                        className="watchlist-poster"
                                    />
                                    <h3 className="watchlist-title">{item.title || item.name}</h3>
                                </Link>
                                <button
                                    className="remove-from-watchlist"
                                    onClick={() => removeFromWatchlist(item.id)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WatchList;
