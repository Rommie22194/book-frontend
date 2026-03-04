import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://psychic-dollop-7vq977p9xr6xhxxxr-5001.app.github.dev/books')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => setBooks(data.books || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filtered = books.filter((b) =>
    (b.title || '').toLowerCase().includes(query.toLowerCase()) ||
    (b.author || '').toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App homepage">
      <header className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">Discover Your Next Read</h1>
          <p className="hero-sub">Curated picks and all-time favorites — browse, search, enjoy.</p>
          <div className="search">
            <input
              aria-label="Search books"
              placeholder="Search by title or author..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="container">
        <section className="section-header">
          <h2>Featured Books</h2>
          <p className="muted">{loading ? 'Loading books…' : `${filtered.length} result(s)`}</p>
        </section>

        {error && <div className="error">Failed to load books: {error}</div>}

        <section className="grid">
          {loading && !error && (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="card skeleton" />
            ))
          )}

          {!loading && !error && filtered.map((book) => (
            <article key={book.id} className="card">
              <div className="thumb">
                <img src={book.image_url} alt={book.title} />
              </div>
              <div className="card-body">
                <h3 className="card-title">{book.title}</h3>
                <p className="card-author">{book.author}</p>
                {book.price !== undefined && <p className="card-price">${book.price.toFixed(2)}</p>}
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;


