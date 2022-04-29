import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import classes from './Modal.module.css';

const Backdrop = (props) => {
    return (
        <div
            role="presentation"
            className={classes.backdrop}
            onClick={props.onClose}
            onKeyDown={props.onClose}
        ></div>
    );
};

const ModalOverlay = (props) => {
    return (
        <div role="dialog" className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const Modal = (props) => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                portalElement
            )}
            {ReactDOM.createPortal(
                <ModalOverlay> {props.children} </ModalOverlay>,
                portalElement
            )}
        </React.Fragment>
    );
};

Backdrop.propTypes = {
    onClose: PropTypes.func.isRequired,
};

ModalOverlay.propTypes = {
    children: PropTypes.element.isRequired,
};

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
};

export default Modal;
