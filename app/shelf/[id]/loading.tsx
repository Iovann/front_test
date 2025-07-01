export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="mb-4 animate-spin rounded-full border-4 border-gray-200 border-t-4 border-t-blue-500 w-12 h-12"></div>
      <div className="text-lg text-gray-500 font-medium">Chargement des livres...</div>
    </div>
  );
} 