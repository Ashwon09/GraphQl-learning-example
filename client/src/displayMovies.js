import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const QUERY_ALL_MOVIES = gql`
  query GetAllMovies {
    movies {
      id
      name
      yearOfPublication
    }
  }
`;

const GET_MOVIE_BY_NAME = gql`
  query Movie($name: String!) {
    movie(name: $name) {
      name
      isInTheaters
    }
  }
`;
export function DisplayMovies() {
  const [serchMovie, setSearchMovie] = useState("");

  const { data, loading, error } = useQuery(QUERY_ALL_MOVIES);

  const [fetchMovie, { data: indData, error: indError }] =
    useLazyQuery(GET_MOVIE_BY_NAME);

  if (loading) {
    return <h1>Data is loading</h1>;
  }
  if (error) {
    console.log(error);
  }

  if (indError) {
    console.log(indError);
  }
  return (
    <div>
      <h1>List of Movies</h1>
      {data &&
        data.movies.map((movie) => {
          return (
            <div>
              <p>ID : {movie.id}</p>
              <p>Name : {movie.name}</p>
              <p>Year : {movie.yearOfPublication}</p>
            </div>
          );
        })}
      <input
        type="text"
        placeholder="moviename"
        onChange={(event) => {
          setSearchMovie(event.target.value);
        }}
      />
      <button
        onClick={() => {
          fetchMovie({
            variables: {
              name: serchMovie,
            },
          });
        }}
      >
        Search Movie
      </button>
      {indError && <h1>There was an Error !!</h1>}
      {indData && (
        <div>
          <h1>{indData?.movie?.name}</h1>
          <p>
            Is Movie in theaters:
            {indData?.movie?.isInTheaters ? " yes" : " no"}
          </p>
        </div>
      )}
    </div>
  );
}
