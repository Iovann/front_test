import React from "react";
import BookCard, { BookCardProps } from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";

export interface BookGridProps {
  books: BookCardProps[];
}

const BookGrid = ({ books }: BookGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      <AnimatePresence mode="wait">
        {books.map((book, idx) => (
          <motion.div
            key={book.title + idx}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 32 }}
            transition={{ duration: 0.25, ease: "easeOut", delay: idx * 0.05 }}
            layout
          >
            <BookCard {...book} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default BookGrid; 