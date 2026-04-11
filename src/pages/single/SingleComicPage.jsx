import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useService from "../../services/service";
import Loader from "../../components/loader/loader";
import Error from "../../components/error/Error";
import AppBanner from "../../components/app-banner/AppBanner";
import "./singleComicPage.scss";

export default function SingleComicPage() {
    const { comicId } = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, clearError, getComic } = useService();

    useEffect(() => {
        updateComic();
    }, [])

    const updateComic = () => {
       clearError();
        getComic(comicId)
            .then(onComicLoaded);
    };

    const onComicLoaded = (comic) => {
        setComic(comic)
    }

    return (
        <>
            <AppBanner />
            {error ? <Error /> : null}
            {loading ? <Loader /> : null}
            {!(loading || error || !comic) ? <View comic={comic} /> : null}

        </>
    )
}

const View = ({ comic }) => {
    const { title, description, pageCount, thumbnail, language, price } = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt="title" className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <p className="single-comic__price">${price}</p>
            </div>
            <Link to="/comics/" className="single-comic__back">Bach To All</Link>
        </div>
    )
}