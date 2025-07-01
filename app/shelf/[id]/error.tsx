"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="max-w-lg mx-auto my-8">
      <div className="border border-red-200 bg-red-50 rounded-xl shadow px-6 py-5 flex flex-col items-center">
        <div className="mb-2">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-red-400">
            <circle cx="12" cy="12" r="10" strokeWidth="2" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
          </svg>
        </div>
        <h2 className="text-lg font-bold mb-1 text-red-700">Erreur</h2>
        <p className="text-center text-red-800 font-medium">
          {error.message || "Une erreur est survenue lors du chargement de l'étagère."}
        </p>
      </div>
    </div>
  );
} 