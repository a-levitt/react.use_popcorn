import './App.css'
import NavBar from './components/Navbar';
import Main from './components/Main';
import {useState} from "react";
import {tempMovieData} from "./MoviesData.js";
import {tempWatchedData} from "./MoviesData.js";
import WatchedSummary from "./components/WatchedSummary.jsx";
import WatchedList from "./components/WatchedList.jsx";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import Box from "./components/Box.jsx";
import MoviesList from "./components/MoviesList.jsx";
import StarRating from "./components/StarRating.jsx";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

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
                    <MoviesList movies={movies} />
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