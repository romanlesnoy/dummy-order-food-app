import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';
import useHttp from '../../hooks/use-http';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);

    const { isLoading, error, sendRequest: sendOrdersRequest } = useHttp();

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const createOrder = (order) => {
        console.log(order);
    };

    const submitOrderHandler = async (userData) => {
        sendOrdersRequest(
            {
                url: 'https://react-http-request-cf425-default-rtdb.europe-west1.firebasedatabase.app/orders.json',
                method: 'POST',
                body: JSON.stringify({
                    user: userData,
                    orderItems: cartCtx.items,
                }),
            },
            createOrder
        );
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    amount={item.amount}
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button className={classes['button--all']} onClick={props.onClose}>
                Close
            </button>
            {hasItems && (
                <button className={classes.button} onClick={orderHandler}>
                    Order
                </button>
            )}
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && (
                <Checkout
                    onConfirm={submitOrderHandler}
                    onCancel={props.onClose}
                />
            )}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmitingOrderData = <p>Sending order data</p>;

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Successfully sent the order</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    const errorModalContent = (
        <React.Fragment>
            <p>{error}</p>
            <div className={classes.actions}>
                <button className={classes.button} onClick={props.onClose}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <Modal onClose={props.onClose}>
            {!isLoading && !didSubmit && cartModalContent}
            {isLoading && isSubmitingOrderData}
            {!isLoading && didSubmit && !error && didSubmitModalContent}
            {!isLoading && didSubmit && error && errorModalContent}
        </Modal>
    );
};

Cart.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default Cart;
