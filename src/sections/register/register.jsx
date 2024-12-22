function Register() {
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegisterSubmit}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
