import React, { Component } from "react";
import {
  Button,
  Navbar,
  Nav,
  Row,
  Col,
  Table,
  OverlayTrigger,
  Tooltip
} from "react-bootstrap";

class Pos extends Component {
  constructor() {
    super();
    this.state = { no: "G1", ord: [] };
    this.chooseTable = this.chooseTable.bind(this);
    this.clickbill = this.clickbill.bind(this);
  }
  componentDidUpdate() {
    this.getorder(this.state.no);
  }

  getorder(num) {
    fetch("http://localhost:3012/ord?no=" + num)
      .then(response => response.json())
      .then(response => {
        if (response.data != this.state.tab) {
          this.setState({ ord: response.data });
        }
      })
      .catch(err => console.error(err));
  }

  chooseTable(num) {
    this.setState({ no: num });
  }
  clickbill() {
    fetch("http://localhost:3012/ord/del?no=" + "'"+this.state.no+"'").then(response =>
      response.json()
    );

    fetch(
      "http://localhost:3010/tab/add?no=" +
        "'"+this.state.no +"'"+
        '&status="available"&pin=null'
    ).catch(err => console.error(err));
  }
  render() {
    let cartItems;
    cartItems = this.props.table.map(table => {
      let color;
      switch (table.status) {
        case "customer":
          color = "outline-warning";
          break;
        case "available":
          color = "outline-secondary";
          break;
        case "bill":
          color = "outline-primary";
          break;
        default:
          color = "null";
      }
      return (
        <Col xs="3" key={table.number}>
          <Button
            variant={color}
            onClick={this.chooseTable.bind(this, table.number)}
          >
            {table.number}:{table.status}
          </Button>
        </Col>
      );
    });

    let tabItems;
    tabItems = this.state.ord.map(ord => {
      return (
        <tr key={ord.name}>
          <td>{ord.name}</td>
          <td>{Number(ord.price) * Number(ord.quantity)}</td>
          <td>{ord.quantity}</td>
        </tr>
      );
    });
    let tab = (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th align="center">name</th>
            <th align="center">price</th>
            <th align="center">quantity</th>
          </tr>
        </thead>
        <tbody>
          {tabItems}
          <tr>
            <td colSpan="3" align="center">
              <Button variant="dark" onClick={this.clickbill.bind(this)}>
                Print Order
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    );
    return (
      <div className="pos">
        <Row>
          <Col xs="6">
            <div className="tab">
              <Row>{cartItems}</Row>
            </div>
          </Col>
          <Col xs="6">
            <div className="order">
              <Row>{tab}</Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Pos;
