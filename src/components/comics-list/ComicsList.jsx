import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";

import useService from "../../services/service";

import Loader from "../loader/loader";
import Error from "../error/Error";

export default function ComicsList() {
    const [comicsList, setComicsList] = useState([])
    const [isRequestLoading, setIsRequestLoading] = useState(false);
    const [isNoMoreComics, setIsNoMoreComics] = useState(false);
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    useEffect(() => {
        setIsRequestLoading(offset > comicsList.length);
    }, [offset])

    const { loading, error, clearError, getComics } = useService();


    const onRequest = (offset, initial) => {
        initial ? setIsRequestLoading(false) : setIsRequestLoading(true);
        getComics(offset)
            .then(onComicsListLoaded)

    }
    const onComicsListLoaded = (newComicsList) => {
        setComicsList((comicsList) => [...comicsList, ...newComicsList])
        setIsRequestLoading(false);
        setIsNoMoreComics(offset > comicsList.length);
        setOffset(offset => offset + 8);
    }

    return (
        <div className="comics__list">

            {error ? <Error /> : null}
            {loading ? <Loader /> : null}
            <ul className="comics__grid">
                {
                    comicsList.map((comic, i) => {
                        return (
                            <li key={i} className="comics__item">
                                <Link to={`/comics/${comic.id}/`}>
                                    <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" />
                                    <h4 className="comics__item-name"> {comic.title}</h4>
                                    <p className="comics__item-price">${comic.price}</p>
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            {
                isNoMoreComics ? null : <button
                    onClick={() => onRequest(offset)}
                    className="btn btn__main btn__long"
                    disabled={isRequestLoading}
                >
                    <div className="inner">
                        {loading ? "loading..." : "load more"}
                    </div>

                </button>
            }
        </div>
    )
}