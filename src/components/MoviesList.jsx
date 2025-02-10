
import Movie from "./Movie.jsx";

function MoviesList({movies}) {


    return (
        <ul className="list">
            {movies?.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
            ))}
        </ul>
    )
}

export default MoviesList;