import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './MealsList.module.css';

const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
];

const MealsList = () => {
    const dishesList = DUMMY_MEALS.map((dish) => (
        <MealItem
            key={dish.id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <ul>{dishesList}</ul>
            </Card>
        </section>
    );
};

export default MealsList;
