import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getMatches } from '../services/api';

function Matches() {
  const userId = parseInt(localStorage.getItem('userId'));
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMatches(userId)
      .then(res => setMatches(res.data))
      .catch(() => setMatches([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <><Navbar /><div className="loading">Finding your matches...</div></>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">Your Skill Matches</h1>
        <p className="page-subtitle">
          These users can teach you what you want, and want to learn what you can teach
        </p>

        {matches.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <p>No matches found yet. Update your profile with more skills to find matches!</p>
          </div>
        ) : (
          matches.map((match, i) => (
            <div key={i} className="card">
              <div className="match-badge">✓ Perfect Match</div>
              <div className="profile-name">{match.name}</div>
              <div className="profile-bio">{match.bio || 'No bio provided'}</div>

              <div className="two-col">
                <div className="skills-section">
                  <div className="skills-label">They can teach you</div>
                  <div className="skill-tags">
                    {match.skillsOffered?.map((s, j) => (
                      <span key={j} className="skill-tag offered">{s.skill} · {s.level}</span>
                    ))}
                  </div>
                </div>
                <div className="skills-section">
                  <div className="skills-label">They want to learn</div>
                  <div className="skill-tags">
                    {match.skillsWanted?.map((s, j) => (
                      <span key={j} className="skill-tag wanted">{s.skill} · {s.level}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 16 }}>
                <a href={`mailto:${match.email}`} className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
                  ✉ Contact {match.name.split(' ')[0]}
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default Matches;