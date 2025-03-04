import './App.css'
import NavBar from './components/Navbar';
import Main from './components/Main';
import {useEffect, useState} from "react";
// import {tempMovieData} from "./MoviesData.js";
// import {tempWatchedData} from "./MoviesData.js";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MoviesList from "./components/MoviesList.jsx";
import Loader from "./components/Loader.jsx";
import {KEY} from "./secured/APIKey.js";
import ErrorMessage from "./components/ErrorMessage.jsx";
import MovieDetails from "./components/MovieDetails.jsx";

export default function App() {
    const [query, setQuery] = useState("Who");
    const [movies, setMovies] = useState([])/*(tempMovieData)*/;
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const [selectedId, setSelectedId] = useState(null);

    // const [watched, setWatched] = useState([])/*(tempWatchedData)*/;
    const [watched, setWatched] = useState(() => {
        const storedValue = localStorage.getItem('watched');
        return JSON.parse(storedValue);
    })

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

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(watched));
    }, [watched])

    useEffect(function ()  {
        const controller = new AbortController();

        async function fetchMovies() {
            try {
                setIsLoading(true);
                setErr("");
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                    {signal: controller.signal});

                if (!res.ok) throw new Error(res.statusText);

                const data = await res.json();

                if (data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);
                setErr("");
            } catch (error) {
                console.log(error.message);

                if (error.name !== "AbortError") {
                    setErr(error.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        if (query.length < 3) {
            setMovies([]);
            setErr("");
            return
        }

        fetchMovies();

        return function () {
            controller.abort();
        }
    }, [query])

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
