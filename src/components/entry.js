import { axios, fetchPokemon } from "../services/fetch_pokemon";
import React from "react";
import { Link } from "react-router-dom";
import getTypeColor from "../helpers/get_type_color";

class Entry extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null,
      genus: null,
      entry: null,
      type1: null,
      type2: null,
      loading: true,
      loading_aux: true,
    };

    this.signal = axios.CancelToken.source();
  }

  componentDidMount() {
    this.fetchPokemonInfo();
    this.fetchPokemonType();
  }

  componentWillUnmount() {
    this.signal.cancel();
  }

  render() {
    return (
      <Link to={`/pokemon/${this.props.name}`}>
        <div className="ui card">
          <div
            className={`ui ${
              this.state.loading && this.state.loading_aux ? "active" : ""
            } dimmer`}
          >
            <div className="ui loader"></div>
          </div>
          <div className="image">
            <img alt={`${this.props.name}`} src={this.state.image} />
          </div>

          <div className="content">
            <div className="header">{this.capitalize(this.props.name)}</div>
            <div className="meta">
              <span className="date">{this.state.genus}</span>
            </div>
            <div className="description">{this.state.entry}</div>
          </div>

          <div className="extra content">
            <div
              className={`ui ${getTypeColor(
                this.state.type1
              )} horizontal label`}
            >
              {this.state.type1}
            </div>
            {this.state.type2 && (
              <div
                className={`ui ${getTypeColor(
                  this.state.type2
                )} horizontal label`}
              >
                {this.state.type2}
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchPokemonInfo() {
    fetchPokemon
      .fetchPokemonInfo(this.props.name, this.signal)
      .then((result) => {
        this.setState({
          genus: result.data.genera.filter(
            (genus) => genus.language.name === "en"
          )[0].genus,
          entry: this.lastItemArray(
            result.data.flavor_text_entries.filter(
              (entry) => entry.language.name === "en"
            )
          ).flavor_text,
          loading: false,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.setState({
            genus: null,
            entry: null,
            loading: false,
          });
        }
      });
  }

  fetchPokemonType() {
    fetchPokemon
      .fetchPokemonType(this.props.name, this.signal)
      .then((result) => {
        this.setState({
          loading_aux: false,
          image: result.data.sprites.front_default,
          type1: result.data.types[0].type.name,
          type2: result.data.types[1] ? result.data.types[1].type.name : null,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.setState({
            loading_aux: false,
            image: null,
            type1: null,
            type2: null,
          });
        }
      });
  }

  lastItemArray(array) {
    return array.slice(-1)[0];
  }
}

export default Entry;
