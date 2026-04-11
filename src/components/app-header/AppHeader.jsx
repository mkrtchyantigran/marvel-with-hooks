import { Link } from "react-router-dom";
import "./appHeader.scss";


export default function AppHeader (){
    return (
            <header className="app__header">
                <h1 className="app__title">
                    <span>Marvel</span>information portal
                </h1>
                <nav className="app__menu">
                    <ul>
                        <li>
                            <Link exact to={"/"} activeStyle={{"color": "#9F0013"}}>Characters</Link>
                        </li>
                        /
                        <li>
                            <Link exact to={"/comics"} activeStyle={{"color": "#9F0013"}}>Comics</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        )
}
