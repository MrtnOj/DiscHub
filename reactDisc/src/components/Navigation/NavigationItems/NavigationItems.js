import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem clicked={props.clicked} link={"/rounds"}>Scorecards</NavigationItem>
        {/* <NavigationItem clicked={props.clicked} link={"/weather"}>Weather</NavigationItem> */}
        <NavigationItem clicked={props.clicked} link={"/"}>Start a round</NavigationItem>
        {props.isAuth 
            ? <NavigationItem clicked={props.clicked} link={"/logout"}>Log out</NavigationItem>
            : <NavigationItem clicked={props.clicked} link={"/auth"}>Log in</NavigationItem>}
    </ul>
);

export default navigationItems;