import classes from './Checkout.module.css';

const Checkout = () => {
    return (
        <form>
            <div className={classes.control}>
                <label htmlFor='name'>You name</label>
                <input type='text' id='name'/>
            </div>
            <div className={classes.control}>
                <label htmlFor='adress'>Address</label>
                <input type='text' id='Address'/>
            </div>
            <div className={classes.control}>
                <label htmlFor='phone'>Phone</label>
                <input type='text' id='phone'/>
            </div>
            <button type='button'>Cancel</button>
            <button type='submit'>Confirm</button>
        </form>
    );
};

export default Checkout;
