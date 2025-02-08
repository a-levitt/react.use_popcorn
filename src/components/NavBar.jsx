import SearchBar from "./SearchBar.jsx";
import Logo from "./Logo.jsx";
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