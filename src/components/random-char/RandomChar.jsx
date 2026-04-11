import { useState, useEffect,  } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import useService from "../../services/service";
import Loader from "../loader/loader";
import Error from "../error/Error";

export default function RandomChar() {
    const [char, setChar] = useState({});

    const { loading, error, getCharacter } = useService();

    useEffect(() => {
        updateChar();
        // const timerId = setInterval(updateChar, 6000000);
        // return () => clearInterval(timerId);
    }, [])


    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        getCharacter(Math.floor(Math.random() * (21 - 1) + 1)).then(onCharLoaded);
    }


    return (
        <div className="randomchar">
            {error ? <Error /> : null}
            {loading ? <Loader /> : null}
            {!(loading || error) ? <View char={char} /> : null}

            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one!
                </p>
                <button
                    className="btn btn__main"
                    onClick={updateChar}>
                    <div className="inner">Try It</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki } = char;
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" />
            <div className="randomchar__info">
                <div className="randomchar__name">{name}</div>
                <p className="randomchar__description">{description}</p>
                <div className="randomchar__btns">
                    <a
                        href={homepage}
                        className="btn btn__main"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <div className="inner">homepage</div>
                    </a>
                    <a
                        href={wiki}
                        className="btn btn__main"
                        rel="noreferrer"
                        target="_blank"
                    >
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}