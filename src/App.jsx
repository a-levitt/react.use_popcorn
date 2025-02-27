import './App.css'
import NavBar from './components/Navbar';
import Main from './components/Main';
import {useEffect, useState} from "react";
// import {tempMovieData} from "./MoviesData.js";
import {tempWatchedData} from "./MoviesData.js";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MoviesList from "./components/MoviesList.jsx";
import StarRating from "./components/StarRating.jsx";
import Loader from "./components/Loader.jsx";
import {KEY} from "./secured/APIKey.js";
import ErrorMessage from "./components/ErrorMessage.jsx";

export default function App() {
    const [movies, setMovies] = useState([])/*(tempMovieData)*/;
    const [watched, setWatched] = useState(tempWatchedData);
    const [isLoading, setIsLoading] = useState(false);
    const [err, setErr] = useState("");
    const query = 'Fullmetal alchemist';

    useEffect(function ()  {
        async function fetchMovies() {
            try {
                setIsLoading(true);
                const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

                if (!res.ok) throw new Error(res.statusText);

                const data = await res.json();

                if (data.Response === "False") throw new Error("Movie not found");

                setMovies(data.Search);

            } catch (error) {
                console.log(error.message);
                setErr(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMovies();
    }, [])

    return (
        <>
            <NavBar>
                <SearchBar />
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
                    {!isLoading && !err && <MoviesList movies={movies}/>}
                    {err && <ErrorMessage message={err}/>}
                </Box>

                <Box>
                        <WatchedSummary watched={watched} />
                        <StarRating maxRating={10} size={34} />
                        <WatchedList watched={watched} />
                </Box>
            </Main>
        </>
    );
}
