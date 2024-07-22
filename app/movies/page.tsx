import MoviesList from '@/components/movie-list'
import { ReactQueryClientProvider } from '../context/query-context'

const MoviesPage = () => {
  return (
    <ReactQueryClientProvider>
      <MoviesList />
    </ReactQueryClientProvider>
  )
}

export default MoviesPage