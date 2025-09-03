import "../App.css";

const  BookCard = (props) => {
  const { title, authors, year, coverId } =  props
  const coverUrl = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x220.png?text=No+Cover";

  return (
    <div className="book-card">
      <img src={coverUrl} alt={title} className="book-cover" />
      <div className="book-info">
        <h2 className="book-title">{title}</h2>
        {authors && <p className="book-author">👤 {authors.join(", ")}</p>}
        {year && <p className="book-year">📅 First Published: {year}</p>}
      </div>
    </div>
  );
}

export default BookCard;
