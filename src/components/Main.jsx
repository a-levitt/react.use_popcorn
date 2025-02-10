import ListBox from "./ListBox.jsx";
import WatchedBox from "./WatchedBox.jsx";

function Main({movies}) {

    return (
        <main className="main">
            <ListBox movies={movies} />
            <WatchedBox />
        </main>
    )
}

export default Main;