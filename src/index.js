import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pos from "./components/Pos";
import "./scss/style.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: []
    };
  }
  componentDidMount() {
    this.getTable();
  }

  getTable() {
    fetch("http://localhost:3012/tab")
      .then(response => response.json())
      .then(response => this.setState({ tab: response.data }))
      .catch(err => console.error(err));
  }

  render() {
    console.log(this.state.tab);
    return (
      <div className="container">
        <Pos table={this.state.tab}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
