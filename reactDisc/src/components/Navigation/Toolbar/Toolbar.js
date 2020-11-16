import React from 'react';

import classes from './Toolbar.module.css';

import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        {/* <div>LOGO</div> */}
        {props.user ? <span> Hello, {props.user} </span> : null}
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuth={props.isAuth} userId={props.userId} />
        </nav>
    </header>
);

export default toolbar;