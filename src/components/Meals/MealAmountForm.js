import {useRef} from 'react';
import Input from '../UI/Input';
import styles from './MealAmountForm.module.css';

const MeaAmountForm = props => {
  const inputAmount = useRef();

  const addMealHandler = event => {
    event.preventDefault();
    if (inputAmount.current.value > 0) {
      props.onAddMeal(inputAmount.current.value);
      inputAmount.current.value = 0;
    }
  };

  return (
    <form className={styles.form}>
      <div className={styles.form__row}>
        <Input
          ref={inputAmount}
          label='amount'
          input={{
            id: props.id,
            type: 'number',
            min: '0',
            max: '10',
            step: '1',
            defaultValue: '0',
          }}
        />
        <button onClick={addMealHandler}>Add</button>
      </div>
    </form>
  );
};
export default MeaAmountForm;
