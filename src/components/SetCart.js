import React, { Component } from "react";

class SetCart extends Component {
  constructor() {
    super();  
    this.props.addToCart(this.props.cartSet);

  }
}
export default SetCart;
