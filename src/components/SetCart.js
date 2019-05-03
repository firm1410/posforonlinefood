import React, { Component } from "react";

class SetCart extends Component {
  constructor() {
    this.props.addToCart(this.props.cartSet);
    super();
  }
}
export default SetCart;
