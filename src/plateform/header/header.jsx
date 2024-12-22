import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';

function Header() {
    const [darkMode, setDarkMode] = useState(false);
    const [username, setUsername] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const navigate = useNavigate();
    const API_KEY = "5235afbaadc922364aca22692c2f6a08";

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-theme', !darkMode);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUsername(null);
        setDropdownVisible(false);
        navigate('/');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            try {
                const parsedUser = JSON.parse(user);
                setUsername(parsedUser.username);
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, []);

    const handleSearch = async (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}`
            );
            const data = await response.json();
            setSearchResults(data.results || []);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    const handleResultClick = (id, type) => {
        navigate(`/${type}/${id}`);
        setSearchQuery('');
        setSearchResults([]);
    };

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    return (
        <section className="nav-sec">
            <Link to="/plateform" className="logo">
                NA-MOVIES APP
            </Link>
            <div className="navbar">
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search Movies .."
                        value={searchQuery}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <ul className="search-results">
                            {searchResults.map((result) => (
                                <li
                                    key={result.id}
                                    onClick={() => handleResultClick(result.id, result.media_type || 'movie')}
                                >
                                    {result.title || result.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <Link to="/plateform">Home</Link>
                <a href="#">Movies</a>
                <a href="#">Tv Shows</a>
                <a href="#">Top Rated</a>
            </div>
            <div className="login-register-div">
                <div className="theme-toggle-container">
                    <input
                        type="checkbox"
                        className="checkbox"
                        id="checkbox"
                        checked={darkMode}
                        onChange={toggleTheme}
                    />
                    <label htmlFor="checkbox" className="checkbox-label">
                        <i className={`fas fa-moon ${darkMode ? 'active' : ''}`}></i>
                        <i className={`fas fa-sun ${darkMode ? '' : 'active'}`}></i>
                        <span className="ball"></span>
                    </label>
                </div>
                {username && (
                    <div className="user-dropdown">
                        <i
                            className="fas fa-user-circle user-icon"
                            onClick={toggleDropdown}
                            style={{ fontSize: '30px', cursor: 'pointer' }}
                        ></i>
                        {dropdownVisible && (
                            <div className="dropdown-menu">
                                <span className="UserName">{username}</span>
                                <a href="/watchlist" className="WatchList">My WatchList</a>
                                <a href="#" onClick={handleLogout} className="logout">
                                    Logout
                                </a>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Header;
