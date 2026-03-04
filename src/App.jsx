import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5001/books')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setBooks(data.books || []))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Book Catalog</h1>
        {error && <p className="error">Failed to load books: {error}</p>}
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="book-card">
              <img
                src={book.image_url}
                alt={book.title}
                className="book-image"
              />
              <div className="book-info">
                <h2>{book.title}</h2>
                <p className="author">{book.author}</p>
                {book.price !== undefined && (
                  <p className="price">${book.price.toFixed(2)}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;


