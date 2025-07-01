import { fetchShelves } from "@/src/services/gloseApi";
import ShelfSidebar from "@/app/components/ShelfSidebar";
import { Shelf } from "@/src/types/glose";
import React from "react";
import { SearchProvider } from "@/src/context/SearchContext";
import SearchBar from "./components/SearchBar";

export default async function ShelfLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const shelvesData: Shelf[] = await fetchShelves(0, 10);
  const selectedShelf =
    shelvesData.find((s) => s.id === params.id) || shelvesData[0];

  const shelvesSidebar = shelvesData.map((shelf) => ({
    id: shelf.id,
    title: shelf.title,
    selected: shelf.id === params.id,
  }));

  return (
    <SearchProvider>
      <main className="flex h-screen bg-gray-50">
        <ShelfSidebar shelves={shelvesSidebar} />
        <section className="flex-1 p-6 overflow-y-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-y-2">
            <h1 className="text-2xl font-bold">{selectedShelf.title}</h1>
            <SearchBar />
          </div>
          {children}
        </section>
      </main>
    </SearchProvider>
  );
}
