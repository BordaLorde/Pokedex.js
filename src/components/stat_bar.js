import React from "react";

class StatBar extends React.Component {
  render() {
    return (
      <div>
        <h5 className="ui header">{this.getStatName(this.props.stat_name)}</h5>
        <div
          className={`ui ${this.getStatColor(this.props.stat_name)} progress`}
        >
          <div
            className="bar"
            style={{ width: `${this.getPercentageStat(this.props.stat)}%` }}
          />
          <div className="label">{this.props.stat}</div>
        </div>
      </div>
    );
  }

  getStatColor(stat) {
    switch (stat) {
      case "hp":
        return "red";
      case "attack":
        return "orange";
      case "defense":
        return "yellow";
      case "special-attack":
        return "blue";
      case "special-defense":
        return "green";
      case "speed":
        return "pink";
      default:
        return "";
    }
  }

  getStatName(stat) {
    switch (stat) {
      case "hp":
        return "HP";
      case "special-attack":
        return "Special-Attack";
      case "special-defence":
        return "Special-Defence";
      default:
        return this.capitalize(stat);
    }
  }

  capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getPercentageStat(base_stat) {
    return (100 * base_stat) / 255;
  }
}

export default StatBar;
