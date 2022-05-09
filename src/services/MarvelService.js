import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
  const { loading, request, error, clearError } = useHttp();

  const _apiBase = "https://gateway.marvel.com:443/v1/public/";

  const _apiKey = "apikey=c867bb22c2568a103852511054a30a21";

  const _baseOffset = 210;

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_apiBase}characters?${_apiKey}&limit=9&offset=${offset}`
    );
    return res.data.results.map(_transformCharacter);
  };

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  };

  const getAllComics = async (offset = 0) => {
    const res = await request(
      `${_apiBase}comics?${_apiKey}&limit=12&offset=${offset}`
    );
    return res.data.results.map(_transformComic);
  };

  const getComic = async (id) => {
    const res = await request(`${_apiBase}comics/${id}?&${_apiKey}`);
    return _transformComic(res.data.results[0]);
  };

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description,
      thumbnail: `${char.thumbnail.path}.${char.thumbnail.extension}`,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    };
  };

  const _transformComic = (comic) => {
    return {
      id: comic.id,
      title: comic.title,
      description: comic.description || "There is no description",
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
      price: comic.prices[0].price
        ? `${comic.prices[0].price} $`
        : "Not avaliable",
      pageCount: comic.pageCount
        ? `${comic.pageCount} pages`
        : "No information about the number of pages",
      language: comic.textObjects[0] ? comic.textObjects[0].language : "en-us",
    };
  };

  return {
    loading,
    error,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
    clearError,
  };
};

export default useMarvelService;
