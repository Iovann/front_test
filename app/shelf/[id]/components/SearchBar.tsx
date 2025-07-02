"use client";
import { useSearch } from "@/src/context/SearchContext";

export default function SearchBar() {
  const { search, setSearch } = useSearch();
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Rechercher un livre..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
      />
    </div>
  );
} 