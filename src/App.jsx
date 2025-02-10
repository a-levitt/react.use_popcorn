import './App.css'
import NavBar from './components/Navbar';
import Main from './components/Main';
import {useState} from "react";
import {tempMovieData} from "./MoviesData.js";
import SearchBar from "./components/SearchBar.jsx";
import NumResults from "./components/NumResults.jsx";
import ListBox from "./components/ListBox.jsx";
import WatchedBox from "./components/WatchedBox.jsx";
import MoviesList from "./components/MoviesList.jsx";

export default function App() {
    const [movies, setMovies] = useState(tempMovieData);

    return (
        <>
            <NavBar>
                <SearchBar />
                <NumResults movies={movies} />
            </NavBar>
            
            <Main>
                <ListBox>
                    <MoviesList movies={movies} />
                </ListBox>
                <WatchedBox />
            </Main>
        </>
    );
}