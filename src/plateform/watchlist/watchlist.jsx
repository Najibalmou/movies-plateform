import PropTypes from "prop-types";
import "./watchlist.css";

function WatchList({ watchlist }) {
    return (
        <div className="watchlist-container">
            <h1>My Watchlist</h1>
            {watchlist.length === 0 ? (
                <p className="empty-watchlist-message">
                    Your watchlist is empty. Add some movies!
                </p>
            ) : (
                <div className="watchlist-items">
                    {watchlist.map((movie) => (
                        <div key={movie.id} className="watchlist-item">
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                }
                                alt={movie.title || movie.name}
                                className="watchlist-poster"
                            />
                            <h3 className="watchlist-title">{movie.title || movie.name}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

WatchList.propTypes = {
    watchlist: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            name: PropTypes.string,
            poster_path: PropTypes.string,
        })
    ).isRequired,
};




export default WatchList;
