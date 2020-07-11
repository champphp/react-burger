import React from 'react';

import styles from './BulidControl.module.css'

const buildControl = (props) => (
    <div className={styles.BuildControl}>
        <div className={styles.Label}>{props.lable}</div>
        <button 
            className={styles.Less} 
            onClick={props.removed} 
            disabled={props.disabled}> 
            Less 
        </button>
        <button className={styles.More} onClick={props.added}>More</button>
    </div>
);

export default buildControl;