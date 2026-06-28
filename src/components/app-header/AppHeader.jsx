import { Link, NavLink } from "react-router-dom";
import "./appHeader.scss";


export default function AppHeader() {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <span>Marvel</span>information portal
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink
                            to={"/"}
                            // activeStyle={{ "color": "#9F0013" }}
                            style={({ isActive }) => ({ color: isActive ? "#9F0013" : "#5C5C5C" })}
                        >
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            to={"/comics"}
                            style={({ isActive }) => ({ color: isActive ? "#9F0013" : "#5C5C5C" })}
                            >
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}