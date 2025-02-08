import {useState} from "react";
import {tempMovieData} from "../MoviesData.js";
import Movie from "./Movie.jsx";

function MoviesList() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}

export default MoviesList;