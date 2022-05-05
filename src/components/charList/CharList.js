import React from "react";
import PropTypes from "prop-types";
import MarvelService from "../../services/MarvelService";
import "./charList.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

class CharList extends React.Component {
  state = {
    chars: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    console.log("mount");
    this.onRequest();
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then((res) => this.onCharsLoaded(res))
      .catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharsLoaded = (newChars) => {
    let ended = false;
    if (newChars.length < 9) {
      ended = true;
    }

    this.setState(({ offset, chars } = this.state) => ({
      chars: [...chars, ...newChars],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  render() {
    const { chars, loading, error, newItemLoading, offset, charEnded } =
      this.state;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        <ul className="char__grid">
          {chars.map((item) => {
            let imgStyle;
            if (
              item.thumbnail ===
              "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
            ) {
              imgStyle = { objectFit: "unset" };
            }
            return (
              <li
                key={item.id}
                onClick={() => this.props.onCharSelected(item.id)}
                className="char__item"
              >
                <img src={item.thumbnail} alt="abyss" style={imgStyle} />
                <div className="char__name">{item.name}</div>
              </li>
            );
          })}
        </ul>
        <button
          className="button button__main button__long"
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
