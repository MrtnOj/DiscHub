import React from 'react';

import classes from './NumericKeyboard.module.css';

const numericKeyboard = (props) => {
    return (
        <div className={classes.KeyboardContainer}>
            <div className={classes.Keyboard}>
                <button onClick={() => props.arrowPressed(false)}>Prev</button>
                <button onClick={()=> props.numberPressed(0)}>0</button>
                <button onClick={() => props.arrowPressed(true)}>Next</button>
                <button onClick={()=> props.numberPressed(1)}>1</button>
                <button onClick={()=> props.numberPressed(2)}>2</button>
                <button onClick={()=> props.numberPressed(3)}>3</button>
                <button onClick={()=> props.numberPressed(4)}>4</button>
                <button onClick={()=> props.numberPressed(5)}>5</button>
                <button onClick={()=> props.numberPressed(6)}>6</button>
                <button onClick={()=> props.numberPressed(7)}>7</button>
                <button onClick={()=> props.numberPressed(8)}>8</button>
                <button onClick={()=> props.numberPressed(9)}>9</button>
            </div>
        </div>
    )
}

export default numericKeyboard;