'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Temps avant qu'une requête soit considérée comme périmée
        staleTime: 5 * 60 * 1000, // 5 minutes
        // Temps avant que les données soient supprimées du cache
        gcTime: 10 * 60 * 1000, // 10 minutes
        // Retry automatique en cas d'erreur
        retry: 3,
        // Refetch quand la fenêtre reprend le focus
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools pour le développement */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}