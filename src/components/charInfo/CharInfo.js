import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./charInfo.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

const CharInfo = (props) => {
  const { charId } = props;

  const [char, setChar] = useState(null);

  const { loading, error, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
  }, [charId]);

  const updateChar = () => {
    if (!charId) {
      return;
    }

    getCharacter(charId).then((res) => onCharLoaded(res));
  };

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const skeleton = char || loading || error ? null : <Skeleton />;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;
  return (
    <div className="char__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

function View({ char }) {
  const { name, description, thumbnail, homepage, wiki, comics } = char;

  const getIdFromUrl = (url) => {
    const params = url.split("/");
    const id = params[params.length - 1];
    return id;
  };

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description || "No description"}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : "There is no comics with this character"}
        {comics.map((item, i) => {
          const comicsId = getIdFromUrl(item.resourceURI);
          return (
            <li key={i} className="char__comics-item">
              <Link to={`/comics/${comicsId}`} style={{ display: "block" }}>
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
