import './App.css'
import Navbar from './components/Navbar';
import Main from './components/Main';
import {useState} from "react";
import {tempMovieData} from "./MoviesData.js";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <Navbar>
                <SearchBar />
                <NumResults movies={movies} />
            </Navbar>
            <Main movies={movies} />
        </>
    );
}