import React from 'react';

import classes from './Button.module.css';
import Auxiliary from '../../../hoc/Auxiliary'

const button = (props) => (
    <Auxiliary>
        <label>{props.label}</label>
        <button
            disabled={props.disabled}
            className={[classes.Button, classes[props.btnType], classes[props.position]].join(' ')}
            onClick={props.clicked}
            type={props.type}
        >
            {props.children}
        </button>
    </Auxiliary>
);

export default button;