import { useRef, useState } from 'react';

import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const isPhoneValid = (value) => value.match(phoneRegex);

const Checkout = (props) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        address: true,
        phone: true,
    });

    const nameInputRef = useRef();
    const addressInputRef = useRef();
    const phoneInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAddress = addressInputRef.current.value;
        const enteredPhone = phoneInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredAdressIsValid = !isEmpty(enteredAddress);
        const enteredPhoneIsValid = isPhoneValid(enteredPhone);

        setFormInputsValidity({
            name: enteredNameIsValid,
            address: enteredAdressIsValid,
            phone: enteredPhoneIsValid,
        });

        const formIsValid =
            enteredNameIsValid && enteredAdressIsValid && enteredPhoneIsValid;

        if (!formIsValid) {
            return;
        }
    };

    const nameControlClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`;
    const addressControlClasses = `${classes.control} ${formInputsValidity.address ? '' : classes.invalid}`;
    const phoneControlClasses = `${classes.control} ${formInputsValidity.phone ? '' : classes.invalid}`;

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">You name</label>
                <input type="text" id="name" ref={nameInputRef} />
                {!formInputsValidity.name && <p>Plese entered a valid name</p>}
            </div>
            <div className={addressControlClasses}>
                <label htmlFor="adress">Address</label>
                <input type="text" id="Address" ref={addressInputRef} />
                {!formInputsValidity.address && <p>Plese entered a valid address</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" ref={phoneInputRef} />
                {!formInputsValidity.phone && (
                    <p>Plese entered a valid phone</p>
                )}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button type="submit" className={classes.submit}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
