import React from "react";

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
  }

  componentDidMount() {
    this.fetchPokemonInfo();
    this.fetchPokemonType();
  }

  render() {
    return (
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

  fetchPokemonType() {
    fetch("https://pokeapi.co/api/v2/pokemon/" + this.props.name)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            type1: result.types[0].type.name,
            type2: result.types[1] ? result.types[1].type.name : null,
          });
        },
        (error) => {
          this.setState({
            type1: null,
            type2: null,
          });
        }
      );
  }

  fetchPokemonInfo() {
    fetch("https://pokeapi.co/api/v2/pokemon-species/" + this.props.name)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            image:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
              result.pokedex_numbers.filter(
                (entry) => entry.pokedex.name === "national"
              )[0].entry_number +
              ".png",
            genus: result.genera.filter(
              (genus) => genus.language.name === "en"
            )[0].genus,
            entry: this.lastItemArray(
              result.flavor_text_entries.filter(
                (entry) => entry.language.name === "en"
              )
            ).flavor_text,
            loading: false,
          });
        },
        (error) => {
          this.setState({
            image: null,
            genus: null,
            entry: null,
            loading: false,
          });
        }
      );
  }

  lastItemArray(array) {
    return array.slice(-1)[0];
  }
}

export default Entry;
