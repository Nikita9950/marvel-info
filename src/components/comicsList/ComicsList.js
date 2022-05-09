import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./comicsList.scss";
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const ComicsList = () => {
  const [comics, setComics] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllComics(offset).then((res) => onComicsLoaded(res));
  };

  const onComicsLoaded = (newComics) => {
    let ended = false;
    if (newComics.length < 12) {
      ended = true;
    }

    setComics((comics) => [...comics, ...newComics]);
    setNewItemLoading((newItemLoading) => false);
    setOffset((offset) => offset + 12);
    setComicsEnded(ended);
  };

  const renderItems = (arr) => {
    const items = arr.map((item) => {
      const { id, thumbnail, title, price } = item;
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li className="comics__item" key={id}>
          <Link to={`/comics/${id}`}>
            <img
              src={thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{title}</div>
            <div className="comics__item-price">{price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  const items = renderItems(comics);
  const spinner = loading && !newItemLoading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {items}
      <button
        className="button button__main button__long"
        onClick={() => onRequest(offset)}
        disabled={newItemLoading}
        style={{ display: comicsEnded ? "none" : "block" }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
