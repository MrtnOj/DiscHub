import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem'

import classes from './NavigationItems.module.css';

const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        {!props.isAuth 
            ? <NavigationItem clicked={props.clicked} link={"/auth"}>Log in</NavigationItem>
            : <NavigationItem clicked={props.clicked} link={"/logout"}>Log out</NavigationItem>}
        <NavigationItem clicked={props.clicked} link={"/"}>Contact</NavigationItem>
        <NavigationItem clicked={props.clicked} link={"/"}>Start a round</NavigationItem>
    </ul>
);

export default navigationItems;