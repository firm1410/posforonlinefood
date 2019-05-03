import React, { Component } from "react";
import Header from "./Header";
import Products from "./Products";
import Footer from "./Footer";
import SetCart from "./SetCart";
import QuickView from "./QuickView";

class Store extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      cart: [],
      cartRaw: [],
      ord: [],
      totalItems: 0,
      totalAmount: 0,
      term: "",
      category: "",
      cartBounce: false,
      quantity: 1,
      quickViewProduct: {},
      modalActive: false
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleMobileSearch = this.handleMobileSearch.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
    this.updateQuantity = this.updateQuantity.bind(this);
    this.handleRemoveProduct = this.handleRemoveProduct.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleHomeSet = this.handleHomeSet.bind(this);
  }
  // Fetch Initial Set of Products from external API
  getProducts() {
    fetch("http://localhost:3010/food")
      .then(response => response.json())
      .then(response => this.setState({ products: response.data }))
      .catch(err => console.error(err));
  }
  getCart() {
    fetch("http://localhost:3010/cart?no=" + this.props.number)
      .then(response => response.json())
      .then(response => this.setState({ cartRaw: response.data }))
      .catch(err => console.error(err));
  }
  getOrder() {
    fetch("http://localhost:3010/ord?no=" + this.props.number)
      .then(response => response.json())
      .then(response => this.setState({ ord: response.data }))
      .catch(err => console.error(err));
  }

  componentWillMount() {
    this.getProducts();
    this.getCart();
    this.getOrder();
  }

  // Search by Keyword
  handleSearch(event) {
    this.setState({ term: event.target.value });
  }
  // Mobile Search Reset
  handleMobileSearch() {
    this.setState({ term: "" });
  }
  // Filter by Category
  handleCategory(event) {
    this.setState({ category: event.target.value });
  }
  // Add to Cart
  handleAddToCart(selectedProducts) {
    let cartItem = this.state.cart;
    let productID = selectedProducts.id;
    let productQty = selectedProducts.quantity;
    if (this.checkProduct(productID)) {
      let index = cartItem.findIndex(x => x.id == productID);
      cartItem[index].quantity =
        Number(cartItem[index].quantity) + Number(productQty);
      this.setState({
        cart: cartItem
      });
    } else {
      cartItem.push(selectedProducts);
    }
    this.setState({
      cart: cartItem,
      cartBounce: true
    });
    setTimeout(
      function() {
        this.setState({
          cartBounce: false,
          quantity: 1
        });
      }.bind(this),
      1000
    );
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    fetch(
      "http://localhost:3010/cart/add?no=" +
        this.props.number +
        '&food="' +
        productID +
        '"&num=' +
        productQty
    ).catch(err => console.error(err));
  }
    // Add to Cart
    handleAddToCartNDB(selectedProducts) {
      let cartItem = this.state.cart;
      let productID = selectedProducts.id;
      let productQty = selectedProducts.quantity;
      if (this.checkProduct(productID)) {
        let index = cartItem.findIndex(x => x.id == productID);
        cartItem[index].quantity =
          Number(cartItem[index].quantity) + Number(productQty);
        this.setState({
          cart: cartItem
        });
      } else {
        cartItem.push(selectedProducts);
      }
      this.setState({
        cart: cartItem,
        cartBounce: true
      });
      setTimeout(
        function() {
          this.setState({
            cartBounce: false,
            quantity: 1
          });
        }.bind(this),
        1000
      );
      this.sumTotalItems(this.state.cart);
      this.sumTotalAmount(this.state.cart);
    }

  handleRemoveProduct(id, e) {
    let cart = this.state.cart;
    let index = cart.findIndex(x => x.id == id);
    cart.splice(index, 1);
    this.setState({
      cart: cart
    });
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }
  checkProduct(productID) {
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    });
  }
  sumTotalItems() {
    let total = 0;
    let cart = this.state.cart;
    total = cart.length;
    this.setState({
      totalItems: total
    });
  }
  sumTotalAmount() {
    let total = 0;
    let cart = this.state.cart;
    for (var i = 0; i < cart.length; i++) {
      total += cart[i].price * parseInt(cart[i].quantity);
    }
    this.setState({
      totalAmount: total
    });
  }

  //Reset Quantity
  updateQuantity(qty) {
    this.setState({
      quantity: qty
    });
  }
  // Open Modal
  openModal(product) {
    this.setState({
      quickViewProduct: product,
      modalActive: true
    });
  }
  // Close Modal
  closeModal() {
    this.setState({
      modalActive: false
    });
  }
  handleTermChange(category) {
    this.setState({ term: category });
  }
  handleHomeSet() {
    this.setState({ term: "" });
  }
  render() {
    let head;
    this.state.cartRaw.map(carts => {
      console.log(carts);
       return( <SetCart cartSet={carts} addToCart={this.handleAddToCartNDB} />);
    });
    return (
      <div className="Store">
        <Header
          cartBounce={this.state.cartBounce}
          total={this.state.totalAmount}
          totalItems={this.state.totalItems}
          cartItems={this.state.cart}
          removeProduct={this.handleRemoveProduct}
          handleSearch={this.handleSearch}
          handleMobileSearch={this.handleMobileSearch}
          handleCategory={this.handleCategory}
          categoryTerm={this.state.category}
          updateQuantity={this.updateQuantity}
          productQuantity={this.state.moq}
          homeSet={this.handleHomeSet}
        />
        <Products
          productsList={this.state.products}
          searchTerm={this.state.term}
          addToCart={this.handleAddToCart}
          termChange={this.handleTermChange}
          productQuantity={this.state.quantity}
          updateQuantity={this.updateQuantity}
          openModal={this.openModal}
        />
        <Footer />
        <QuickView
          product={this.state.quickViewProduct}
          openModal={this.state.modalActive}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}
export default Store;
