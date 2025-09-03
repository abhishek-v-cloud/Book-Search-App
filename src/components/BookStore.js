import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import "../App.css";

const BookStore = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Triggered when user clicks search
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch books when searchTerm changes
  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchTerm) return; // Skip if empty

      setLoading(true);
      setError("");
      setBooks([]);

      try {
        const response = await fetch(
          `https://openlibrary.org/search.json?title=${encodeURIComponent(searchTerm)}`
        );
        const data = await response.json();

        if (data.docs && data.docs.length > 0) {
          setBooks(data.docs);
        } else {
          setError(`No results found for "${searchTerm}"`);
        }
      } catch (err) {
        setError("Something went wrong. Please try again.");
      }

      setLoading(false);
    };

    fetchBooks();
  }, [searchTerm]);

  // Handle search button click
  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchTerm(query); // triggers useEffect
  };

  return (
    <div className="app-container">
      <h1 className="app-title">📚 Open Library Book Search</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Enter book title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      <div className="books-grid">
        {books.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            authors={book.author_name}
            year={book.first_publish_year}
            coverId={book.cover_i}
          />
        ))}
      </div>
    </div>
  );
}

export default BookStore;
