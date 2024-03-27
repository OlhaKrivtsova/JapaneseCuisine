import {useContext} from 'react';
import styles from './MealItem.module.css';
import MealAmountForm from './MealAmountForm';
import MealCartForm from './MealCartForm';
import CartContext from '../../Store/cart-context';

const MealItem = props => {
  const cartContext = useContext(CartContext);

  const addMealHandler = amount => {
    cartContext.addItem({...props.meal, amount: +amount});
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{props.meal.name}</h3>
        <div className={styles.description}>{props.meal.description} </div>
        <div className={styles.price}>{`$${props.meal.price.toFixed(2)}`}</div>
      </div>
      <div>
        <MealAmountForm id={props.meal.id} onAddMeal={addMealHandler} />
        <MealCartForm id={props.meal.id} />
      </div>
    </li>
  );
};
export default MealItem;
