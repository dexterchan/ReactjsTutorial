import React, { Component } from "react";
import Like from "./common/like";
import TableHeader from "./common/tableHeader";

class MoviesTable extends Component {
  constructor(props) {
    super(props);
  }
  columns = [
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    { key: "like" },
    { key: "delete" }
  ];

  render() {
    const { movies, onDeleteMovie, onLikeMovie, sortColumn } = this.props;

    return (
      <table className="table table-hover">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={this.props.onSort}
        />

        <tbody>
          {renderEachMovieEachRow(movies, onDeleteMovie, onLikeMovie)}
        </tbody>
      </table>
    );
  }
}

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

export default MoviesTable;
