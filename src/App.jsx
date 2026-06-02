import { useState, useEffect } from "react";
import "./App.css";

// ─── Data ───────────────────────────────────────────────────────────────────

const SKILLS = ["React", "JavaScript", "HTML/CSS", "Git", "Node.js", "Tailwind"];

const PHOTOS = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Vipin&backgroundColor=b6e3f4",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Vipin2&backgroundColor=ffd5dc",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Vipin3&backgroundColor=c0aede",
];

const MOVIES = [
  { id: 1,  title: "Inception",                 year: 2010, genre: "Sci-Fi", rating: 8.8, poster: "🎬" },
  { id: 2,  title: "The Dark Knight",            year: 2008, genre: "Action", rating: 9.0, poster: "🦇" },
  { id: 3,  title: "Interstellar",               year: 2014, genre: "Sci-Fi", rating: 8.6, poster: "🪐" },
  { id: 4,  title: "Pulp Fiction",               year: 1994, genre: "Crime",  rating: 8.9, poster: "💼" },
  { id: 5,  title: "The Godfather",              year: 1972, genre: "Crime",  rating: 9.2, poster: "🌹" },
  { id: 6,  title: "Forrest Gump",               year: 1994, genre: "Drama",  rating: 8.8, poster: "🏃" },
  { id: 7,  title: "The Matrix",                 year: 1999, genre: "Sci-Fi", rating: 8.7, poster: "💊" },
  { id: 8,  title: "Goodfellas",                 year: 1990, genre: "Crime",  rating: 8.7, poster: "🔫" },
  { id: 9,  title: "Fight Club",                 year: 1999, genre: "Drama",  rating: 8.8, poster: "🥊" },
  { id: 10, title: "The Shawshank Redemption",   year: 1994, genre: "Drama",  rating: 9.3, poster: "⛏️" },
];

// ─── Part A Components ───────────────────────────────────────────────────────

function SkillBadge({ skill }) {
  return <span className="skill-badge">{skill}</span>;
}

function StatCard({ value, label }) {
  return (
    <div className="stat-card">
      <span className="stat-num">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function PortfolioCard() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [likes, setLikes]           = useState(0);
  const [liked, setLiked]           = useState(false);

  const cyclePhoto  = () => setPhotoIndex(i => (i + 1) % PHOTOS.length);
  const handleLike  = () => { setLiked(l => !l); setLikes(n => liked ? n - 1 : n + 1); };
  const handleAlert = () => alert("Thanks for visiting my portfolio! 🎉");

  return (
    <div className="portfolio-card">
      <div className="card-header">
        <div className="avatar-wrap" onClick={cyclePhoto} title="Click to cycle photo">
          <img src={PHOTOS[photoIndex]} alt="Profile avatar" className="avatar" />
          <span className="avatar-hint">click to change</span>
        </div>
        <div className="profile-info">
          <h2 className="profile-name">Vipin Kushwaha</h2>
          <p className="profile-title">React Developer · TuteDude</p>
          <p className="profile-bio">
            Building interactive UIs with React. Currently mastering component
            architecture, state management, and modern frontend patterns.
          </p>
        </div>
      </div>

      <div className="skills-section">
        <p className="section-label">Skills</p>
        <div className="skills-grid">
          {SKILLS.map(s => <SkillBadge key={s} skill={s} />)}
        </div>
      </div>

      <div className="stats-row">
        <StatCard value={12}    label="Projects" />
        <StatCard value={3}     label="Months"   />
        <StatCard value={likes} label="Likes"    />
      </div>

      <div className="card-actions">
        <button className={`btn-like ${liked ? "liked" : ""}`} onClick={handleLike}>
          {liked ? "❤️ Liked" : "🤍 Like"}
        </button>
        <button className="btn-contact" onClick={handleAlert}>
          Contact Me
        </button>
      </div>
    </div>
  );
}

// ─── Part B Components ───────────────────────────────────────────────────────

function MovieCard({ movie, isFav, onToggleFav }) {
  return (
    <div className={`movie-card ${isFav ? "is-fav" : ""}`}>
      <div className="movie-poster">{movie.poster}</div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-meta">
          <span className="movie-year">{movie.year}</span>
          <span className="movie-genre">{movie.genre}</span>
          <span className="movie-rating">⭐ {movie.rating}</span>
        </div>
      </div>
      <button
        className={`fav-btn ${isFav ? "fav-active" : ""}`}
        onClick={() => onToggleFav(movie.id)}
        aria-label={isFav ? "Remove from favourites" : "Add to favourites"}
      >
        {isFav ? "★" : "☆"}
      </button>
    </div>
  );
}

function MovieExplorer() {
  const [query,      setQuery]      = useState("");
  const [favourites, setFavourites] = useState(new Set());

  const q        = query.trim().toLowerCase();
  const filtered = q
    ? MOVIES.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.genre.toLowerCase().includes(q)
      )
    : MOVIES;

  const favMovies = MOVIES.filter(m => favourites.has(m.id));

  const toggleFav = id =>
    setFavourites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const clearSearch = () => setQuery("");

  return (
    <div className="movie-explorer">
      {/* B1 – Search bar with state */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search by title or genre…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className="clear-btn" onClick={clearSearch} aria-label="Clear search">✕</button>
        )}
      </div>

      {/* B3 – Conditional rendering */}
      {!query.trim() && (
        <p className="search-hint">Search above or browse all {MOVIES.length} movies below</p>
      )}

      {query.trim() && filtered.length === 0 && (
        <div className="no-results">
          <span className="no-results-icon">🎭</span>
          <p>No movies found for "<strong>{query}</strong>"</p>
          <p className="no-results-sub">Try a different title or genre like "Sci-Fi" or "Crime"</p>
        </div>
      )}

      {filtered.length > 0 && (
        <>
          {query.trim() && (
            <p className="results-count">
              {filtered.length} result{filtered.length !== 1 ? "s" : ""} for "{query}"
            </p>
          )}
          {/* B2 – Dynamic filtered list */}
          <div className="movies-grid">
            {filtered.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={favourites.has(movie.id)}
                onToggleFav={toggleFav}
              />
            ))}
          </div>
        </>
      )}

      {/* B5 – Favourites section */}
      {favMovies.length > 0 && (
        <div className="favourites-section">
          <h3 className="fav-heading">★ Favourite Movies ({favMovies.length})</h3>
          <div className="movies-grid">
            {favMovies.map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFav={true}
                onToggleFav={toggleFav}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Root App ────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState("portfolio");
  const [theme,     setTheme]     = useState("light");

  // Apply theme class to <body>
  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "light" ? "dark" : "light");

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="header-inner">
          <div className="header-brand">
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-text">React Essentials</span>
            <span className="brand-divider" aria-hidden="true" />
            <span className="brand-sub">Assignment · TuteDude</span>
          </div>
          <div className="header-right">
            <nav className="tab-switcher" aria-label="Project tabs">
              <button
                className={`tab-btn ${activeTab === "portfolio" ? "active" : ""}`}
                onClick={() => setActiveTab("portfolio")}
              >
                Part A – Portfolio
              </button>
              <button
                className={`tab-btn ${activeTab === "movies" ? "active" : ""}`}
                onClick={() => setActiveTab("movies")}
              >
                Part B – Movies
              </button>
            </nav>
            <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
          </div>
        </div>
        <p className="part-label">
          {activeTab === "portfolio"
            ? "Part A — Portfolio Card Application"
            : "Part B — Movie Database Mini Application"}
        </p>
      </header>

      <main className="app-main">
        {activeTab === "portfolio" && <PortfolioCard />}
        {activeTab === "movies"    && <MovieExplorer />}
      </main>

      <footer className="app-footer">
        React Essentials Assignment · Module 2 · Vipin Kushwaha · TuteDude
      </footer>
    </div>
  );
}
