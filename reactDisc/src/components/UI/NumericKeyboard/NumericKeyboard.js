import React from 'react';

import classes from './NumericKeyboard.module.css';

const numericKeyboard = (props) => {
    const keys = [
        {label: "Prev", value: false}, {label: "0", value: 0}, {label: "Next", value: true},
        {label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}, {label: "4", value: 4},
        {label: "5", value: 5}, {label: "6", value: 6}, {label: "7", value: 7}, {label: "8", value: 8}, 
        {label: "9", value: 9}];

    return (
        <div className={classes.KeyboardContainer}>
            <div className={classes.Keyboard}>
                {keys.map(key => 
                    <button 
                        onClick={() => props.arrowPressed(key.value)}
                        style={{cursor: 'pointer'}}>{key.label}</button>)}
            </div>
        </div>
    )
}

export default numericKeyboard;