import React from "react";
import { axios, fetchPokemon } from "../services/fetch_pokemon";
import { withRouter } from "react-router-dom";
import getTypeColor from "../helpers/get_type_color";
import StatBar from "./stat_bar";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      image: {},
      entries: [],
      entry_page: 0,
      genus: null,
      stats: [],
      exists: false,
      loading: true,
      image_state: "front_default",
      image_back: false,
      image_female: false,
      image_shiny: false,
      loading_aux: true,
      name: props.match.params.name,
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
      <div>
        <div className="ui raised container segment">
          <h2 className="ui header">{this.capitalize(this.state.name)}</h2>
          <div className="ui hidden divider"></div>
          <div className="ui mobile reversed stackable grid">
            <div className="twelve wide column">
              {this.state.stats.length > 0 &&
                this.state.stats.map((item, index) => (
                  <StatBar
                    key={index}
                    stat_name={item.stat.name}
                    stat={item.base_stat}
                  />
                ))}
            </div>
            <div className="four wide column">
              <div className="ui card">
                <div className="image">
                  <img
                    alt={this.state.name}
                    src={this.state.image[this.state.image_state]}
                  />
                </div>
                <div className="content">
                  {this.state.type2 && (
                    <div
                      className={`ui ${getTypeColor(
                        this.state.type2
                      )} horizontal right floated label`}
                    >
                      {this.state.type2}
                    </div>
                  )}
                  <div
                    className={`ui ${getTypeColor(
                      this.state.type1
                    )} horizontal right floated label`}
                  >
                    {this.state.type1}
                  </div>
                  <div className="header">
                    {this.capitalize(this.state.name)}
                  </div>
                  <div className="meta">
                    <span className="date">{this.state.genus}</span>
                  </div>
                  <div className="description"></div>
                </div>
                <div className="extra content">
                  <div className="ui four buttons">
                    <button className="ui button" onClick={this.onBackClick}>
                      Back
                    </button>
                    <button className="ui button" onClick={this.onFemaleClick}>
                      Female
                    </button>
                    <button className="ui button" onClick={this.onShinyClick}>
                      Shiny
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="ui header">Flavor Text Entries:</h4>
          <div className="ui hidden divider"></div>
          {this.entriesList()[this.state.entry_page]}
          <div className="ui two buttons">
            <button
              className={`ui labeled icon left floated button ${
                this.state.entry_page === 0 && "disabled"
              }`}
              onClick={this.onPrevClick}
            >
              <i className="left arrow icon"></i>
              Previous Entry
            </button>
            <button
              className={`ui right labeled icon button ${
                this.state.entry_page >= this.state.entries.length - 1 &&
                "disabled"
              }`}
              onClick={this.onNextClick}
            >
              <i className="right arrow icon"></i>
              Next Entry
            </button>
          </div>
        </div>
      </div>
    );
  }

  getGameName(name) {
    switch (name) {
      case "firered":
        return "Fire Red";
      case "leafgreen":
        return "Leaf Green";
      case "heartgold":
        return "Heart Gold";
      case "soulsilver":
        return "Soul Silver";
      case "omega-ruby":
        return "Omega-Ruby";
      case "alphasapphire":
        return "Alpha-Sapphire";
      default:
        return this.capitalize(name);
    }
  }

  onBackClick = () => {
    if (this.state.image_back) {
      this.setState({
        image_back: false,
      });
    } else {
      this.setState({
        image_back: true,
      });
    }
  };

  onFemaleClick = () => {
    if (this.state.image_female) {
      this.setState({
        image_female: false,
      });
    } else {
      this.setState({
        image_female: true,
      });
    }
  };

  onShinyClick = () => {
    if (this.state.image_shiny) {
      this.setState({
        image_shiny: false,
      });
    } else {
      this.setState({
        image_shiny: true,
      });
    }
  };

  onPrevClick = () => {
    this.setState((state) => ({
      entry_page: state.entry_page - 1,
    }));
  };

  onNextClick = () => {
    this.setState((state) => ({
      entry_page: state.entry_page + 1,
    }));
  };

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  entriesList() {
    return this.state.entries.map((item, index) => (
      <div key={`A-${index}`}>
        <h5 className="ui header" key={`B-${index}`}>
          {this.getGameName(item.version.name)}
        </h5>
        <p key={`C-${index}`}>{item.flavor_text}</p>
        <div className="ui hidden divider" key={`D-${index}`}></div>
      </div>
    ));
  }

  fetchPokemonInfo() {
    fetchPokemon
      .fetchPokemonInfo(this.state.name, this.signal)
      .then((result) => {
        this.setState({
          entries: result.data.flavor_text_entries.filter(
            (entry) => entry.language.name === "en"
          ),
          genus: result.data.genera.filter(
            (genus) => genus.language.name === "en"
          )[0].genus,
          loading: false,
          exists: true,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.setState({
            entries: [],
            genus: null,
            loading: false,
            exists: false,
          });
        }
      });
  }

  fetchPokemonType() {
    fetchPokemon
      .fetchPokemonType(this.state.name, this.signal)
      .then((result) => {
        this.setState({
          image: result.data.sprites,
          stats: result.data.stats,
          type1: result.data.types[0].type.name,
          type2: result.data.types[1] ? result.data.types[1].type.name : null,
        });
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          this.setState({
            image: {},
            stats: [],
            type1: null,
            type2: null,
          });
        }
      });
  }
}

export default withRouter(Details);
