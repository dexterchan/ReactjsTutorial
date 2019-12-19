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
    { path: "dailyRentalRate", label: "Rate" }
  ];

  raiseSort = path => {
    const newSortColumn = { ...this.props.sortColumn };

    if (newSortColumn.path === path) {
      newSortColumn.order = newSortColumn.order == "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    this.props.onSort(newSortColumn);
  };

  render() {
    const { movies, onDeleteMovie, onLikeMovie } = this.props;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")} scope="col">
              Title
            </th>
            <th onClick={() => this.raiseSort("genre.name")} scope="col">
              Genre
            </th>
            <th onClick={() => this.raiseSort("numberInStock")} scope="col">
              Stock
            </th>
            <th onClick={() => this.raiseSort("dailyRentalRate")} scope="col">
              Rate
            </th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
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
