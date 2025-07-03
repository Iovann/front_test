import React from "react";
import Link from "next/link";

export interface ShelfSidebarProps {
  shelves: Array<{
    id: string;
    title: string;
    selected?: boolean;
  }>;
}

const ShelfSidebar = ({ shelves }: ShelfSidebarProps) => {
  return (
    <aside className="w-full sm:w-48 3xl:w-64 bg-white border-b sm:border-b-0 sm:border-r h-auto sm:h-full p-2 sm:p-4 shadow-sm">
      <h2 className="text-lg font-bold mb-2 sm:mb-4 text-blue-600">ÉTAGÈRES</h2>
      <nav className="flex flex-row sm:flex-col gap-1 w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        {shelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/shelf/${shelf.id}`}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-left no-underline min-w-[120px] sm:min-w-0
              ${shelf.selected ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-600"}`}
          >
            <span>{shelf.title}</span>
          </Link>
        ))}
      </nav>
      {shelves.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          Aucune étagère disponible.
        </div>
      )}
    </aside>
  );
};

export default ShelfSidebar; 