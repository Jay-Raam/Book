import React, { useState } from "react";
import "./books.css";

const BooksApi = (props) => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
   const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const maxResults = 10;
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${maxResults}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      setTimeout(() => {
        setBooks(data.items);
        // console.log(data.items);
        setLoading(false);
      }, 5000);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newSearch = e.target.value;
    setQuery(newSearch);
  };

  const handleSearch = (book) => {
    setSelectedBook(book);
  };

  const handleClose = () => {
    setSelectedBook(null);
  };

   const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div  className={`container ${darkMode ? 'dark' : 'light'}`} >
    <div className="flex-3">
      <h1>{props.name}</h1>
       <button onClick={toggleDarkMode} className="toggle-dark-mode btn">
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      </div>
      <form onSubmit={handleSubmit} className="form" name="books_search">
        <div className="inputGroup">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search the Book"
            className="Input_feild"
            autoComplete="off"
            autoFocus
          />

          <button type="submit" className="btn live">
            Search
          </button>
        </div>
      </form>
      {loading && (
        <div className="hourglassBackground">
          <div className="hourglassContainer">
            <div className="hourglassCurves"></div>
            <div className="hourglassCapTop"></div>
            <div className="hourglassGlassTop"></div>
            <div className="hourglassSand"></div>
            <div className="hourglassSandStream"></div>
            <div className="hourglassCapBottom"></div>
            <div className="hourglassGlass"></div>
          </div>
        </div>
      )}

      <div className="flex">
        {books.map((book) => (
          <div key={book.id} className="book-container">
            <img
              src={
                book.volumeInfo.imageLinks
                  ? book.volumeInfo.imageLinks.thumbnail
                  : "No thumbnail available"
              }
              alt="Book cover"
              onClick={() => handleSearch(book)}
              style={{ cursor: "pointer" }}
              className="book-cover"
            />
            <h2 className="book-title">{book.volumeInfo.title}</h2>
            <p className="flex-2">
              <span>Author(s)</span>
              {book.volumeInfo.authors
                ? book.volumeInfo.authors.join(", ")
                : "Unknown"}
            </p>
            <p className="flex-2">
              <span>Publisher</span>
              {book.volumeInfo.publisher
                ? book.volumeInfo.publisher
                : "Unknown"}
            </p> 
            {/* book.saleInfo.buyLink */}
                { book.saleInfo.buyLink && (
                  <div>
                    <a
                      href={book.saleInfo.buyLink}
                      className="gal-1"
                    >
                      <button type="button" className="btn-2">
                        Buy
                      </button>
                    </a>
                  </div>
                )}
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <div className="flex-2">
              <img
                src={
                  selectedBook.volumeInfo.imageLinks
                    ? selectedBook.volumeInfo.imageLinks.thumbnail
                    : "No thumbnail available"
                }
                alt="Book cover"
                style={{ cursor: "pointer" }}
                className="book-cover"
              />
              <h2>{selectedBook.volumeInfo.title}</h2>
              <p>
                Author(s):{" "}
                {selectedBook.volumeInfo.authors
                  ? selectedBook.volumeInfo.authors.join(", ")
                  : "Unknown"}
              </p>
              <p>
                Publisher:{" "}
                {selectedBook.volumeInfo.publisher
                  ? selectedBook.volumeInfo.publisher
                  : "Unknown"}
              </p>
              <p>
                categories:{" "}
                {selectedBook.volumeInfo.categories
                  ? selectedBook.volumeInfo.categories
                  : "Unknown"}
              </p>
              <p>
                Published Date:{" "}
                {selectedBook.volumeInfo.publishedDate
                  ? selectedBook.volumeInfo.publishedDate
                  : "DD-MM-YYYY"}
              </p>
              <p>
                Description:{" "}
                {selectedBook.volumeInfo.description
                  ? selectedBook.volumeInfo.description
                  : "No Data Found in this book"}
              </p>
                {selectedBook.volumeInfo.previewLink && (
                  <div>
                    <a
                      href={selectedBook.volumeInfo.previewLink}
                      className="gal-1"
                    >
                      <button type="button" className="btn-2">
                        Preview The Book
                      </button>
                    </a>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksApi;
