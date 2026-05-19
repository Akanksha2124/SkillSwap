import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getAllPosts, searchPosts, deletePost } from '../services/api';

function Browse() {
  const userId = parseInt(localStorage.getItem('userId'));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [offering, setOffering] = useState('');
  const [wanting, setWanting] = useState('');

  useEffect(() => { loadPosts(); }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const res = await getAllPosts();
      setPosts(res.data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const res = await searchPosts(offering || undefined, wanting || undefined);
      setPosts(res.data);
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePost(id);
      setPosts(posts.filter(p => p.id !== id));
    } catch {
      alert('Failed to delete post');
    }
  };

  const handleClear = () => {
    setOffering('');
    setWanting('');
    loadPosts();
  };

  if (loading) return <><Navbar /><div className="loading">Loading posts...</div></>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Skill Swap Board</h1>
        <p className="page-subtitle">Browse skill exchange requests from the community</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="They offer... (e.g. Guitar)"
            value={offering}
            onChange={e => setOffering(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <input
            type="text"
            placeholder="They want... (e.g. Python)"
            value={wanting}
            onChange={e => setWanting(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>Search</button>
          {(offering || wanting) && (
            <button onClick={handleClear} style={{ background: 'white', color: '#555', border: '1px solid #e0e0e0' }}>
              Clear
            </button>
          )}
        </div>

        {posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <p>No posts found. Be the first to post a skill swap!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="card">
              <div className="post-title">{post.title}</div>
              <div className="post-description">{post.description}</div>
              <div className="post-meta">
                <span className="skill-tag offered">Offers: {post.skillOffered}</span>
                <span className="skill-tag wanted">Wants: {post.skillWanted}</span>
                <span className="post-author">by {post.userName}</span>
                {post.authUserId === userId && (
                  <button className="btn-danger" onClick={() => handleDelete(post.id)}>Delete</button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Browse;