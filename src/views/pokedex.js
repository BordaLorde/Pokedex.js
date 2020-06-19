import React from "react";
import Entry from "../components/entry";
import { Link } from "react-router-dom";

class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pokemon_list: [], error: false, previous: null, next: null };
  }

  componentDidMount() {
    this.fetchPokemon(parseInt(this.props.page));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page) {
      this.fetchPokemon(parseInt(this.props.page));
    }
  }

  render() {
    return (
      <div>
        <div className="ui grid container link cards">
          {this.state.pokemon_list.map((pokemon) => (
            <div className="four wide column" key={pokemon.name}>
              <Entry name={pokemon.name} />
            </div>
          ))}
        </div>
        <div className="ui grid centered container">
          <div className="four wide column">
            <Link to={`/pokedex/page/${parseInt(this.props.page) - 1}`}>
              <button
                className={`ui labeled icon left floated button ${
                  !this.state.previous ? "disabled" : ""
                }`}
              >
                <i className="left arrow icon"></i>
                Previous
              </button>
            </Link>
          </div>
          <div className="four wide column">
            <Link to={`/pokedex/page/${parseInt(this.props.page) + 1}`}>
              <button
                className={`ui right labeled icon right floated button ${
                  !this.state.next ? "disabled" : ""
                }`}
              >
                <i className="right arrow icon"></i>
                Next
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  fetchPokemon(page = 1) {
    fetch(
      `https://pokeapi.co/api/v2/pokemon-species?offset=${
        (page - 1) * 20
      }&limit=20`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            pokemon_list: result.results,
            error: false,
            previous: result.previous,
            next: result.next,
          });
        },
        (error) => {
          this.setState({
            pokemon_list: [],
            error: true,
            previous: null,
            next: null,
          });
        }
      );
  }
}

export default Pokedex;
