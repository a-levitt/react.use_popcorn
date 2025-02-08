import SearchBar from "./SearchBar";
import Logo from "./Logo";
import NumResults from "./NumResults.jsx";

function NavBar() {
    return (
        <nav className="nav-bar">
            <Logo />
            <SearchBar />
            <NumResults />
        </nav>
    )
}

export default NavBar;