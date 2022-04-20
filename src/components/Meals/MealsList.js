import { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './MealsList.module.css';

const MealsList = () => {
    const [meals, setMeals] = useState([]);
    console.log(meals);

    const { isLoading, error, sendRequest: fetchMeals } = useHttp();

    useEffect(() => {
        const gotMeals = (mealsObj) => {
            const loadedMeals = [];

            for (const mealsKey in mealsObj) {
                loadedMeals.push({
                    id: mealsKey,
                    name: mealsObj[mealsKey].name,
                    description: mealsObj[mealsKey].description,
                    price: mealsObj[mealsKey].price,
                });
            }
            setMeals(loadedMeals);
        };

        fetchMeals(
            {
                url: 'https://react-http-request-cf425-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
            },
            gotMeals
        );
    }, [fetchMeals]);

    const dishesList = meals.map((dish) => (
        <MealItem
            id={dish.id}
            key={dish.id}
            name={dish.name}
            description={dish.description}
            price={dish.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card><ul>{dishesList}</ul></Card>
        </section>
    );
};

export default MealsList;
