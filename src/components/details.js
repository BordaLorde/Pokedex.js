import React from "react";
import { axios, fetchPokemon } from "../services/fetch_pokemon";
import { withRouter } from "react-router-dom";
import getTypeColor from "../helpers/get_type_color";

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

  getHP() {
    return this.state.stats.length > 0 ? this.state.stats[0].base_stat : 0;
  }

  getATK() {
    return this.state.stats.length > 0 ? this.state.stats[1].base_stat : 0;
  }

  getDEF() {
    return this.state.stats.length > 0 ? this.state.stats[2].base_stat : 0;
  }

  getSpATK() {
    return this.state.stats.length > 0 ? this.state.stats[3].base_stat : 0;
  }

  getSpDEF() {
    return this.state.stats.length > 0 ? this.state.stats[4].base_stat : 0;
  }

  getSPD() {
    return this.state.stats.length > 0 ? this.state.stats[5].base_stat : 0;
  }

  getPercentageStat(base_stat) {
    return (100 * base_stat) / 255;
  }

  render() {
    return (
      <div>
        <div className="ui raised container segment">
          <h2 className="ui header">{this.capitalize(this.state.name)}</h2>
          <div className="ui hidden divider"></div>
          <div className="ui mobile reversed stackable grid">
            <div className="twelve wide column">
              <div class="ui progress">
                <div
                  class="bar"
                  style={{ width: `${this.getPercentageStat(this.getHP())}%` }}
                />
                <div class="label">{this.getHP()}</div>
              </div>
              <div class="ui progress">
                <div
                  class="bar"
                  style={{ width: `${this.getPercentageStat(this.getATK())}%` }}
                />
                <div class="label">{this.getATK()}</div>
              </div>
              <div class="ui progress">
                <div
                  class="bar"
                  style={{ width: `${this.getPercentageStat(this.getDEF())}%` }}
                />
                <div class="label">{this.getDEF()}</div>
              </div>
              <div class="ui progress">
                <div
                  class="bar"
                  style={{
                    width: `${this.getPercentageStat(this.getSpATK())}%`,
                  }}
                />
                <div class="label">{this.getSpATK()}</div>
              </div>
              <div class="ui progress">
                <div
                  class="bar"
                  style={{
                    width: `${this.getPercentageStat(this.getSpDEF())}%`,
                  }}
                />
                <div class="label">{this.getSpDEF()}</div>
              </div>
              <div class="ui progress">
                <div
                  class="bar"
                  style={{ width: `${this.getPercentageStat(this.getSPD())}%` }}
                />
                <div class="label">{this.getSPD()}</div>
              </div>
            </div>
            <div className="four wide column">
              <div className="ui card">
                <div className="image">
                  <img
                    alt={this.state.name}
                    src={this.state.image["front_default"]}
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
                  <div className="ui three buttons">
                    <button className="ui button">Front</button>
                    <button className="ui button">Back</button>
                    <button className="ui button">Shiny</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h4 className="ui header">Flavor Text Entries:</h4>
          <div className="ui hidden divider"></div>
          {this.entriesList()[this.state.entry_page]}
          <div className="ui two buttons">
            <button className={`ui labeled icon left floated button`}>
              <i className="left arrow icon"></i>
              Previous Entry
            </button>
            <button className={`ui right labeled icon button`}>
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
        console.log(this.state.stats[0].base_stat);
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
