"use client";
import { useSearch } from "@/src/context/SearchContext";
import { fetchShelfBooks, fetchBook, fetchShelves } from "@/src/services/gloseApi";
import { Shelf, BookAuthor, BookPrice } from "@/src/types/glose";
import BookGrid from "@/app/components/BookGrid";
import { useEffect, useState } from "react";

interface Book {
  title: string;
  authors: BookAuthor[];
  image?: string;
  price?: BookPrice;
  averageRating?: number;
  description?: string;
}

export default function ShelfPage({ params }: { params: { id: string } }) {
  const { search } = useSearch();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const shelvesData: Shelf[] = await fetchShelves(0, 10);
      const shelf = shelvesData.find(s => s.id === params.id) || shelvesData[0];
      const formsResponse = await fetchShelfBooks(shelf.id, 0, 10);
      const loadedBooks = [];
      for (const formId of formsResponse) {
        try {
          const bookDetails = await fetchBook(formId);
          loadedBooks.push({
            title: bookDetails.title,
            authors: bookDetails.authors,
            image: bookDetails.image,
            price: bookDetails.price,
            averageRating: bookDetails.average_rating,
            description: bookDetails.description,
          });
        } catch {}
      }
      setBooks(loadedBooks);
      setLoading(false);
    }
    load();
  }, [params.id]);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="mb-4 animate-spin rounded-full border-4 border-gray-200 border-t-4 border-t-blue-500 w-12 h-12"></div>
        <div className="text-lg text-gray-500 font-medium">Chargement des livres...</div>
      </div>
    );
  }

  if (filteredBooks.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Aucun livre trouvé pour cette recherche.
      </div>
    );
  }

  return <BookGrid books={filteredBooks} />;
} 