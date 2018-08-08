import React from 'react';
import { NavLink } from 'react-router-dom';

import { routesCodes } from 'constants/routes';

const Menu = () => (
    <div className='menu'>
        <div className='menu-links'>
            <NavLink
                className='menu-link'
                activeClassName='menu-link--active'
                to={ routesCodes.HOME }
                exact
            >
                Home
            </NavLink>
            <NavLink
                className='menu-link'
                activeClassName='menu-link--active'
                to={ routesCodes.API }
                exact
            >
                API
            </NavLink>
            <NavLink
                className='menu-link'
                activeClassName='menu-link--active'
                to='/404'
                exact
            >
                404 Page
            </NavLink>
        </div>
    </div>
);

export default Menu;
