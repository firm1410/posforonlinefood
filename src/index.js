import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pos from "./components/Pos";
import "./scss/style.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab_no: "1",
      tab: [],
      isSetPinPage: true,
      isStorePage: false
    };
    this.handleLuncher = this.handleLuncher.bind(this);
  }
  componentDidMount() {
    this.getTable();
  }

  getTable() {
    fetch("http://localhost:3010/tab?no=" + this.state.tab_no)
      .then(response => response.json())
      .then(response => this.setState({ tab: response.data }))
      .catch(err => console.error(err));
  }

  handleLuncher() {
    this.setState({ isSetPinPage: false, isStorePage: true });
  }

  render() {
    return (
      <div className="container">
        <Pos/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
