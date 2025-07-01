import React from "react";
import BookCard, { BookCardProps } from "./BookCard";

export interface BookGridProps {
  books: BookCardProps[];
}

const BookGrid = ({ books }: BookGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {books.map((book, idx) => (
        <BookCard key={book.title + idx} {...book} />
      ))}
    </div>
  );
};

export default BookGrid; 