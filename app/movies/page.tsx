import React, { Suspense } from 'react'
import { ReactQueryClientProvider } from '../context/query-context'
import MoviesList from '@/components/movie-list'

const MoviesPage = () => {
  return (
    <Suspense fallback={<p className='bg-black' >Loading feed...</p>}>
    <ReactQueryClientProvider>
        <MoviesList />
      </ReactQueryClientProvider>
    </Suspense>
  )
}

export default MoviesPage