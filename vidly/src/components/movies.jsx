import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import "./movies.css";
class Movies extends Component {
  constructor(props) {
    super(props);
    let movieslist = getMovies();
    this.state = {
      movies: movieslist
    };
  }
  renderTitle = () => {
    if (this.state.movies.length > 0) {
      return <p>Showing {this.state.movies.length} movie(s) in the database</p>;
    } else {
      return (
        this.state.Movies.length == 0 && <p>There are no movies in database!</p>
      );
    }
  };

  handleMovieDelete = movieId => {
    let newMovieList = this.state.movies.filter(m => m._id != movieId);
    this.setState({ movies: newMovieList });
    deleteMovie(movieId);
  };

  renderEachMovieEachRow = () => {
    return this.state.movies.map(movie => (
      <tr key={movie["_id"]}>
        <th scope="row">{movie["title"]}</th>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <button
            onClick={() => this.handleMovieDelete(movie._id)}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  };

  render() {
    return (
      <main role="main" className="container">
        <div className="starter-template">
          <h4>{this.renderTitle()}</h4>

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>{this.renderEachMovieEachRow()}</tbody>
          </table>
        </div>
      </main>
    );
  }
}

export default Movies;
