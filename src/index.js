import React, { Component } from "react";
import ReactDOM from "react-dom";
import Store from "./components/Store";
import SetPin from "./components/SetPin";
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
    let setpin;
    let store = <Store number={this.state.tab_no}/>;
    this.state.tab.map(tab => {
      setpin = <SetPin number={this.state.tab_no} stat={tab.status} pin={tab.pin} page={this.handleLuncher}/>;
    });
    return (
      <div className="container">
        {this.state.isSetPinPage ? setpin : null}
        {this.state.isStorePage ? store : null}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
