import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";
import NumResults from "./NumResults.jsx";

function NavBar({movies}) {
    return (
        <nav className="nav-bar">
            <Logo />
            <SearchBar />
            <NumResults movies={movies} />
        </nav>
    )
}

export default NavBar;