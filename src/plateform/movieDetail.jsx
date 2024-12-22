import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import './movieDetail.css';

function MovieDetail({ addToWatchlist }) {
    const { id, type } = useParams();
    const [details, setDetails] = useState(null);
    const [videoKey, setVideoKey] = useState(null); // State to store the video key
    const API_KEY = "5235afbaadc922364aca22692c2f6a08";

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}?api_key=${API_KEY}&language=en-US`
                );
                const data = await response.json();
                setDetails(data);
            } catch (error) {
                console.error(`Error fetching ${type} details:`, error);
            }
        };

        const fetchVideo = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${API_KEY}&language=en-US`
                );
                const data = await response.json();
                const video = data.results.find(
                    (video) => video.type === "Trailer" && video.site === "YouTube"
                );
                if (video) setVideoKey(video.key);
            } catch (error) {
                console.error(`Error fetching ${type} video:`, error);
            }
        };

        fetchDetails();
        fetchVideo();
    }, [id, type]);

    if (!details) {
        return <div>Loading...</div>;
    }

    return (
        <div className="vidMovie-infos">
            <div className="movie">
                {videoKey ? (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${videoKey}`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p className="info-movie">No trailer available</p>
                )}
            </div>
            <div>
                <img
                    className="img-movie"
                    src={details.poster_path ? `https://image.tmdb.org/t/p/w500${details.poster_path}` : "https://via.placeholder.com/200x300?text=No+Image"}
                    alt={details.title || details.name}
                />
            </div>
            <div className="infos">
                <h1 className="info-movie">{details.title || details.name}</h1>
                <p className="info-movie-overview">{details.overview}</p>
                <p className="info-movie">
                    Release Date: <span className="info-movie-value">{details.release_date || details.first_air_date}</span>
                </p>
                <p className="info-movie">
                    Vote Average: <span className="info-movie-value">{details.vote_average}</span>
                </p>
                <p className="info-movie">
                    Vote Count: <span className="info-movie-value">{details.vote_count}</span>
                </p>
                <button onClick={() => addToWatchlist(details)} className="add-to-watchlist">Add to Watchlist</button>
            </div>
        </div>
    );
}

MovieDetail.propTypes = {
    addToWatchlist: PropTypes.func.isRequired // Validate addToWatchlist is a function
};

export default MovieDetail;
