import React from 'react';
import PropTypes from 'prop-types';

import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';

const Header = (props) => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Dummy Food Order</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="Meals" />
            </div>
        </React.Fragment>
    );
};

Header.propTypes = {
    onShowCart: PropTypes.func.isRequired,
};

export default Header;
