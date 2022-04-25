import { useRef, useState } from 'react';

import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';

const isEmpty = (value) => value.trim() !== '';
const phoneRegex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const isPhoneValid = (value) => value.match(phoneRegex);

const Checkout = (props) => {
    // const [formInputsValidity, setFormInputsValidity] = useState({
    //     name: true,
    //     address: true,
    //     phone: true,
    // });

    const {
        value: enteredName,
        isValid: enteredNameIsValid,
        hasError: nameInputHasError,
        valueChangeHandler: nameChangeHandler,
        inputBlurHandler: nameBlurHandler,
        reset: resetNameInput,
    } = useInput(isEmpty);

    const {
        value: enteredAddress,
        isValid: enteredAddressIsValid,
        hasError: addressInputHasError,
        valueChangeHandler: addressChangeHandler,
        inputBlurHandler: addressBlurHandler,
        reset: resetAddressInput,
    } = useInput(isEmpty);

    const {
        value: enteredPhone,
        isValid: enteredPhoneIsValid,
        hasError: phoneInputHasError,
        valueChangeHandler: phoneChangeHandler,
        inputBlurHandler: phoneBlurHandler,
        reset: resetPhoneInput,
    } = useInput(isPhoneValid);

    let formIsValid = false;

    if (enteredNameIsValid && enteredAddressIsValid && enteredPhoneIsValid) {
        formIsValid = true;
    }

    const confirmHandler = (event) => {
        event.preventDefault();

        // const enteredName = nameInputRef.current.value;
        // const enteredAddress = addressInputRef.current.value;
        // const enteredPhone = phoneInputRef.current.value;

        // const enteredNameIsValid = !isEmpty(enteredName);
        // const enteredAdressIsValid = !isEmpty(enteredAddress);
        // const enteredPhoneIsValid = isPhoneValid(enteredPhone);

        // setFormInputsValidity({
        //     name: enteredNameIsValid,
        //     address: enteredAdressIsValid,
        //     phone: enteredPhoneIsValid,
        // });

        // const formIsValid =
        //     enteredNameIsValid && enteredAdressIsValid && enteredPhoneIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: enteredName,
            address: enteredAddress,
            phone: enteredPhone,
        });

        resetNameInput();
        resetAddressInput();
        resetPhoneInput();
    };

    const nameControlClasses = `${classes.control} ${
        nameInputHasError ? classes.invalid : ''
    }`;
    const addressControlClasses = `${classes.control} ${
        addressInputHasError ? classes.invalid : '' 
    }`;
    const phoneControlClasses = `${classes.control} ${
        phoneInputHasError ? classes.invalid : ''
    }`;

    console.log(nameBlurHandler);

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor="name">You name</label>
                <input
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                />
                {nameInputHasError && <p>Plese entered a valid name</p>}
            </div>
            <div className={addressControlClasses}>
                <label htmlFor="adress">Address</label>
                <input
                    type="text"
                    id="Address"
                    onChange={addressChangeHandler}
                    onBlur={addressBlurHandler}
                    value={enteredAddress}
                />
                {addressInputHasError && <p>Plese entered a valid address</p>}
            </div>
            <div className={phoneControlClasses}>
                <label htmlFor="phone">Phone</label>
                <input
                    type="text"
                    id="phone"
                    onChange={phoneChangeHandler}
                    onBlur={phoneBlurHandler}
                    value={enteredPhone}
                />
                {phoneInputHasError && <p>Plese entered a valid phone</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.onCancel}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={classes.submit}
                    disabled={!formIsValid}
                >
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;
