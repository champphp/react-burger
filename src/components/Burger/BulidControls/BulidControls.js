import React from 'react';

import styles from './BulidControls.module.css'

import BuildControl from './BulidControl/BulidControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
]

const buildControls = (props) => (
    <div className={styles.BuildControls}>
        <p> Current Price <strong>{props.price.toFixed(2)}</strong> </p>
        {controls.map(ctrl => {
            return <BuildControl 
                        key={ctrl.label} 
                        lable={ctrl.label}
                        type={ctrl.type}
                        added={ () => props.ingredientAdded(ctrl.type) }
                        removed={ () => props.ingredientRemoved(ctrl.type)}
                        disabled={props.disabled[ctrl.type]} />
        })}
        <button 
            className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered} >{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;