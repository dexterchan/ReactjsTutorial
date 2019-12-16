import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies, deleteMovie, getMovie } from "../services/fakeMovieService";
import { getGenres, genres } from "../services/fakeGenreService";
import "./movies.css";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: []
    };
  }
  componentDidMount() {
    let genreslist = [{ name: "All Genres" }, ...getGenres()];
    let movieslist = getMovies();
    this.setState({
      genres: genreslist,
      movies: movieslist
    });
  }
  renderTitle = movies => {
    if (movies.length > 0) {
      return <p>Showing {movies.length} movie(s) in the database</p>;
    } else {
      return movies.length === 0 && <p>There are no movies in database!</p>;
    }
  };

  handleMovieDelete = movieId => {
    let newMovieList = this.state.movies.filter(m => m._id !== movieId);
    this.setState({ movies: newMovieList });
    deleteMovie(movieId);
  };

  handleLiked = movieId => {
    //let newMovieList = [...this.state.movies];
    let movie = getMovie(movieId);
    movie.liked = !movie.liked;

    this.setState({ movies: this.state.movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1
    });
  };

  renderEachMovieEachRow = movies => {
    return movies.map(movie => (
      <tr key={movie["_id"]}>
        <th scope="row">{movie["title"]}</th>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like
            liked={movie.liked}
            onClick={() => this.handleLiked(movie._id)}
          />
        </td>
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
    let {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre
    } = this.state;

    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const movies = paginate(filteredMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            textProperty={"name"}
            keyProperty={"_id"}
            selectedGenre={selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <h4>{this.renderTitle(filteredMovies)}</h4>

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
            <tbody>{this.renderEachMovieEachRow(movies)}</tbody>
          </table>
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
