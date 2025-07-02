"use client";
import { useParams } from "next/navigation";
import { useSearch } from "@/src/context/SearchContext";
import { Button } from "@/src/components/ui/button";
import {
  fetchShelfBooks,
  fetchBook,
  fetchShelves,
} from "@/src/services/gloseApi";
import { Shelf, BookAuthor, BookPrice, BookResponse } from "@/src/types/glose";
import BookGrid from "@/app/shelf/[id]/components/BookGrid";
import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { BookCardSkeleton } from "@/app/shelf/[id]/components/BookCardSkeleton";

interface Book {
  id: string;
  title: string;
  authors: BookAuthor[];
  image?: string;
  price?: BookPrice;
  averageRating?: number;
  description?: string;
}

// Fonction pour charger les livres d'une page spécifique
async function loadShelfBooks(
  shelfId: string,
  page: number,
  limit: number = 10
): Promise<Book[]> {
  const formsResponse = await fetchShelfBooks(shelfId, page * limit, limit);

  const loadedBooks: Book[] = [];
  for (const formId of formsResponse) {
    try {
      const bookDetails: BookResponse = await fetchBook(formId);
      loadedBooks.push({
        id: formId,
        title: bookDetails.title,
        authors: bookDetails.authors,
        image: bookDetails.image,
        price: bookDetails.price,
        averageRating: bookDetails.average_rating,
        description: bookDetails.description,
      });
    } catch (error) {
      console.error(`Erreur lors du chargement du livre ${formId}:`, error);
    }
  }

  return loadedBooks;
}

export default function ShelfPage() {
  const params = useParams() as { id: string };
  const { search } = useSearch();
  const [page, setPage] = useState(0);
  const limit = 10;

  // Query pour charger les étagères
  const { data: shelves, isLoading: isLoadingShelves } = useQuery<Shelf[]>({
    queryKey: ["shelves"],
    queryFn: () => fetchShelves(0, 10),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Trouver l'étagère courante
  const currentShelf = useMemo(() => {
    if (!shelves) return null;
    return shelves.find((s) => s.id === params.id) || shelves[0];
  }, [shelves, params.id]);

  // Query pour charger les livres de la page courante
  const {
    data: books = [],
    isLoading: isLoadingBooks,
    error: booksError,
    isFetching: isFetchingBooks,
  }: UseQueryResult<Book[], Error> = useQuery<Book[], Error>({
    queryKey: ["shelf-books", currentShelf?.id, page],
    queryFn: () => currentShelf ? loadShelfBooks(currentShelf.id, page, limit) : Promise.resolve([]),
    enabled: !!currentShelf,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  // Préchargement de la page suivante
  const { data: nextPageBooks = [] }: UseQueryResult<Book[], Error> = useQuery<Book[], Error>({
    queryKey: ["shelf-books", currentShelf?.id, page + 1],
    queryFn: () => currentShelf ? loadShelfBooks(currentShelf.id, page + 1, limit) : Promise.resolve([]),
    enabled: !!currentShelf && books.length === limit,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      book.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [books, search]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 0) return;
    window.scrollTo({top: 0, behavior: 'smooth'});
    setPage(newPage);
  };

  if (isLoadingShelves) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="mb-4 animate-spin rounded-full border-4 border-gray-200 border-t-4 border-t-blue-500 w-12 h-12"></div>
        <div className="text-lg text-gray-500 font-medium">
          Chargement des étagères...
        </div>
      </div>
    );
  }

  if (isLoadingBooks || isFetchingBooks) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (booksError) {
    return (
      <div className="text-center text-red-500 py-12">
        Erreur lors du chargement des livres. Veuillez réessayer.
      </div>
    );
  }

  if (filteredBooks.length === 0 && !isLoadingBooks) {
    return (
      <div className="text-center text-gray-400 py-12">
        {search
          ? "Aucun livre trouvé pour cette recherche."
          : "Aucun livre disponible."}
      </div>
    );
  }

  return (
    <>
      <div className="relative">
        {isFetchingBooks && (
          <div className="absolute top-0 right-0 z-10">
            <div className="animate-spin rounded-full border-2 border-gray-200 border-t-2 border-t-blue-500 w-6 h-6"></div>
          </div>
        )}

        <BookGrid books={filteredBooks} />
      </div>

      <div className="flex justify-center gap-x-4 items-center mt-6">
        <Button
          disabled={page === 0}
          onClick={() => handlePageChange(page - 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm transition
            ${
              page === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-blue-600"
            }`}
        >
          <ChevronLeft size={18} />
          Précédent
        </Button>

        <span className="text-sm text-gray-600">Page {page + 1}</span>

        <Button
          disabled={
            books.length < limit ||
            nextPageBooks.length === 0
          }
          onClick={() => handlePageChange(page + 1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm transition
            ${
              books.length < limit ||
              nextPageBooks.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-blue-50 text-blue-600"
            }`}
        >
          Suivant
          <ChevronRight size={18} />
        </Button>
      </div>
    </>
  );
}
