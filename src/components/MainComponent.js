import React, { Component } from "react";
import Header from "./HeaderComponent";
import Menu from "./MenuComponent";
import DishdetailComponent from "./DishdetailComponent";
import Footer from "./FooterComponent";
import { Dishes } from "../shared/dishes";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: Dishes,
      selectedDish: null
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  render() {
    return (
      <div>
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={dishId => this.onDishSelect(dishId)}
        />
        <DishdetailComponent
          dish={
            this.state.dishes.filter(
              dish => dish.id === this.state.selectedDish
            )[0]
          }
        />
        <Footer/>
      </div>
    );
  }
}

export default Main;
