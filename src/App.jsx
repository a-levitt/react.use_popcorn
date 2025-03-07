import './App.css'
import NavBar from './components/Navbar';
import Main from './components/Main';
import {useState} from "react";
// import {tempMovieData} from "./MoviesData.js";
// import {tempWatchedData} from "./MoviesData.js";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MoviesList from "./components/MoviesList.jsx";
import Loader from "./components/Loader.jsx";
import ErrorMessage from "./components/ErrorMessage.jsx";
import MovieDetails from "./components/MovieDetails.jsx";
import {useMovies} from "./hooks/useMovies.jsx";
import {useLocalStorageState} from "./hooks/useLocalStorageState.jsx";

export default function App() {
    const [query, setQuery] = useState("Who");
    const [selectedId, setSelectedId] = useState(null);
    const {movies, isLoading, err} = useMovies(query);
    const [watched, setWatched] = useLocalStorageState([], 'watched');

    // const [watched, setWatched] = useState([])/*(tempWatchedData)*/;

    function handleSelectMovie(id) {
        setSelectedId(selectedId=> id === selectedId ? null : id);
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched(watched => [...watched, movie]);

        /*localStorage.setItem("watched", JSON.stringify([...watched, movie]));*/
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    return (
        <>
            <NavBar>
                <SearchBar query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>

            <Main>
                {/*<Box element={<MoviesList movies={movies} />} />
                <Box element={
                    <>
                        <WatchedSummary watched={watched} />
                        <WatchedList watched={watched} />
                    </>
                } />*/}
                <Box>
                    {/*{isLoading ? <Loader/> : <MoviesList movies={movies}/>}*/}
                    {isLoading && <Loader />}
                    {!isLoading && !err && <MoviesList movies={movies} onSelectMovie={handleSelectMovie} />}
                    {err && <ErrorMessage message={err}/>}
                </Box>

                <Box>
                    {
                        selectedId ?
                            <MovieDetails
                                key={selectedId}
                                selectedId={selectedId}
                                onCloseMovie={handleCloseMovie}
                                onAddWatched={handleAddWatched}
                                watched={watched}
                            /> :
                        <>
                            <WatchedSummary watched={watched}/>
                            {/*<StarRating maxRating={10} size={34}/>*/}
                            <WatchedList watched={watched} onDeleteWatched={handleDeleteWatched} />
                        </>
                    }
                </Box>
            </Main>
        </>
    );
}
