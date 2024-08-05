import MoviesList from '@/components/movie-list'
import { ReactQueryClientProvider } from '../context/query-context'

const MoviesPage = () => {
  return (
    <ReactQueryClientProvider>

      <div className='text-center py-8 bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-lg p-6'>
        <h1 className='text-white text-3xl font-extrabold mb-4'>
          Bienvenido
        </h1>
        <p className='text-gray-300 mt-4 text-lg max-w-xl mx-auto leading-relaxed'>
          Seleccione hasta 5 películas de su preferencia y nuestra aplicación le recomendará nuevas películas basadas en sus elecciones.
        </p>
        <p className='text-gray-300 mt-4 text-lg max-w-xl mx-auto leading-relaxed'>
          ¡Descubra su próxima película favorita!
        </p>
      </div>
      <MoviesList />
    </ReactQueryClientProvider>
  )
}

export default MoviesPage