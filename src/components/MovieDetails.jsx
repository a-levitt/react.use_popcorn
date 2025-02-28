import {useEffect, useState} from "react";
import {KEY} from "../secured/APIKey.js";
import StarRating from "./StarRating.jsx";
import Loader from "./Loader.jsx";

function MovieDetails({selectedId, onCloseMovie, onAddWatched}) {
    const [movie, setMovie] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            runtime: Number(runtime.split(' ').at(0))
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
                        <StarRating maxRating={10} size={25}/>

                        <button className="btn-add" onClick={handleAdd}>+ Add to list</button>
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
