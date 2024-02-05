import React from 'react';
import "./book.css"

const BooksDetails = ({ book, handleClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={handleClose}>&times;</span>
        <h2>{book.volumeInfo.title}</h2>
        <p>Author(s): {book.volumeInfo.authors}</p>
        <p>Publisher: {book.volumeInfo.publisher}</p>
        <p>Published Date: {book.volumeInfo.publishedDate}</p>
        <p>Description: {book.volumeInfo.description}</p>
      </div>
    </div>
  );
};

export default BooksDetails;
