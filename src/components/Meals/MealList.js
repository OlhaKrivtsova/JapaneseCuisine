import styles from './MealList.module.css';
import Card from '../UI/Cards';
import MealItem from './MealItem';
import {useCallback, useEffect, useState} from 'react';

const MealList = () => {
  const [mealsLoad, setMealsLoad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://react-project-udemy-92ee9-default-rtdb.firebaseio.com/meals.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const data = await response.json();
      let processedDate = [];
      for (const key in data) {
        processedDate.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
      }
      setMealsLoad(processedDate);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
    // console.log('false');
  }, []);

  useEffect(() => {
    fetchHandler();
  }, [fetchHandler]);

  const meals = mealsLoad.map(item => <MealItem key={item.id} meal={item} />);

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{meals}</ul>
        {isLoading && <p>Loading ...</p>}
        {error && <p>{error}</p>}
      </Card>
    </section>
  );
};
export default MealList;
