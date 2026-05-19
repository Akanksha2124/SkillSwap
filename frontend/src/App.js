import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Browse from './pages/Browse';
import Matches from './pages/Matches';
import CreatePost from './pages/CreatePost';
import './App.css';

// Protected route wrapper
function Protected({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Protected><Profile /></Protected>} />
        <Route path="/browse" element={<Protected><Browse /></Protected>} />
        <Route path="/matches" element={<Protected><Matches /></Protected>} />
        <Route path="/create-post" element={<Protected><CreatePost /></Protected>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;