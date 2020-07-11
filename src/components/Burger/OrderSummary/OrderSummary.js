import React, { Component } from 'react'

import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {};
      }
    componentDidUpdate() {
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(ipKey => {
            return (
                <li key={ipKey}>
                    <span style={{textTransform: 'capitalize'}}>{ipKey}</span> : {this.props.ingredients[ipKey]}
                </li>
            )
        })

        return (
            <Aux>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)} </strong></p>
                <p>Continue to Checkout ?</p>
                <Button btnType="Danger" clicked={this.props.purchasableCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary