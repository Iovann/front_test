import React from "react";
import Link from "next/link";

export interface ShelfSidebarProps {
  shelves: Array<{
    id: string;
    title: string;
    count?: number;
    selected?: boolean;
  }>;
}

const ShelfSidebar = ({ shelves }: ShelfSidebarProps) => {
  return (
    <aside className="w-full sm:w-48 3xl:w-64 bg-white border-b sm:border-b-0 sm:border-r h-auto sm:h-full p-2 sm:p-4 shadow-sm">
      <h2 className="text-lg font-bold mb-2 sm:mb-4 text-blue-900">ÉTAGÈRES</h2>
      <nav className="flex flex-row sm:flex-col gap-1 w-full overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0">
        {shelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/shelf/${shelf.id}`}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-left no-underline min-w-[120px] sm:min-w-0
              ${shelf.selected ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"}`}
          >
            <span>{shelf.title}</span>
            {typeof shelf.count === "number" && (
              <span className="text-xs bg-gray-200 rounded px-2 py-0.5 ml-2 text-gray-600">
                {shelf.count}
              </span>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default ShelfSidebar; 