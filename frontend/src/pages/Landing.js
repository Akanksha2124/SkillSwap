import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", color: '#333' }}>

      {/* ── NAVBAR ── */}
      <nav style={{
        background: 'white', borderBottom: '1px solid #e0e0e0',
        padding: '0 60px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', height: 64,
        boxShadow: '0 1px 4px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: '#4F46E5' }}>⚡ SkillSwap</div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link to="/login" style={{
            textDecoration: 'none', color: '#555', padding: '8px 20px',
            borderRadius: 8, fontWeight: 500, fontSize: 15
          }}>Sign In</Link>
          <Link to="/register" style={{
            textDecoration: 'none', background: '#4F46E5', color: 'white',
            padding: '8px 20px', borderRadius: 8, fontWeight: 600, fontSize: 15
          }}>Get Started</Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%)',
        padding: '100px 60px', textAlign: 'center'
      }}>
        <div style={{
          display: 'inline-block', background: '#ede9fe', color: '#4F46E5',
          padding: '6px 18px', borderRadius: 20, fontSize: 13,
          fontWeight: 600, marginBottom: 24
        }}>
          🎓 Free Peer-to-Peer Skill Exchange
        </div>
        <h1 style={{
          fontSize: 56, fontWeight: 800, color: '#1a1a2e',
          lineHeight: 1.15, marginBottom: 24, maxWidth: 700, margin: '0 auto 24px'
        }}>
          Teach what you know.<br />
          <span style={{ color: '#4F46E5' }}>Learn what you want.</span>
        </h1>
        <p style={{
          fontSize: 19, color: '#666', maxWidth: 560,
          margin: '0 auto 40px', lineHeight: 1.7
        }}>
          SkillSwap connects people who want to exchange skills — no money, no subscriptions.
          Just mutual learning between real people.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" style={{
            textDecoration: 'none', background: '#4F46E5', color: 'white',
            padding: '16px 36px', borderRadius: 12, fontWeight: 700,
            fontSize: 16, boxShadow: '0 4px 20px rgba(79,70,229,0.3)'
          }}>
            Start Swapping Free →
          </Link>
          <Link to="/login" style={{
            textDecoration: 'none', background: 'white', color: '#4F46E5',
            padding: '16px 36px', borderRadius: 12, fontWeight: 700,
            fontSize: 16, border: '2px solid #4F46E5'
          }}>
            Sign In
          </Link>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex', gap: 48, justifyContent: 'center',
          marginTop: 64, flexWrap: 'wrap'
        }}>
          {[
            { number: '100%', label: 'Free Forever' },
            { number: '2-Way', label: 'Skill Matching' },
            { number: '3', label: 'Level Validation' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: '#4F46E5' }}>{stat.number}</div>
              <div style={{ fontSize: 14, color: '#888', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ padding: '80px 60px', background: 'white', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          How It Works
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 56 }}>
          Three simple steps
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 32, maxWidth: 900, margin: '0 auto'
        }}>
          {[
            { step: '01', icon: '👤', title: 'Create Your Profile', desc: 'List the skills you can teach with your proficiency level — Beginner, Intermediate, or Advanced.' },
            { step: '02', icon: '🎯', title: 'Declare What You Want', desc: 'Add the skills you want to learn. Our algorithm instantly finds users whose offers match your needs.' },
            { step: '03', icon: '🤝', title: 'Connect and Exchange', desc: 'Browse your matches, explore the swap board, and connect with the perfect skill exchange partner.' },
          ].map((item, i) => (
            <div key={i} style={{
              background: '#fafafa', borderRadius: 16, padding: '36px 28px',
              border: '1px solid #f0f0f0', textAlign: 'left'
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#4F46E5', marginBottom: 16 }}>STEP {item.step}</div>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{item.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e', marginBottom: 12 }}>{item.title}</h3>
              <p style={{ fontSize: 14, color: '#666', lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── FEATURES ── */}
      <div style={{ padding: '80px 60px', background: '#f5f7fa', textAlign: 'center' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#4F46E5', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 }}>
          Features
        </div>
        <h2 style={{ fontSize: 36, fontWeight: 800, color: '#1a1a2e', marginBottom: 56 }}>
          Everything you need to swap skills
        </h2>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 24, maxWidth: 900, margin: '0 auto'
        }}>
          {[
            { icon: '🔄', title: 'Bidirectional Matching', desc: 'Our algorithm finds users where both sides benefit — you teach them, they teach you.' },
            { icon: '📊', title: 'Level Validation', desc: 'Never get matched with someone below your required level. We validate proficiency both ways.' },
            { icon: '📋', title: 'Swap Board', desc: 'Post your skill exchange requests and browse what others are offering in return.' },
            { icon: '🔍', title: 'Smart Search', desc: 'Find posts by skill name instantly — search who offers Guitar or who wants Python.' },
            { icon: '🔒', title: 'Secure Auth', desc: 'JWT-based authentication with BCrypt password hashing keeps your account safe.' },
            { icon: '☁️', title: 'Cloud Native', desc: 'Built on Kubernetes with auto-scaling — handles any load with zero downtime.' },
          ].map((f, i) => (
            <div key={i} style={{
              background: 'white', borderRadius: 16, padding: '28px 24px',
              border: '1px solid #f0f0f0', textAlign: 'left'
            }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div style={{
        background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)',
        padding: '80px 60px', textAlign: 'center'
      }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, color: 'white', marginBottom: 16 }}>
          Ready to start swapping?
        </h2>
        <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.8)', marginBottom: 40 }}>
          Join SkillSwap today. It's completely free, forever.
        </p>
        <Link to="/register" style={{
          textDecoration: 'none', background: 'white', color: '#4F46E5',
          padding: '18px 44px', borderRadius: 12, fontWeight: 800,
          fontSize: 16, display: 'inline-block'
        }}>
          Create Free Account →
        </Link>
      </div>

      {/* ── FOOTER ── */}
      <div style={{
        background: '#1a1a2e', padding: '40px 60px',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: 16
      }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: 'white' }}>⚡ SkillSwap</div>
        <div style={{ fontSize: 13, color: '#666' }}>
          Built with ASP.NET Core · Docker · Kubernetes · React
        </div>
        <div style={{ fontSize: 13, color: '#666' }}>
          © 2026 SkillSwap. All rights reserved.
        </div>
      </div>

    </div>
  );
}

export default Landing;