import React, { useEffect, useState } from 'react';
import useHttp from '../../hooks/use-http';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './MealsList.module.css';

const MealsList = () => {
    const [meals, setMeals] = useState([]);

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
                url: 'https://react-cart-database-default-rtdb.europe-west1.firebasedatabase.app/meals.json',
            },
            gotMeals
        );
    }, [fetchMeals]);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        );
    }

    if (error) {
        return (
            <section className={classes.MealsError}>
                <p>{error}</p>
            </section>
        );
    }

    const dishesList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
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
