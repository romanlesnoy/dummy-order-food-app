import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [btnIsHighLighted, setBtnIsHighlited] = useState(false);
    const cartCtx = useContext(CartContext);

    const { items } = cartCtx;

    const numberOfCartItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${classes.button} ${
        btnIsHighLighted ? classes.bump : ''
    }`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlited(true);

        const timer = setTimeout(() => {
            setBtnIsHighlited(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    );
};

HeaderCartButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default HeaderCartButton;
