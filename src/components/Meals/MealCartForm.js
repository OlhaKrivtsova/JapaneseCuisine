import {useContext} from 'react';
import Input from '../UI/Input';
import styles from './MealCartForm.module.css';
import CartContext from '../../Store/cart-context';

const MealCartForm = props => {
  const cartContext = useContext(CartContext);
  const amountOfItems =
    cartContext.items.find(item => item.id === props.id)?.amount || 0;

  const clickHandler = event => {
    event.preventDefault();
    if (amountOfItems > 0) cartContext.removeItemsWithId(props.id);
  };

  return (
    <form className={styles.form}>
      <div className={styles.form__row}>
        <Input
          label='already in cart'
          input={{
            id: props.id,
            type: 'number',
            readOnly: true,
            value: amountOfItems,
          }}
        />
        <button onClick={clickHandler}>Clear</button>
      </div>
    </form>
  );
};
export default MealCartForm;
