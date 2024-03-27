import styles from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import {useContext, useEffect, useState} from 'react';
import CartContext from '../../Store/cart-context';

const HeaderCartButton = props => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const cartContext = useContext(CartContext);

  const amountOfAllItems = cartContext.items.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  let buttonClassName = `${styles.button} ${
    isButtonAnimated ? styles.bump : ''
  }`;

  useEffect(() => {
    if (!cartContext.items[0]) return;
    setIsButtonAnimated(true);
    const timer = setTimeout(() => setIsButtonAnimated(false), 300);
    return () => clearTimeout(timer);
  }, [cartContext.items]);

  // console.log(buttonClassName, 'after useEffect');

  return (
    <button className={buttonClassName} onClick={props.onClick}>
      {/* {console.log(buttonClassName, 'inside JSX')} */}
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={styles.badge}>{amountOfAllItems}</span>
      <span className={styles.badge}>{`$${cartContext.totalCost.toFixed(
        2
      )}`}</span>
    </button>
  );
};
export default HeaderCartButton;
