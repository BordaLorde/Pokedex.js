import React from "react";
import { withRouter } from "react-router-dom";

class Details extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.match.params.name,
    };
  }

  render() {
    return <div>{this.state.name}</div>;
  }
}

export default withRouter(Details);
