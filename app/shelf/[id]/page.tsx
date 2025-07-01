import { fetchShelves, fetchShelfBooks, fetchBook } from "@/src/services/gloseApi";
import ShelfSidebar from "@/app/components/ShelfSidebar";
import BookGrid from "@/app/components/BookGrid";
import { Shelf } from "@/src/types/glose";

export default async function ShelfPage({ params }: { params: { id: string } }) {
  const shelvesData: Shelf[] = await fetchShelves(0, 10);
  const selectedShelf = shelvesData.find(s => s.id === params.id) || shelvesData[0];

  // Charger les livres de l'étagère sélectionnée
  const formsResponse = await fetchShelfBooks(selectedShelf.id, 0, 10);
  const books = [];
  for (const formId of formsResponse) {
    try {
      const bookDetails = await fetchBook(formId);
      books.push({
        title: bookDetails.title,
        authors: bookDetails.authors,
        image: bookDetails.image,
        price: bookDetails.price,
        averageRating: bookDetails.average_rating,
        description: bookDetails.description,
      });
    } catch {}
  }

  // Sidebar avec sélection
  const shelvesSidebar = shelvesData.map((shelf) => ({
    id: shelf.id,
    title: shelf.title,
    selected: shelf.id === selectedShelf.id,
  }));

  return (
    <main className="flex h-screen bg-gray-50">
      <ShelfSidebar shelves={shelvesSidebar} />
      <section className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Livres de l&apos;étagère : {selectedShelf.title}</h1>
        <BookGrid books={books} />
      </section>
    </main>
  );
} 