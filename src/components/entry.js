import { axios, fetchPokemon } from "../services/fetch_pokemon";
import React from "react";
import { Link } from "react-router-dom";

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
          <div className={`ui ${this.state.loading ? "active" : ""} dimmer`}>
            <div className="ui loader"></div>
          </div>
          <div className="image">
            <img alt="" src={this.state.image} />
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
              className={`ui ${this.getTypeColor(
                this.state.type1
              )} horizontal label`}
            >
              {this.state.type1}
            </div>
            {this.state.type2 && (
              <div
                className={`ui ${this.getTypeColor(
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

  getTypeColor(type) {
    switch (type) {
      case "normal":
        return "grey";
      case "fire":
        return "orange";
      case "fighting":
        return "red";
      case "water":
        return "blue";
      case "flying":
        return "teal";
      case "grass":
        return "green";
      case "poison":
        return "purple";
      case "electric":
        return "yellow";
      case "ground":
        return "brown";
      case "psychic":
        return "pink";
      case "rock":
        return "brown";
      case "ice":
        return "teal";
      case "bug":
        return "olive";
      case "dragon":
        return "violet";
      case "ghost":
        return "purple";
      case "dark":
        return "black";
      case "steel":
        return "grey";
      case "fairy":
        return "pink";
      default:
    }
  }

  fetchPokemonInfo() {
    fetchPokemon
      .fetchPokemonInfo(this.props.name, this.signal)
      .then((result) => {
        this.setState({
          image:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
            result.data.pokedex_numbers.filter(
              (entry) => entry.pokedex.name === "national"
            )[0].entry_number +
            ".png",
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
            image: null,
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
          type1: result.data.types[0].type.name,
          type2: result.data.types[1] ? result.data.types[1].type.name : null,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.setState({
            image: null,
            genus: null,
            entry: null,
            loading: false,
          });
        }
      });
  }

  lastItemArray(array) {
    return array.slice(-1)[0];
  }
}

export default Entry;
