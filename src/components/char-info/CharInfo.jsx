import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { v4 as uuidv4, v4 } from 'uuid';
import useService from '../../services/service';
import Loader from '../loader/loader';
import Error from '../error/Error';
import Skeleton from '../skeleton/Skeleton';
import "./charInfo.scss";

export default function CharInfo({ charId }) {
  const [char, setChar] = useState(false);

  // state = {
  //   char: {},
  //   isLoading: true,
  //   isRequestLoading: false,
  //   isError: false
  // }

  const { loading, error, getCharacter } = useService();

  useEffect(() => {
    updateChar();
  }, [charId])

  const updateChar = () => {
    if (!charId) {
      return;
    }

    getCharacter(charId)
      .then(onCharLoaded)
  }

  const onCharLoaded = (char) => {
    setChar(char);
    // this.setState({ char, isLoading: false, isError: false });
  }

  return (
    <div className="char__info">
      {char || loading || error ? null : <Skeleton />}
      {error ? <Error /> : null}
      {loading ? <Loader /> : null}
      {!(loading || error || !char) ? <View char={char} /> : null}
    </div>
  );
}

const View = ({ char }) => {
  return (
    <>
      <div className="char__basics">
        <img src={char.thumbnail} alt={char.name} />
        <div>
          <div className="char__info-name">{char.name}</div>
          <div className="char__btns">
            <a
              href={char.homepage}
              className="btn btn__main"
              rel="noreferrer"
              target="_blank"
            >
              <div className="inner">homepage</div>
            </a>
            <a
              href={char.wiki}
              className="btn btn__secondary"
              rel="noreferrer"
              target="_blank"
            >
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {char.description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {char.comics.map((comic => {
          return (
            <li key={uuidv4()} className="char__comics-item">
              {comic}
            </li>
          )
        }))}
      </ul>
    </>
  )
}
