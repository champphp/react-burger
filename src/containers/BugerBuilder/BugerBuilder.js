import React, { Component } from 'react';
import {connect} from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BulidControls/BulidControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'

export class BurgerBuilder extends Component {

    constructor(props) {
      super(props);
      this.state = {
          purchasing: false,
          loading: false,
          error: false
      };
    }

    componentDidMount() {
      this.props.onInitIngredients()
    }

    updatePurchaseState = (ingredients) => {
      const sum = Object.keys(ingredients)
        .map(ipKey => {
          return ingredients[ipKey]
        })
        .reduce((sum, el) => {
          return sum+el;
        }, 0)
        return sum > 0
    }
 
    purchaseHandler = () => {
      if(this.props.isAuthenticated) {
        this.setState({purchasing: true})
      }else {
        this.props.onSetAuthRedirectPath('/checkout')
        this.props.history.push('/auth')
      }
    }

    purchaseCancelHandler = () => {
      this.setState({purchasing: false})
    }

    purchaseContinueHander = () => {
      this.props.onInitPurchase()
      this.props.history.push('/checkout')
    }
  
    render() {
      const disabledInfo = {
        ...this.props.ings
      }
      for(let key in disabledInfo){
        disabledInfo[key] = disabledInfo[key] <= 0
      }
      let orderSummary = null;
      let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
      if(this.props.ings) {
        burger = (
          <Aux>
            <Burger ingredients={this.props.ings} />
              <BuildControls
                isAuth={this.props.isAuthenticated}
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                price={this.props.price}
                purchasable={this.updatePurchaseState(this.props.ings)}
                ordered={this.purchaseHandler} />
          </Aux>
        );
        orderSummary = <OrderSummary 
            ingredients={this.props.ings}
            purchaseContinued={this.purchaseContinueHander}
            purchasableCanceled={this.purchaseCancelHandler}
            price={this.props.price} />
      }
      if(this.state.loading){
        orderSummary = <Spinner />
      }

      return (
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}  >
            {orderSummary}
          </Modal>
          {burger}
        </Aux>
      );
    }
}

const mapStateToProps = state => {
  return {
    ings: state.bugerBuilder.ingredients,
    price: state.bugerBuilder.totalPrice,
    error: state.bugerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initIngredient()),
    onInitPurchase: () => dispatch(actions.purchasInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios))