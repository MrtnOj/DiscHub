import React from 'react';

import classes from './DrawerToggle.module.css';

const drawerToggle = (props) => (
    <svg viewBox="0 0 100 76" className={classes.DrawerToggle} onClick={props.clicked}>
        <rect width="100" height="16" rx="3"></rect>
        <rect y="30" width="100" height="16" rx="3"></rect>
        <rect y="60" width="100" height="16" rx="3"></rect>
    </svg>
);

export default drawerToggle;