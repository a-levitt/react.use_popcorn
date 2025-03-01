import {useEffect, useState} from "react";
import {KEY} from "../secured/APIKey.js";
import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [userRating, setUserRating] = useState("");

    const isWatched = watched.map(movie=>movie.imdbId)
        .includes(selectedId);
    const watchedUserRating = watched.find(movie=>movie.imdbId === selectedId)?.userRating;

    const {Title: title, Year: year, Poster: poster,
        Runtime: runtime, imdbRating, Plot: plot,
        Released: released, Actors: actors,
        Director: director, Genre: genre } = movie;

    function handleAdd() {
        const newWatchedMovie = {
            imdbId: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime: Number(runtime.split(' ').at(0)),
            userRating
        }

        onAddWatched(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(function (){
        async function getMovieDetails() {
            setIsLoading(true);
            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
            setIsLoading(false);
        }
        getMovieDetails();
    }, [selectedId])

    useEffect(function (){
        if (!title || !year) return;
        document.title = `${title} (${year})`;
    }, [title, year])

    return (
        <div className="details">
            {isLoading ? <Loader/> :
            <>
                <header>
                    <button className="btn-back" onClick={onCloseMovie}>
                        &larr;
                    </button>
                    <img src={poster} alt={`Poster of ${title}`} />
                    <div className="details-overview">
                        <h2>{`${title} (${year})`}</h2>
                        <p>{released} &bull; {runtime}</p>
                        <p>{genre}</p>
                        <p>
                            <span>⭐</span>
                            {imdbRating} IMDb rating
                        </p>
                    </div>
                </header>
                <section>
                    <div className="rating">
                        {!isWatched ?
                                <>
                                    <StarRating
                                        maxRating={10}
                                        size={25}
                                        onSetRating={setUserRating}
                                    />
                                    {userRating > 0 &&
                                    <button className="btn-add" onClick={handleAdd}>+ Add to list</button>}
                                </> :
                                <p>You rated the movie with {watchedUserRating} ⭐</p>
                        }
                    </div>
                    <p><em>{plot}</em></p>
                    <p>Starring {actors}</p>
                    <p>Directed by {director}</p>
                </section>
        </>}
        </div>
    )
}

export default MovieDetails;
