const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const handleClick = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <nav className="navbar">
      <h1>Book Library</h1>
      <div className="links">
        <a href="/">Home</a>

        {isAuthenticated && (
          <>
            <a href="/add-book">Add Book</a>
            <span>{JSON.parse(localStorage.getItem("user")).email}</span>
            <button onClick={handleClick}>Log out</button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Signup</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;