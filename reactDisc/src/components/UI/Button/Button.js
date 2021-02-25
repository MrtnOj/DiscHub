import React from 'react';

import classes from './Button.module.css';

const button = (props) => (
        <button
            disabled={props.disabled}
            className={[classes.Button, classes[props.btnType], classes[props.position]].join(' ')}
            onClick={props.clicked}
            type={props.type}
            name={props.name}
        >
            {props.children}
        </button>
);

export default button;