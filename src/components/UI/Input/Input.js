import React from 'react'
import styles from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [styles.InputElement];
    let validationError = null;
    if(props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(styles.Invalid);
        validationError = <p className={styles.ValidationError}>{props.errorMessage}</p>;
    }

    switch(props.elementType) {
        case ('input') :
            inputElement = <input 
                            className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
        break;
        case('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
        break;
        case('select'):
            inputElement = (
            <select 
                className={inputClasses.join(' ')} 
                value={props.value} 
                onChange={props.changed} >
                { props.elementConfig.options && props.elementConfig.options.map((item) => (
                    <option value={item.value} key={item.value}>
                        {item.displayValue}
                    </option>
                ))}
            </select>
            )
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} 
                            {...props.elementConfig} 
                            value={props.value}
                            onChange={props.changed} />
        break;
    }
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input