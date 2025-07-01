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

const ShelfSidebar: React.FC<ShelfSidebarProps> = ({ shelves }) => {
  return (
    <aside className="w-48 3xl:w-64 bg-white border-r h-full p-4 flex flex-col gap-2 shadow-sm">
      <h2 className="text-lg font-bold mb-4 text-blue-900">ÉTAGÈRES</h2>
      <nav className="flex flex-col gap-1">
        {shelves.map((shelf) => (
          <Link
            key={shelf.id}
            href={`/shelf/${shelf.id}`}
            className={`flex items-center justify-between px-3 py-2 rounded-lg transition font-medium text-left no-underline
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