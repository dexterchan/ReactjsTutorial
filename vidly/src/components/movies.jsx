import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";

import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import { getMovies, deleteMovie, getMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import "./movies.css";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Movies extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      pageSize: 4,
      currentPage: 1,
      genres: [],
      sortColumn: { path: "title", order: "asc" }
    };
  }
  componentDidMount() {
    let genreslist = [{ name: "All Genres", _id: "all" }, ...getGenres()];
    let movieslist = getMovies();
    this.setState({
      genres: genreslist,
      movies: movieslist
    });
  }
  renderTitle = totalLength => {
    if (totalLength > 0) {
      return <p>Showing {totalLength} movie(s) in the database</p>;
    } else {
      return totalLength === 0 && <p>There are no movies in database!</p>;
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
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = (
    selectedGenre,
    allMovies,
    sortColumn,
    currentPage,
    pageSize
  ) => {
    const filteredMovies =
      selectedGenre && selectedGenre._id !== "all"
        ? allMovies.filter(movie => movie.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sortedMovies, currentPage, pageSize);
    return { data: movies, totalCount: filteredMovies.length };
  };

  render() {
    let {
      movies: allMovies,
      pageSize,
      currentPage,
      genres,
      selectedGenre,
      sortColumn
    } = this.state;

    const { data: moviesData, totalCount } = this.getPagedData(
      selectedGenre,
      allMovies,
      sortColumn,
      currentPage,
      pageSize
    );

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
          <h4>{this.renderTitle(totalCount)}</h4>
          <MoviesTable
            movies={moviesData}
            sortColumn={sortColumn}
            onDeleteMovie={this.handleMovieDelete}
            onLikeMovie={this.handleLiked}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
