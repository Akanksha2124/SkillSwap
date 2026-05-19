import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  if (!token) return null;

  return (
    <nav className="navbar">
      <Link to="/browse" className="navbar-brand">⚡ SkillSwap</Link>
      <div className="navbar-links">
        <Link to="/browse">Browse</Link>
        <Link to="/matches">Matches</Link>
        <Link to="/create-post">Post a Swap</Link>
        <Link to="/profile">My Profile</Link>
        <button className="btn-logout" onClick={logout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;