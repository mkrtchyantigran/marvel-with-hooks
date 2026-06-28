import { useState } from 'react';
import useService from '../../services/service';
import Error from '../error/Error';
import "./charSearch.scss";

export default function CharSearch() {
  const [name, setName] = useState('');
  const [char, setChar] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { error, clearError, getCharacterByName } = useService();

  const onSearch = (e) => {
    e.preventDefault();

    setChar(null);
    setNotFound(false);

    if (!name.trim()) {
      setValidationError('This field is required');
      return;
    }

    setValidationError('');
    clearError();

    getCharacterByName(name.trim())
      .then((result) => {
        result ? setChar(result) : setNotFound(true);
      })
      .catch(() => setNotFound(true));
  };

  return (
    <div className="char__search">
      <form className="char__search-form" onSubmit={onSearch}>
        <label className="char__search-label" htmlFor="charName">
          Or find a character by name:
        </label>

        <div className="char__search-wrapper">
          <input
            id="charName"
            type="text"
            name="charName"
            placeholder="Enter name"
            className="char__search-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="btn btn__main">
            <div className="inner">find</div>
          </button>
        </div>

        {validationError
          ? <div className="char__search-error">{validationError}</div>
          : null}

        {error
          ? <div className="char__search-critical-error"><Error /></div>
          : null}

        {char
          ? <div className="char__search-success">
              <div className="char__search-found">There is! Visit {char.name} page?</div>
              <a
                href={char.homepage}
                target="_blank"
                rel="noreferrer"
                className="btn btn__secondary"
              >
                <div className="inner">To page</div>
              </a>
            </div>
          : null}

        {notFound
          ? <div className="char__search-error">
              The character was not found. Check the name and try again
            </div>
          : null}
      </form>
    </div>
  );
}
