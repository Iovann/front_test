"use client";
import React, { useState } from "react";
import ShelfSidebar from "./ShelfSidebar";
import BookGridClient from "./BookGridClient";
import { Shelf } from "@/src/types/glose";

export default function ClientHome({ shelvesData }: { shelvesData: Shelf[] }) {
  // On vérifie que shelvesData existe et n'est pas vide
  const [selectedShelfId, setSelectedShelfId] = useState(
    shelvesData && shelvesData.length > 0 ? shelvesData[0].id : ""
  );

  const shelvesSidebar = shelvesData.map((shelf) => ({
    id: shelf.id,
    title: shelf.title,
    count: undefined,
    selected: shelf.id === selectedShelfId,
    onClick: () => setSelectedShelfId(shelf.id),
  }));

  const selectedShelf = shelvesData.find((s) => s.id === selectedShelfId);

  return (
    <main className="flex h-screen bg-gray-50">
      <ShelfSidebar shelves={shelvesSidebar} />
      <section className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">
          Livres de l&apos;étagère : {selectedShelf?.title}
        </h1>
        {selectedShelfId ? (
          <BookGridClient shelfId={selectedShelfId} />
        ) : (
          <div className="text-center text-gray-400">Aucune étagère sélectionnée</div>
        )}
      </section>
    </main>
  );
} 