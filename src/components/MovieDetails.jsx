import {useEffect, useState} from "react";
import {KEY} from "../secured/APIKey.js";
import StarRating from "./StarRating.jsx";

function MovieDetails({selectedId, onCloseMovie}) {
    const [movie, setMovie] = useState({});

    const {Title: title, Year: year, Poster: poster,
        Runtime: runtime, imdbRating, Plot: plot,
        Released: released, Actors: actors,
        Director: director, Genre: genre } = movie;

    useEffect(function (){
        async function getMovieDetails() {
            const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);
            const data = await res.json();
            setMovie(data);
        }
        getMovieDetails();
    }, [])

    return (
        <div className="details">
            <header>
                <button className="btn-back" onClick={onCloseMovie}>
                    &larr;
                </button>
                <img src={poster} alt={`Poster of ${title}`} />
                <div className="details-overview">
                    <h2>{title}</h2>
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
                </div>
                <p><em>{plot}</em></p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    )
}

export default MovieDetails;
