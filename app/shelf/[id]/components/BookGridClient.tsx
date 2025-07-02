"use client";
import React, { useEffect, useState } from "react";
import BookGrid from "@/app/shelf/[id]/components/BookGrid";
import { fetchShelfBooks, fetchBook } from "@/src/services/gloseApi";
import { BookCardProps } from "@/app/shelf/[id]/components/BookCard";

interface BookGridClientProps {
  shelfId: string;
}

const BookGridClient: React.FC<BookGridClientProps> = ({ shelfId }) => {
  const [books, setBooks] = useState<BookCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadBooks = async () => {
      setLoading(true);
      try {
        const formsResponse = await fetchShelfBooks(shelfId, 0, 10);
        const bookList: BookCardProps[] = [];
        for (const formId of formsResponse) {
          try {
            const bookDetails = await fetchBook(formId);
            bookList.push({
              title: bookDetails.title,
              authors: bookDetails.authors,
              image: bookDetails.image,
              price: bookDetails.price,
              averageRating: bookDetails.average_rating,
              description: bookDetails.description,
            });
          } catch (e) {
            console.error(e);
          }
        }
        if (isMounted) setBooks(bookList);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    loadBooks();
    return () => { isMounted = false; };
  }, [shelfId]);

  if (loading) return <div className="text-center py-8">Chargement des livres...</div>;
  return <BookGrid books={books} />;
};

export default BookGridClient; 