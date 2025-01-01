import { useState, useEffect } from "react";
import './movies.css';
import BgImage from "./assets/wall2.jpg";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [tvShows, setTvShows] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]); // State for top rated movies
    const [showAllMovies, setShowAllMovies] = useState(false); // State to toggle movie list
    const [showAllTv, setShowAllTv] = useState(false); // State to toggle TV show list
    const [showAllTopRated, setShowAllTopRated] = useState(false); // State to toggle top-rated movie list
    const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup

    const API_KEY = "5235afbaadc922364aca22692c2f6a08"; // API Key

    const MOVIE_BASE_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
    const TV_BASE_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;
    const TOP_RATED_MOVIE_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`; // URL for top-rated movies

    // List of titles to exclude
    const excludedTitles = [
        "Heavenly Touch",
        "The Substance",
        "Freedom",
        "Pleasure",
        "Japanese Mom",
        "Barbie",
        "My Old Ass",
        "Like Water for Chocolate",
        "Female Teacher: In Front of the Students",
        "We Live in Time",
        "xXx",
        "Hot Frosty",
        "Time Cut",
        "Dakaichi: I'm Being Harassed by the Sexiest Man of the Year—The Movie: In Spain",
        "Tatsulok: Tatlo Magkasalo",
        "Hello, Love, Again",
        "Busty Girlfriend",
        "365 Days: This Day",
        "Anora",
        "Titanic",
        "Twilight",
        "Let's Go To Rose Motel",
        "The Invention of Flesh",
        "Un/Happy for You",
        "Love, Rosie",
        "The Flesh",
        "Culpa Tuya",
        "Bangkok Breaking: Heaven and Hell",
        "Fifty Shades of Grey",
        "The Gigolo",
        "Harold and the Purple Crayon",
        "Smile 2",
        "Apocalypse Z: The Beginning of the End",
        "Deadpool & Wolverine",
        "Transformers One",
        "It Ends with Us",
        "The Canterville Ghost",





        "Tagesschau",
        "Papás por Conveniencia",
        "Shrimad Ramayan",
        "rbb24 Brandenburg aktuell",
        "Ready Steady Cook South Africa",
        "Cacau",
        "Plus belle la vie, encore plus belle",
        "My Merry Marriage",
        "Return to Las Sabinas",
        "Ici tout commence",
        "Strictly Come Dancing: It Takes Two",
        "Pituca Sin Lucas",
        "Smile Code",
        "Tomorrow Is Ours",
        "Mom for rent",
        "La mujer de mi vida",
        "Overflow",
        "叶罗丽梦奇境",
        "Hallo Hessen",
        "A Girl's Guide to 21st Century Sex",
        "Lady Night",
        "Clone High",
        "Lang Leve de Liefde",
        "Come Home Love: Lo and Behold",
        "Sinterklaasjournaal",
        "A Promessa",







        "Dilwale Dulhania Le Jayenge",
        "Pulp Fiction",
        "Your Name."
    ];

    // Fetching movies
    const fetchMovies = async () => {
        try {
            const allMovies = [];
            const totalPages = 5; // Number of pages to fetch

            for (let page = 1; page <= totalPages; page++) {
                const response = await fetch(`${MOVIE_BASE_URL}&page=${page}`);
                const data = await response.json();
                const filteredMovies = data.results.filter(movie =>
                    !excludedTitles.includes(movie.title) // Filter out excluded titles
                );
                allMovies.push(...filteredMovies); // Add the filtered movies to the list
            }

            setMovies(allMovies);
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    };

    // Fetching TV shows
    const fetchTvShows = async () => {
        try {
            const allTvShows = [];
            const totalPages = 4; // Number of pages to fetch

            for (let page = 1; page <= totalPages; page++) {
                const response = await fetch(`${TV_BASE_URL}&page=${page}`);
                const data = await response.json();
                const filteredTvShows = data.results.filter(tvShow =>
                    !excludedTitles.includes(tvShow.name) // Filter out excluded titles for TV shows
                );
                allTvShows.push(...filteredTvShows); // Add the filtered TV shows to the list
            }

            setTvShows(allTvShows);
        } catch (error) {
            console.error("Error fetching TV shows:", error);
        }
    };

    // Fetching top rated movies
    const fetchTopRatedMovies = async () => {
        try {
            const response = await fetch(TOP_RATED_MOVIE_URL);
            const data = await response.json();
            const filteredTopRatedMovies = data.results.filter(movie =>
                !excludedTitles.includes(movie.title) // Filter out excluded titles for top-rated movies
            );
            setTopRatedMovies(filteredTopRatedMovies); // Set the filtered top-rated movies
        } catch (error) {
            console.error("Error fetching top rated movies:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
        fetchTvShows();
        fetchTopRatedMovies(); // Fetch top rated movies
    }, []);


    const handleMovieClick = () => {
        setIsPopupVisible(true);
        setTimeout(() => {
            setIsPopupVisible(false); // Auto-hide popup after 4 seconds
        }, 8000);
    };


    // Determine which movies, TV shows, and top rated movies to display
    const displayedMovies = showAllMovies ? movies : movies.slice(0, 7);
    const displayedTvShows = showAllTv ? tvShows : tvShows.slice(0, 7);
    const displayedTopRatedMovies = showAllTopRated ? topRatedMovies : topRatedMovies.slice(0, 7);


    // const [backgroundImage, setBackgroundImage] = useState("");

    // useEffect(() => {
    //     // Define the page number and movie index
    //     const page = Math.ceil(70 / 20); // Calculate the page based on the movie index (25 in this case)
    //     const movieIndex = (25 % 20) - 1; // Calculate the movie index within the page

    //     fetch(`https://api.themoviedb.org/3/movie/popular?api_key=5235afbaadc922364aca22692c2f6a08&page=${page}`)
    //       .then((response) => response.json())
    //       .then((data) => {
    //         console.log("API Response:", data); // Debug response
    //         const movie = data.results[movieIndex]; // Get the movie from the current page
    //         const imageUrl = movie?.poster_path
    //           ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    //           : "https://via.placeholder.com/800x400?text=No+Image+Available";
    //         console.log("Image URL:", imageUrl);
    //         setBackgroundImage(imageUrl);
    //       })
    //       .catch((error) => console.error("Error fetching movie data:", error));
    //   }, []);



    return (
        <>

            <div className="background-container">
                <div
                    className="background-image"
                    style={{
                        backgroundImage: `url(${BgImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        height: "550px",
                        width: "100%",
                    }}
                ></div>
                <div className="background-text">
                    <h1>Welcome to Movie-Platform</h1>
                    <p>Watch all the movies you want</p>
                    <button className="login-bg-btn">Explore movies</button>
                </div>
            </div>



            {/* Movies Section */}
            <div>
                <div className="movies-btnshow">
                    <h2 className="movie-text">Movies</h2>
                    <button className="show-more" onClick={() => setShowAllMovies(!showAllMovies)}>
                        {showAllMovies ? "Show less" : "Show more"}
                    </button>
                </div>
                <div className="movies-cards">
                    {displayedMovies.map((movie) => (
                        <div key={movie.id} className="movie-card" onClick={handleMovieClick}>
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                }
                                alt={movie.title}
                            />
                            <h3 className="movie-title">{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* TV Shows Section */}
            <div>
                <div className="movies-btnshow">
                    <h2 className="movie-text">TV Shows</h2>
                    <button className="show-more" onClick={() => setShowAllTv(!showAllTv)}>
                        {showAllTv ? "Show less" : "Show more"}
                    </button>
                </div>
                <div className="movies-cards">
                    {displayedTvShows.map((tvShow) => (
                        <div key={tvShow.id} className="movie-card" onClick={handleMovieClick}>
                            <img
                                src={
                                    tvShow.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                }
                                alt={tvShow.name}
                            />
                            <h3 className="movie-title">{tvShow.name}</h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Top Rated Movies Section */}
            <div>
                <div className="movies-btnshow">
                    <h2 className="movie-text">Top Rated Movies</h2>
                    <button className="show-more" onClick={() => setShowAllTopRated(!showAllTopRated)}>
                        {showAllTopRated ? "Show less" : "Show more"}
                    </button>
                </div>
                <div className="movies-cards">
                    {displayedTopRatedMovies.map((movie) => (
                        <div key={movie.id} className="movie-card" onClick={handleMovieClick}>
                            <img
                                src={
                                    movie.poster_path
                                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                        : "https://via.placeholder.com/200x300?text=No+Image"
                                }
                                alt={movie.title}
                            />
                            <h3 className="movie-title">{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </div>


            {isPopupVisible && (
                <div className="popup-overlay fade-out">
                    <div className="popup-content">
                        <button className="close-btn" onClick={() => setIsPopupVisible(false)}>
                            ✖
                        </button>
                        <div className="popup-message">
                            <span className="popup-icon">⚠️</span>
                            <span className="popup-text">You need to log in to access and watch movies!</span>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default Movies;
