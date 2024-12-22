import './header.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Header() {
  const navigate = useNavigate(); // Initialize navigate

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const openRegister = () => setIsRegisterOpen(true);
  const closeRegister = () => setIsRegisterOpen(false);
  const openLogin = () => setIsLoginOpen(true);
  const closeLogin = () => setIsLoginOpen(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-theme', !darkMode);
  };


  // Handle Register Submit
  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const username = event.target.elements[0].value;
    const email = event.target.elements[1].value;
    const password = event.target.elements[2].value;

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        closeRegister();
      } else {
        alert(data.message); // Show server error message
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Failed to register');
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(data.user)); // `data.user` contains username and email

        alert(data.message);
        navigate('/plateform'); // Redirect after login
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed, please try again');
    }
  };



  return (
    <>
      <section className="nav-sec">
        <Link to="/" className="logo">NA-MOVIES APP</Link>
        <div className="navbar">
          <Link to="/">Home</Link>
          <a href="#">Movies</a>
          <a href="#">TV Shows</a>
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
          <div>
            <a href="#" className="login" onClick={openLogin}>Login</a>
            <a href="#" className="register" onClick={openRegister}>Register</a>
          </div>
        </div>
      </section>

      {/* Register Popup */}
      {isRegisterOpen && (
        <div className="popup-overlay" onClick={closeRegister}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="Username" required />
              <input type="email" placeholder="Email" required />
              <input type="password" placeholder="Password" required />
              <button type="submit" className="Register-btn-pop-up">Submit</button>
            </form>
            <button className="close-btn" onClick={closeRegister}>✖</button>
          </div>
        </div>
      )}

      {/* Login Popup */}
      {isLoginOpen && (
        <div className="popup-overlay" onClick={closeLogin}>
          <div className="popup-form" onClick={(e) => e.stopPropagation()}>
            <h2>Login</h2>
            <form onSubmit={handleLoginSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Handling input change
              />
              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Handling input change
              />
              <button type="submit" className="Login-btn-pop-up">Login</button>
            </form>
            <button className="close-btn" onClick={closeLogin}>✖</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
