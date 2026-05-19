import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createPost } from '../services/api';

function CreatePost() {
  const navigate = useNavigate();
  const userId = parseInt(localStorage.getItem('userId'));
  const userName = localStorage.getItem('name');

  const [form, setForm] = useState({
    title: '',
    description: '',
    skillOffered: '',
    skillWanted: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await createPost({
        authUserId: userId,
        userName,
        ...form
      });
      navigate('/browse');
    } catch {
      setError('Failed to create post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Post a Skill Swap</h1>
        <p className="page-subtitle">Tell the community what you offer and what you're looking for</p>

        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Post Title</label>
              <input
                type="text"
                placeholder='e.g. "Learn Python with me, teach me Guitar"'
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                required
              />
            </div>
            <div className="two-col">
              <div className="form-group">
                <label>Skill I'm Offering</label>
                <input
                  type="text"
                  placeholder="e.g. Python"
                  value={form.skillOffered}
                  onChange={e => setForm({ ...form, skillOffered: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label>Skill I Want in Return</label>
                <input
                  type="text"
                  placeholder="e.g. Guitar"
                  value={form.skillWanted}
                  onChange={e => setForm({ ...form, skillWanted: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={4}
                placeholder="Describe your experience level, availability, preferred format (online/offline)..."
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" type="submit" disabled={loading}>
                {loading ? 'Posting...' : 'Post Swap Request'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => navigate('/browse')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;