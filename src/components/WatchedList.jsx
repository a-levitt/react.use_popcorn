import WatchedMovie from "./WatchedMovie.jsx";

function WatchedList({watched, onDeleteWatched}) {
    return (
        <ul className="list">
            {watched.map((movie) => (
                <WatchedMovie movie={movie} key={movie.imdbID} onDeleteWatched={onDeleteWatched} />
            ))}
        </ul>
    )
}

export default WatchedList;
