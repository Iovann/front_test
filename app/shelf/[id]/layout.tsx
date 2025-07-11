import { fetchShelves } from "@/src/services/gloseApi";
import ShelfSidebar from "@/app/shelf/[id]/components/ShelfSidebar";
import { Shelf } from "@/src/types/glose";
import { SearchProvider } from "@/src/context/SearchContext";
import SearchBar from "./components/SearchBar";

export default async function ShelfLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  const shelvesData: Shelf[] = await fetchShelves(0, 10);
  const selectedShelf =
    shelvesData.find((s) => s.id === id) || shelvesData[0];

  const shelvesSidebar = shelvesData.map((shelf) => ({
    id: shelf.id,
    title: shelf.title,
    selected: shelf.id === id,
  }));

  return (
    <SearchProvider>
      <main className="flex flex-col sm:flex-row h-screen bg-gray-50">
        <ShelfSidebar shelves={shelvesSidebar} />
        <section className="flex-1 p-3 sm:p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2 sm:mb-6 gap-y-2">
            <h1 className="text-xl lg:text-2xl font-bold text-blue-600">
              {selectedShelf.title}
            </h1>
            <SearchBar />
          </div>
          {children}
        </section>
      </main>
    </SearchProvider>
  );
}
