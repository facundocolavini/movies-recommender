import { GetServerSideProps, NextPage } from 'next';

// Supongamos que tienes una función para obtener los detalles de la película por ID
// async function fetchMovieDetails(id: string) {
//   // Implementación para obtener los detalles de la película
// }

interface MovieDetails {
  id: string;
  title: string;
  description: string;
  // Agrega más campos según sea necesario
}

const MovieDetailPage: NextPage<{ movieDetails: MovieDetails }> = ({ movieDetails }) => {
  return (
    <div>
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.description}</p>
      {/* Renderiza más detalles de la película como necesites */}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  console.log(id,'id')
  // Aquí llamarías a tu función para obtener los detalles de la película usando el ID
  // const movieDetails = await fetchMovieDetails(id as string);

  // Simulando los detalles de la película para el ejemplo
  const movieDetails = {
    id: id as string,
    title: "Título de la Película",
    description: "Descripción de la Película",
  };

  return {
    props: {
      movieDetails,
    },
  };
};

export default MovieDetailPage;