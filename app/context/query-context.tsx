'use client'
import { createContext, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Crear un contexto para el QueryClient
const QueryClientContext = createContext<QueryClient | undefined>(undefined);

// Función para usar el contexto
export function useQueryClientContext() {
  const context = useContext(QueryClientContext);
  if (context === undefined) {
    throw new Error('useQueryClientContext must be used within a QueryClientProvider');
  }
  return context;
}

// Proveedor personalizado
export function ReactQueryClientProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <QueryClientContext.Provider value={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </QueryClientContext.Provider>
  );
}