import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getProfile, createProfile, updateProfile } from '../services/api';

function Profile() {
  const userId = parseInt(localStorage.getItem('userId'));
  const name = localStorage.getItem('name');
  const email = localStorage.getItem('email');

  const [profile, setProfile] = useState(null);
  const [bio, setBio] = useState('');
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [newOfferedSkill, setNewOfferedSkill] = useState('');
  const [newOfferedLevel, setNewOfferedLevel] = useState('Beginner');
  const [newWantedSkill, setNewWantedSkill] = useState('');
  const [newWantedLevel, setNewWantedLevel] = useState('Beginner');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile(userId);
      setProfile(res.data);
      setBio(res.data.bio);
      setSkillsOffered(res.data.skillsOffered || []);
      setSkillsWanted(res.data.skillsWanted || []);
    } catch {
      setIsNew(true);
    } finally {
      setLoading(false);
    }
  };

  const addOfferedSkill = () => {
    if (!newOfferedSkill.trim()) return;
    setSkillsOffered([...skillsOffered, { skill: newOfferedSkill.trim(), level: newOfferedLevel }]);
    setNewOfferedSkill('');
  };

  const addWantedSkill = () => {
    if (!newWantedSkill.trim()) return;
    setSkillsWanted([...skillsWanted, { skill: newWantedSkill.trim(), level: newWantedLevel }]);
    setNewWantedSkill('');
  };

  const removeOffered = (index) => setSkillsOffered(skillsOffered.filter((_, i) => i !== index));
  const removeWanted = (index) => setSkillsWanted(skillsWanted.filter((_, i) => i !== index));

  const handleSave = async () => {
    setMessage('');
    setError('');
    const data = { authUserId: userId, name, email, bio, skillsOffered, skillsWanted };
    try {
      if (isNew) {
        await createProfile(data);
        setIsNew(false);
      } else {
        await updateProfile(userId, { bio, skillsOffered, skillsWanted });
      }
      setMessage('Profile saved successfully!');
    } catch (err) {
      setError('Failed to save profile. Please try again.');
    }
  };

  if (loading) return <><Navbar /><div className="loading">Loading profile...</div></>;

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h1 className="page-title">My Profile</h1>
        <p className="page-subtitle">Tell the community what you can teach and what you want to learn</p>

        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-error">{error}</div>}

        <div className="card">
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={name} disabled style={{ background: '#f5f5f5', color: '#999' }} />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" value={email} disabled style={{ background: '#f5f5f5', color: '#999' }} />
          </div>
          <div className="form-group">
            <label>Bio</label>
            <textarea
              rows={3}
              placeholder="Tell others about yourself..."
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, color: '#2e7d32' }}>✅ Skills I Can Teach</h3>
          <div className="skill-input-row">
            <input
              type="text"
              placeholder="e.g. Python, Guitar, Photoshop"
              value={newOfferedSkill}
              onChange={e => setNewOfferedSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addOfferedSkill()}
            />
            <select value={newOfferedLevel} onChange={e => setNewOfferedLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button onClick={addOfferedSkill}>+ Add</button>
          </div>
          <div className="skill-tags">
            {skillsOffered.map((s, i) => (
              <span key={i} className="skill-tag offered">
                {s.skill} · {s.level}
                <button onClick={() => removeOffered(i)}>×</button>
              </span>
            ))}
            {skillsOffered.length === 0 && <span style={{ color: '#aaa', fontSize: 14 }}>No skills added yet</span>}
          </div>
        </div>

        <div className="card">
          <h3 style={{ marginBottom: 16, color: '#1565c0' }}>📚 Skills I Want to Learn</h3>
          <div className="skill-input-row">
            <input
              type="text"
              placeholder="e.g. React, Spanish, Piano"
              value={newWantedSkill}
              onChange={e => setNewWantedSkill(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addWantedSkill()}
            />
            <select value={newWantedLevel} onChange={e => setNewWantedLevel(e.target.value)}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
            <button onClick={addWantedSkill}>+ Add</button>
          </div>
          <div className="skill-tags">
            {skillsWanted.map((s, i) => (
              <span key={i} className="skill-tag wanted">
                {s.skill} · {s.level}
                <button onClick={() => removeWanted(i)}>×</button>
              </span>
            ))}
            {skillsWanted.length === 0 && <span style={{ color: '#aaa', fontSize: 14 }}>No skills added yet</span>}
          </div>
        </div>

        <button className="btn-primary" onClick={handleSave}>Save Profile</button>
      </div>
    </>
  );
}

export default Profile;