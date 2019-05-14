import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from "react-dom";
import Pos from "./components/Pos";
import { Container } from "react-bootstrap";
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
  componentDidUpdate() {
    this.getTable();
  }

  getTable() {
    fetch("http://localhost:3012/tab")
      .then(response => response.json())
      .then(response => {if (response.data!=this.state.tab){
        this.setState({ tab: response.data })
      }
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Container>
        <Pos table={this.state.tab}/>
      </Container>
      
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
