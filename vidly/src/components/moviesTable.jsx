import React from "react";
import Like from "./common/like";
const renderEachMovieEachRow = (movies, onDeleteMovie, onLikeMovie) => {
  return movies.map(movie => (
    <tr key={movie["_id"]}>
      <th scope="row">{movie["title"]}</th>
      <td>{movie.genre.name}</td>
      <td>{movie.numberInStock}</td>
      <td>{movie.dailyRentalRate}</td>
      <td>
        <Like liked={movie.liked} onClick={() => onLikeMovie(movie._id)} />
      </td>
      <td>
        <button
          onClick={() => onLikeMovie(movie._id)}
          className="btn btn-danger btn-sm"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
};

const MoviesTable = props => {
  const { movies, onDeleteMovie, onLikeMovie } = props;
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Genre</th>
          <th scope="col">Stock</th>
          <th scope="col">Rate</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {renderEachMovieEachRow(movies, onDeleteMovie, onLikeMovie)}
      </tbody>
    </table>
  );
};

export default MoviesTable;
