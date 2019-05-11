import React, { Component } from "react";
import { Button, Card, ListGroup } from "react-bootstrap/Button";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";

class Pos extends Component {
  constructor() {
    super();
    this.state = {};
    this.chooseTable = this.chooseTable.bind(this);
  }
  componentDidMount() {}

  chooseTable() {}
  render() {
    let cartItems;
    cartItems = this.props.table.map(table => {
      return (
        <Card style={{ width: "18rem" }} key={table.number}>
          <Card.Header>{table.number}</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>{table.status}</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Card>
      );
    });
    let view = (
      <CSSTransitionGroup
        transitionName="fadeIn"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={300}
        component="div"
        className="card"
      >
        {cartItems}
      </CSSTransitionGroup>
    );
    return (
      <div className="pos">
        <Button variant="outline-primary">Primary</Button>
        <div className="tab" />
        <div className="order" />
      </div>
    );
  }
}
export default Pos;
