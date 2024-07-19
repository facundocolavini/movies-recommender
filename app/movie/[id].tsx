'use client'
// pages/movie/[id].tsx
import { useRouter } from 'next/router';

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query; // Obtener el ID de la película desde la ruta

  // Aquí iría tu lógica para obtener los detalles de la película usando el `id`

  return (
    <div>
      <h1>Detalles de la Película</h1>
      {/* Renderizar los detalles de la película aquí */}
    </div>
  );
}