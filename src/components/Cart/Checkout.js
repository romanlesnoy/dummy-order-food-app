import classes from './Checkout.module.css';

const Checkout = (props) => {
    const confirmHandler = (event) => {
        event.preventDefault();
    };

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={classes.control}>
                <label htmlFor="name">You name</label>
                <input type="text" id="name" />
            </div>
            <div className={classes.control}>
                <label htmlFor="adress">Address</label>
                <input type="text" id="Address" />
            </div>
            <div className={classes.control}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" />
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
