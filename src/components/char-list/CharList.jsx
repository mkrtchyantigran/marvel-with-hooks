import { useState, useEffect, useRef, use } from 'react'
import useService from '../../services/service';
import "./charList.scss";
import Loader from '../loader/loader';
import Error from '../error/Error';


export default function CharList({ onCharSelected }) {
  const [charList, setCharList] = useState([]);
  const [isRequestLoading, setIsRequestLoading] = useState(false);
  const [isNoMoreChars, setIsNoMoreChars] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    onRequest(offset, true);
    // window.addEventListener('scroll', onScroll);

    // return () => {
    //   window.removeEventListener('scroll', onScroll);
    // }
  }, [])

  useEffect(() => {
    setIsNoMoreChars(offset > charList.length);
  }, [offset, charList.length])

  const refItems = useRef([]);

  const { loading, error, getCharactersAll } = useService();


  const onRequest = (offset, initial) => {
    initial ? setIsRequestLoading(false) : setIsRequestLoading(true);
    getCharactersAll(offset)
      .then(onCharListLoaded)
  }

  const onCharListLoading = () => {
    setIsRequestLoading(true);
  }


  const onCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setIsRequestLoading(false);
    setOffset(offset => offset + 6);
    setIsNoMoreChars(offset > charList.length);
  }


  const focusOnItem = (id) => {
    refItems.current.forEach(item => item.classList.remove('char__item_selected'));
    refItems.current[id].classList.add('char__item_selected');
    refItems.current[id].focus();
  }

  console.log("rendering char list");

  return (
    <div className="char__list">

      {error ? <Error /> : null}
      {loading && !isRequestLoading ? <Loader /> : null}
      <View
        arr={charList}
        refItems={refItems}
        onCharSelected={onCharSelected}
        foucusOnItem={focusOnItem}
      />


      {
        isNoMoreChars ? null : <button
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
  );
}

const View = ({ arr, refItems, onCharSelected, foucusOnItem }) => {
  const items = arr.map((item, i) => {
    return (
      <li
      onClick={() => {
        onCharSelected(item.id)
        foucusOnItem(item.id);
      }}
      className="char__item"
      ref={(el) => refItems.current[item.id] = el}
      key={i}
        
      >
        <img src={item.thumbnail ? item.thumbnail : "Error"} alt={item.name} />
        <div className="char__name">{item.name}</div>
      </li>
    )
  })
  return (
    <ul className="char__grid">{items}</ul>
  )
}
