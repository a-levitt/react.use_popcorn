import './App.css'
import Navbar from './components/Navbar';
import Main from './components/Main';
import {useState} from "react";
import {tempMovieData} from "./MoviesData.js";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <Navbar  movies={movies} />
            <Main movies={movies} />
        </>
    );
}