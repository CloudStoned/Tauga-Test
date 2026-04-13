import { useState } from 'react'

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      style={{
        fontFamily: 'var(--font-sans)',
        background: 'transparent',
        color: 'var(--text)',
      }}
    >
      <style>
        {`
        *{box-sizing:border-box;}
        html,body{width:100%;height:100%;margin:0;padding:0;}
        #root{width:100%;max-width:none;margin:0;border-inline:0;text-align:left;}

        /* Theme-aligned overrides (Soft Pastel Systems) */
        .lh-page{min-height:100vh;background:transparent;font-family:var(--font-sans);font-size:14px;color:var(--text);}
        .lh-nav{
          border-bottom:1px solid var(--border);
          background:rgba(255,255,255,.55);
          backdrop-filter:saturate(160%) blur(10px);
          width:100%;
          max-width:1100px;
          margin:0 auto;
          box-sizing:border-box;
        }

        .lh-page > .lh-nav{
          position:sticky;
          top:0;
          z-index:10;
        }

        .lh-nav{padding-top:18px;padding-bottom:18px;width:100%;max-width:1100px;margin:0 auto;}
        .lh-page .lh-nav{max-width:1100px;}
        .lh-page{width:100%;}
        .lh-brand{font-weight:900;letter-spacing:-0.3px;font-size:14px;}
        .lh-burger{border:1px solid var(--border);background:rgba(255,255,255,.55);border-radius:12px;transition:transform .15s ease, box-shadow .15s ease, background .15s ease;}
        .lh-burger:focus-visible{outline:none;box-shadow:var(--focus);}
        .lh-menu{padding:0 22px 10px;}
        .lh-menu a{background:rgba(255,255,255,.55);border:1px solid var(--border);color:var(--text);border-radius:14px;padding:12px 14px;margin-bottom:10px;transition:transform .15s ease, box-shadow .15s ease, background .15s ease;}
        .lh-menu a:hover{transform:translateY(-1px);box-shadow:var(--shadow-sm);background:rgba(255,255,255,.78);}

        .lh-hero{padding:72px 18px 34px;}
        .lh-label{border:1px solid rgba(47,91,255,.16);background:rgba(47,91,255,.10);color:var(--text);font-weight:900;box-shadow:0 0 0 1px rgba(255,255,255,.35) inset;}
        .lh-heading{color:var(--text);font-size:46px;letter-spacing:-0.9px;font-weight:900;}
        .lh-subtitle{color:var(--muted);font-size:14px;line-height:1.6;}

        .lh-ctas{gap:12px;}
        .lh-btn{border-radius:16px;min-width:160px;padding:12px 18px;font-weight:900;font-size:14px;transition:transform .15s ease, box-shadow .15s ease, background .15s ease;}
        .lh-btn.outlined{background:rgba(255,255,255,.45);border:1px solid rgba(47,91,255,.35);color:var(--text);box-shadow:0 0 0 1px rgba(255,255,255,.35) inset;}
        .lh-btn.filled{border:1px solid rgba(47,91,255,.55);color:#fff;background:linear-gradient(135deg, rgba(47, 91, 255, 0.95) 0%, rgba(0, 183, 168, 0.95) 100%);box-shadow:0 14px 40px rgba(47, 91, 255, 0.22);}
        .lh-features{max-width:1100px;margin:18px auto 0;padding:0 22px 60px;gap:16px;}
        .lh-card{background:var(--card);border:1px solid var(--border);border-radius:18px;box-shadow:var(--shadow-sm);padding:16px 14px;display:flex;gap:12px;align-items:flex-start;transition:transform .15s ease, box-shadow .15s ease, background .15s ease;}
        .lh-card:hover{transform:translateY(-2px);box-shadow:var(--shadow-md);background:var(--card-strong);}
        .lh-card .lh-ico{background:rgba(47, 91, 255, 0.10);border:1px solid rgba(47, 91, 255, 0.18);}
        .lh-card .lh-ico svg{stroke:rgba(47, 91, 255, 0.95);}
        .lh-card h3{color:var(--text);font-weight:900;}
        .lh-card p{color:var(--muted);font-size:12px;line-height:1.35;}

        /* Legacy template styles follow */
        .lh-page{min-height:100vh;background:var(--color-background);font-family:sans-serif;font-size:12px;color:var(--color-text-primary);}
        .lh-nav{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;max-width:1100px;margin:0 auto;width:100%;}
        :root{
          --color-text-primary:#000000e6;
          --color-text-secondary:#666;
          --color-background:#f7fafc;
          --color-accent:#004370;
        }
        .lh-page{min-height:100svh;background:var(--color-background);font-family:sans-serif;font-size:12px;color:var(--color-text-primary);}
        .lh-nav{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;max-width:1100px;margin:0 auto;}
        .lh-brand{font-weight:600;}
        .lh-burger{width:40px;height:40px;border:0;background:transparent;border-radius:8px;display:grid;place-items:center;cursor:pointer;}
        .lh-burger:focus-visible{outline:2px solid var(--color-accent);outline-offset:2px;}
        .lh-burger svg{width:20px;height:20px;}
        .lh-menu{max-width:1100px;margin:0 auto;padding:0 22px 10px;}
        .lh-menu a{display:block;text-decoration:none;color:var(--color-accent);padding:10px 12px;border-radius:10px;border:1px solid rgba(0,67,112,.15);margin-bottom:10px;}
        .lh-hero{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:70px 18px 30px;}
        .lh-label{display:inline-flex;align-items:center;justify-content:center;padding:6px 10px;border-radius:999px;background:rgba(0,67,112,.12);color:var(--color-accent);font-weight:600;margin-bottom:14px;}
        .lh-heading{font-size:40px;font-weight:800;letter-spacing:-0.6px;margin:0 0 12px;color:var(--color-text-primary);}
        .lh-subtitle{margin:0 auto 22px;max-width:680px;color:var(--color-text-secondary);font-size:13px;line-height:1.55;}\n        .lh-label{font-size:12px;}\n        .lh-hero{position:relative;z-index:1;}\n        h1,.lh-heading{font-family:sans-serif;}\n        p{font-family:sans-serif;}\n        a{font-family:sans-serif;}
        .lh-ctas{display:flex;gap:12px;justify-content:center;align-items:center;flex-wrap:wrap;}
        .lh-btn{border-radius:12px;padding:12px 18px;font-weight:700;font-size:13px;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;min-width:160px;}
        .lh-btn.outlined{border:1px solid var(--color-accent);color:var(--color-accent);background:transparent;}
        .lh-btn.filled{border:1px solid var(--color-accent);color:#fff;background:var(--color-accent);}
        .lh-features{max-width:1100px;margin:18px auto 0;padding:0 22px 60px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;}
        .lh-card{background:#fff;border-radius:14px;box-shadow:0 1px 2px rgba(0,0,0,.06),0 10px 30px rgba(0,0,0,.03);padding:16px 14px;display:flex;gap:12px;align-items:flex-start;}
        .lh-card .lh-ico{width:34px;height:34px;border-radius:12px;background:rgba(0,67,112,.10);display:grid;place-items:center;flex:0 0 auto;}
        .lh-card .lh-ico svg{width:18px;height:18px;fill:none;stroke:var(--color-accent);stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}
        .lh-card h3{margin:2px 0 2px;font-size:13px;font-weight:800;color:var(--color-text-primary);}
        .lh-card p{margin:0;color:var(--color-text-secondary);font-size:12px;line-height:1.35;}
        @media (max-width: 900px){.lh-features{grid-template-columns:1fr;max-width:520px;}.lh-hero{padding-top:48px;}}
      `}
      </style>

      <div className="lh-page" style={{ minHeight: '100vh', width: '100%', margin: 0, padding: 0 }}>
        <header className="lh-nav" style={{ width: '100%', maxWidth: 'none' }}>
          <div className="lh-brand">Cincinnati Hotel</div>
          <button
            className="lh-burger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M6 6l12 12" />
                <path d="M18 6l-12 12" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            )}
          </button>
        </header>

        {menuOpen ? (
          <nav className="lh-menu" aria-label="Navigation">
            <a href="/admin" onClick={() => setMenuOpen(false)}>
              Admin
            </a>
            <a href="/user" onClick={() => setMenuOpen(false)}>
              Regular User
            </a>
          </nav>
        ) : null}

        <main>
          <section className="lh-hero">
            <div className="lh-label">Cincinnati Hotel</div>
            <h1 className="lh-heading">Welcome to Cincinnati Hotel</h1>
            <p className="lh-subtitle">
              Ask our AI assistant anything about our hotel — rooms, pricing,
              facilities, and more.
            </p>

            <div className="lh-ctas">
              <a className="lh-btn outlined" href="/admin">
                Admin
              </a>
              <a className="lh-btn filled" href="/user">
                Regular User
              </a>
            </div>
          </section>

          <section className="lh-features" aria-label="Features">
            <div className="lh-card">
              <div className="lh-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M12 1v4" />
                  <path d="M8.5 4.2l2 3.5" />
                  <path d="M15.5 4.2l-2 3.5" />
                  <path d="M12 7a7 7 0 1 0 7 7" />
                  <path d="M12 14l4-2" />
                </svg>
              </div>
              <div>
                <h3>24/7 AI Support</h3>
                <p>Get answers any time, day or night.</p>
              </div>
            </div>

            <div className="lh-card">
              <div className="lh-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M4 4h16v12H7l-3 3z" />
                  <path d="M8 9h8" />
                  <path d="M8 12h6" />
                </svg>
              </div>
              <div>
                <h3>Instant Answers</h3>
                <p>Quick responses for rooms, pricing, and more.</p>
              </div>
            </div>

            <div className="lh-card">
              <div className="lh-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.5a16 16 0 0 0 6.4 6.4l1.1-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.6 2.6.7A2 2 0 0 1 22 16.9z" />
                </svg>
              </div>
              <div>
                <h3>Easy Contact</h3>
                <p>Reach out when you need help.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
