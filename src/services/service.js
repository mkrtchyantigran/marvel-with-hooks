import useHttp from "../hooks/http.hook";

export default function useService () {

    const { Loading, error, request, clearError } = useHttp();

    const _API_URL = "https://marvel-server-zeta.vercel.app";
    const _API_KEY = "d4eecb0c66dedbfae4eab45d312fc1df";
    const _LIMIT_CHAR = 6;
    const _LIMIT_COMIC = 8;


    const getCharactersAll = async (offset = 0) => {
        const res = await request(`${_API_URL}/characters?limit=${_LIMIT_CHAR}&offset=${offset}&apikey=${_API_KEY}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_API_URL}/characters/${id}/?apikey=${_API_KEY}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getComics = async (offset = 8) => {
        const res = await request(`${_API_URL}/comics/?limit=${_LIMIT_COMIC}&offset=${offset}&apikey=${_API_KEY}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (comicId) => {
        const res = await request(`${_API_URL}/comics/${comicId}?apikey=${_API_KEY}`);
        return _transformComic(res.data.results[0])
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }

    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            pageCount: comic.pageCount,
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            lenguage: comic.textObjects.language,
            price: comic.prices[0].price
        }

    }

    return {Loading, error, clearError, getCharactersAll, getCharacter, getComics, getComic }

}
