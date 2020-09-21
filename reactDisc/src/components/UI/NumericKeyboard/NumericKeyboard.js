import React from 'react';

import classes from './NumericKeyboard.module.css';

const numericKeyboard = (props) => {
    return (
        <div className={classes.KeyboardContainer}>
            <div className={classes.Keyboard}>
                <div onClick={() => props.arrowPressed(false)}>Prev</div>
                <div onClick={()=> props.numberPressed(0)}>0</div>
                <div onClick={() => props.arrowPressed(true)}>Next</div>
                <div onClick={()=> props.numberPressed(1)}>1</div>
                <div onClick={()=> props.numberPressed(2)}>2</div>
                <div onClick={()=> props.numberPressed(3)}>3</div>
                <div onClick={()=> props.numberPressed(4)}>4</div>
                <div onClick={()=> props.numberPressed(5)}>5</div>
                <div onClick={()=> props.numberPressed(6)}>6</div>
                <div onClick={()=> props.numberPressed(7)}>7</div>
                <div onClick={()=> props.numberPressed(8)}>8</div>
                <div onClick={()=> props.numberPressed(9)}>9</div>
            </div>
        </div>
    )
}

export default numericKeyboard;